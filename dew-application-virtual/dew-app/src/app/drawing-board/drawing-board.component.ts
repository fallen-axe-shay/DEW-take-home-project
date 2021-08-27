import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { NodeLink } from '../node-link';
import { NODES } from '../nodeLinkList';
import * as $ from 'jquery';
import { options } from '../nodeOptions';
import { links } from '../links';
import 'leader-line';
declare let LeaderLine: any;
var flag = 0;

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

  ngAfterContentChecked(): void {
    drawLines(false);
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
      for(var index = 0; index<links.length; index++) {
        if(links[index].id==nodeLink.id || links[index].A == nodeLink.label || links[index].B == nodeLink.label) {
          links.splice(index, 1);
          index--;
        }
      }
      drawLines(true);
    }
  }

  onDragStart(): void {
    flag = 1;
  }

  onDragStopped(): void {
    flag = 0;
  }

}

export {drawLines};
