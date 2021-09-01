import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import * as $ from 'jquery';
import { options } from '../nodeOptions';
import { links } from '../links';
import 'leader-line';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';
 
import { MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';

const app = initializeApp(environment.firebaseConfig);
const database = getDatabase();
declare let LeaderLine: any;
var flag = 0;

var idNumber = NODES.length;

var lines: any;
lines = [];

function drawLines(fromAddLink: Boolean) {
  if(flag == 1 || fromAddLink) {
    var A, B, line;
    for(var index = 0; index<lines.length; index++) {
      lines[index].remove();
    }
    lines = [];
    for(var index = 0; index<links.length; index++) {
      A = $('#' + links[index].A);
      B = $('#' + links[index].B);
      line = new LeaderLine(A[0], B[0], {color: 'black', size: 2});
      line.setOptions({startPlug: 'disc', endPlug: 'disc'});
      lines.push(line);
    }
  } 
}


@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']
})

export class DrawingBoardComponent implements AfterContentChecked  {

  nodeLinks = NODES;

  constructor() {
   }

   itemSelect(args: MenuEventArgs, nodeLink: NodeLink): void {
     var selection = args.element.textContent;
     idNumber = NODES.length;
     if(selection != 'Add Link' && nodeLink.label!=selection) {
       //console.log("Do something")
       NODES.push({
        id: idNumber,
        nodeOrLink: 'link', 
        label: idNumber.toString(),
        selectedOptions: [],
        noOfOptions: 0,
        text: 'Link ' + nodeLink.label + ' ' + selection,
        errorExists: false,
        oldValue: '',
        listContext: [{
          text: 'Add Link',
          items: []
      }]
      })
      links.push({id: idNumber, A: nodeLink.label, B: selection});
      set(ref(database, 'nodes'), 
          NODES
        );
    set(ref(database, 'links'), 
        links
      );
      drawLines(true);
     }
   }

  ngAfterContentChecked(): void {
    drawLines(false);
  }

  onLabelChange(nodeLink: NodeLink): void {
    if(nodeLink.label!='') {
      nodeLink.text = 'Node ' + nodeLink.label;
      for(let item in options) {
        if(nodeLink.label == options[item]) {
          nodeLink.label = '';
          options[nodeLink.id] && delete options[nodeLink.id];
        }
      }
      var temp = nodeLink.oldValue.split(/\s+/);
      for(var node in this.nodeLinks) {
        if(this.nodeLinks[node].nodeOrLink == 'link') {
          var nodeTemp = this.nodeLinks[node].text.split(/\s+/);
          if(nodeTemp[1] == temp[1]) {
            this.nodeLinks[node].text = 'Link ' + nodeLink.label + ' ' + nodeTemp[2]; 
          }
          if(nodeTemp[2] == temp[1]) {
            this.nodeLinks[node].text = 'Link ' + nodeTemp[1] + ' ' + nodeLink.label; 
          }
        }
        for(var index=0; index<links.length; index++) {
          if(links[index]['A'] == temp[1]) {
            links[index]['A'] = nodeLink.label;
          }
          if(links[index]['B'] == temp[1]) {
            links[index]['B'] = nodeLink.label;
          }
        }
      }
      nodeLink.oldValue = nodeLink.text;
      nodeLink.label && (options[nodeLink.id] = nodeLink.label);
    } else {
      nodeLink.text = 'Node';
      options[nodeLink.id] && delete options[nodeLink.id];
      for(var index = 0; index<links.length; index++) {
        if(links[index].id==nodeLink.id || links[index].A == nodeLink.label || links[index].B == nodeLink.label) {
          links.splice(index, 1);
          index--;
        }
      }
      for(var node in this.nodeLinks) {
        if(this.nodeLinks[node].nodeOrLink == 'link') {
          var temp = nodeLink.oldValue.split(/\s+/);
          var nodeTemp = this.nodeLinks[node].text.split(/\s+/);
          if(nodeTemp[1] == temp[1]) {
            this.nodeLinks[node].text = ''; 
          }
          if(nodeTemp[2] == temp[1]) {
            this.nodeLinks[node].text = ''; 
          }
        }
      }
      drawLines(true);
    }
    var listOfNodes = [];
    for(var item in NODES) {
      if(NODES[item].nodeOrLink == 'node') {
        listOfNodes.push({text: NODES[item].label});
      }
    }
    for(var item in NODES) {
      if(NODES[item].nodeOrLink == 'node') {
        NODES[item].listContext[0].items = listOfNodes;
      }
    }
    set(ref(database, 'nodes'), 
          NODES
        );
    set(ref(database, 'links'), 
        links
      );
  }

  onDragStart(): void {
    flag = 1;
  }

  onDragStopped(): void {
    flag = 0;
  }

}

export {drawLines};
