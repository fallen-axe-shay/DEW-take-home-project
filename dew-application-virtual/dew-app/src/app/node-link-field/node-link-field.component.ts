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
  }

  ngOnInit(): void {
  }

  selectedOption?: string;
  selectedLabelOption?: string;

  onSelect(selection: string): void {
    switch(selection) {
      case 'node':
        this.selectedOption = 'node';
      break;
      case 'link':
        this.selectedOption = 'link';
      break;
    }
  }

  onSelectOption(selection: string): void {
    this.selectedLabelOption = selection;
  }

}
