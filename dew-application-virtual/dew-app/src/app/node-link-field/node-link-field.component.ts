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

  onSelect(selection: string): void {
    this.selectedOption = selection;
    // switch(selection) {
    //   case 'node':
    //     this.selectedOption = 'node';
    //   break;
    //   case 'link':
    //     this.selectedOption = 'link';
    //   break;
    // }
  }

  onSelectOption(selection: string): void {
    if(this.selectedLabelOption.includes(selection)) {
      this.selectedLabelOption.splice(this.selectedLabelOption.indexOf(selection));
      this.noOfSelectedOption--;
    } else {
      switch(this.noOfSelectedOption) {
        case 2:
          this.selectedLabelOption[0] = this.selectedLabelOption[1];
          this.selectedLabelOption[1] = selection;
          break;
        default:
          this.selectedLabelOption.push(selection);
          this.noOfSelectedOption++;
          break;
      }
    }
  }

}
