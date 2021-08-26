import { Component, OnInit } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { options } from '../nodeOptions';

var drawCurrentID = 1;

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']
})
export class DrawingBoardComponent implements OnInit {

  nodeLinks = NODES;

  constructor() {

   }

  ngOnInit(): void {
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


  // onCircleClick(): void {
  //   drawCurrentID = ( drawCurrentID > currentID? drawCurrentID : currentID ) + 1;
  //   NODES.push(
  //     {
  //       id: drawCurrentID,
  //       nodeOrLink: 'node', 
  //       label: '',
  //       selectedOptions: [],
  //       noOfOptions: 0
  //     }
  //   );
  // }

  // drop(event: CdkDragDrop<any>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     copyArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }

}

//export { drawCurrentID };
