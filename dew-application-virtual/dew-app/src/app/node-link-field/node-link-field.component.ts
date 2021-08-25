import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';

@Component({
  selector: 'app-node-link-field',
  templateUrl: './node-link-field.component.html',
  styleUrls: ['./node-link-field.component.css']
})


export class NodeLinkFieldComponent implements OnInit {
  // nodeLink: NodeLink = {
  //     id: 1,
  //     currentSelection: 0,
  //     options: [],
  //     label: ''
  // }

  nodeLinks = NODES;

  constructor() { 
    this.options = {};
  }

  ngOnInit(): void {
  }


  options?: any;

  removeField(nodeLink: NodeLink) {
    for (var item = 0; item<NODES.length; item++) {
      if(NODES[item].id==nodeLink.id) { 
        NODES.splice(item, 1);
        break;
      }
    }
  }

  onLabelChange(nodeLink: NodeLink): void {
    if(nodeLink.label!='') {
      for(let item in this.options) {
        if(nodeLink.label == this.options[item]) {
          nodeLink.label = '';
          this.options[nodeLink.id] && delete this.options[nodeLink.id];
        }
      }
      nodeLink.label && (this.options[nodeLink.id] = nodeLink.label);
    } else {
      this.options[nodeLink.id] && delete this.options[nodeLink.id];
    }
  } 

  onSelect(nodeLink: NodeLink, selection: string): void {
    nodeLink.nodeOrLink = selection;
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
