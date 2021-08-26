import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import { options } from '../nodeOptions';

@Component({
  selector: 'app-node-link-field',
  templateUrl: './node-link-field.component.html',
  styleUrls: ['./node-link-field.component.css']
})


export class NodeLinkFieldComponent implements OnInit {


  nodeLinks = NODES;

  constructor() { 
    this.options = options;
  }

  ngOnInit(): void {
  }


  options?: any;

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
  }

}
