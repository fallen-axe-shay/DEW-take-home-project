import { links } from '../links';
import { Component, OnInit } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import { options } from '../nodeOptions';
import { drawLines } from '../drawing-board/drawing-board.component';

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

}
