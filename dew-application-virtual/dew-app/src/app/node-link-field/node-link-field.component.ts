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
    this.selectedOption = 'node';
    this.noOfSelectedOption = 0;
    this.selectedLabelOption = [];
  }

  ngOnInit(): void {
  }

  selectedOption?: string;
  selectedLabelOption?: any;
  noOfSelectedOption?: any;

  onSelect(nodeLink: NodeLink, selection: string): void {
    nodeLink.nodeOrLink = selection;
    // switch(selection) {
    //   case 'node':
    //     this.selectedOption = 'node';
    //   break;
    //   case 'link':
    //     this.selectedOption = 'link';
    //   break;
    // }
  }

  onSelectOption(nodeLink: NodeLink, selection: string): void {
    if(nodeLink.selectedOptions.includes(selection)) {
      nodeLink.selectedOptions.splice(nodeLink.selectedOptions.indexOf(selection));
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
