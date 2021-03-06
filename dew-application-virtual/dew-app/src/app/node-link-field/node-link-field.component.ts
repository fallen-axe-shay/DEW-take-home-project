import { links } from '../links';
import { Component, OnInit } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import { options } from '../nodeOptions';
import { drawLines } from '../drawing-board/drawing-board.component';
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebaseConfig);
const database = getDatabase();

function updateLines(nodeLink: NodeLink) {
  for(var index = 0; index<links.length; index++) {
    if(links[index].id==nodeLink.id || links[index].A == nodeLink.label || links[index].B == nodeLink.label) {
      links.splice(index, 1);
      index--;
    }
  }
  drawLines(true);
}

@Component({
  selector: 'app-node-link-field',
  templateUrl: './node-link-field.component.html',
  styleUrls: ['./node-link-field.component.css']
})


export class NodeLinkFieldComponent implements OnInit {


  nodeLinks = NODES;

  constructor() { 
    this.options = options;
    this.links = links;
  }

  ngOnInit(): void {
  }


  options?: any;
  links?: Array<JSON>;

  removeField(nodeLink: NodeLink) {
    var id = nodeLink.id;
    for (var item = 0; item<NODES.length; item++) {
      if(NODES[item].id==nodeLink.id) { 
        NODES.splice(item, 1);
        break;
      }
    }
    for (var key in options) {
      if(key == id.toString()) {
        delete options[key];
      }
    }
    updateLines(nodeLink);
    var listOfNodes = [];
    for(var i in NODES) {
      if(NODES[i].nodeOrLink == 'node') {
        listOfNodes.push({text: NODES[i].label});
      }
    }
    for(var i in NODES) {
      if(NODES[i].nodeOrLink == 'node') {
        NODES[i].listContext[0].items = listOfNodes;
      }
    }
    set(ref(database, 'nodes'), 
      NODES
    );
    set(ref(database, 'links'), 
      links
    );
  }

  onLabelChange(nodeLink: NodeLink): void {
    if(nodeLink.label!='') {
      for(let item in options) {
        if(nodeLink.label == options[item]) {
          nodeLink.label = '';
          options[nodeLink.id] && delete options[nodeLink.id];
        }
      }
      nodeLink.label && (options[nodeLink.id] = nodeLink.label);
    } else {
      options[nodeLink.id] && delete options[nodeLink.id];
      updateLines(nodeLink);
    }
  } 

  onSelect(nodeLink: NodeLink, selection: string): void {
    nodeLink.nodeOrLink = selection;
    if(selection == 'link') {
      var id = nodeLink.id;
      for (var key in options) {
        if(key == id.toString()) {
          delete options[key];
        }
      }
      nodeLink.label = '';
    }
  }

  onSelectOption(nodeLink: NodeLink, selection: any): void {
    for(var index = 0; index<links.length; index++) {
      if(links[index]['id'] == nodeLink.id) {
        links.splice(index, 1);
        break;
      }
    }
    if(nodeLink.selectedOptions.includes(selection)) {
      nodeLink.selectedOptions.splice(nodeLink.selectedOptions.indexOf(selection), 1);
      nodeLink.noOfOptions--;
    } else {
      switch(nodeLink.noOfOptions) {
        case 2:
          nodeLink.selectedOptions[0] = nodeLink.selectedOptions[1];
          nodeLink.selectedOptions[1] = selection;
          break;
        default:
          nodeLink.selectedOptions.push(selection);
          nodeLink.noOfOptions++;
          break;
      }
    }
    if(nodeLink.noOfOptions == 2) {
      links.push({
        id: nodeLink.id,
        A: nodeLink.selectedOptions[0],
        B: nodeLink.selectedOptions[1]
      });
    }
    drawLines(true);
  }

  //New Code

  onModelChange(event: string, nodeLink: NodeLink) {
      try {
        var temp = event.trim().split(/\s+/);
        if(temp[0].toLocaleLowerCase() == 'node' && temp.length == 2) {
          nodeLink.oldValue = nodeLink.text;
          nodeLink.text = event;
          nodeLink.text = 'Node ' + temp[1];
          nodeLink.errorExists = false;

          //Check if Node Exists
          for(var item of NODES) {
            if(item.label == temp[1]) {
              throw new Error("Node Exists");
            }
          }

          nodeLink.label = temp[1];
          nodeLink.nodeOrLink = 'node';
          var oldTemp = nodeLink.oldValue.split(/\s+/);
          for(var node in this.nodeLinks) {
            if(this.nodeLinks[node].nodeOrLink == 'link') {
              var nodeTemp = this.nodeLinks[node].text.split(/\s+/);
              if(nodeTemp[1] == oldTemp[1]) {
                this.nodeLinks[node].text = 'Link ' + temp[1] + ' ' + nodeTemp[2]; 
              }
              if(nodeTemp[2] == oldTemp[1]) {
                this.nodeLinks[node].text = 'Link ' + nodeTemp[1] + ' ' + temp[1]; 
              }
            }
          }
          for(var index=0; index<links.length; index++) {
            if(links[index]['A'] == oldTemp[1]) {
              links[index]['A'] = temp[1];
            }
            if(links[index]['B'] == oldTemp[1]) {
              links[index]['B'] = temp[1];
            }
          }
          if(nodeLink.label == null) {
            nodeLink.label = '';
            updateLines(nodeLink);
          }
          nodeLink.oldValue = nodeLink.text;
        } else if(temp[0].toLocaleLowerCase() == 'link' && temp.length == 3) {
          nodeLink.text = 'Link ' + temp[1] + ' ' + temp[2];
          nodeLink.errorExists = false;
          nodeLink.nodeOrLink = 'link';
          var node1Found = false, node2Found = false;
          for(var node in this.nodeLinks) {
            if(this.nodeLinks[node].text == 'Link ' + temp[2] + ' ' + temp[1]) {
              node1Found = false;
            }
            if(this.nodeLinks[node].label == temp[1]) {
              node1Found = true;
            }
            if(this.nodeLinks[node].label == temp[2]) {
              node2Found = true;
            }
          }
          if(node1Found && node2Found) {
            var id = nodeLink.id;
            for (var key in options) {
              if(key == id.toString()) {
                delete options[key];
              }
            }
            nodeLink.label = '';
            for(var index = 0; index<links.length; index++) {
              if(links[index]['id'] == nodeLink.id) {
                links.splice(index, 1);
                break;
              }
            }
            links.push({
              id: nodeLink.id,
              A: temp[1],
              B: temp[2]
            });
            drawLines(true);
          } else {
            nodeLink.errorExists = true;
        }
        } else {
          //Error condition
          nodeLink.errorExists = true;
          nodeLink.label = '';
        }
        var listOfNodes = [];
        for(var i in NODES) {
          if(NODES[i].nodeOrLink == 'node') {
            listOfNodes.push({text: NODES[i].label});
          }
        }
        for(var i in NODES) {
          if(NODES[i].nodeOrLink == 'node') {
            NODES[i].listContext[0].items = listOfNodes;
          }
        }
        set(ref(database, 'nodes'), 
          NODES
        );
        set(ref(database, 'links'), 
          links
        );
      } catch (exception) {
        //Error condition
        console.log(exception)
        nodeLink.errorExists = true;
        nodeLink.label = '';
      }  
  }
}
