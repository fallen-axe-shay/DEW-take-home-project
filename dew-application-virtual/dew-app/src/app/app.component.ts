import { Component } from '@angular/core';
import { NODES } from './nodeLinkList';

var currentID = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'DEW App';
  textFrameTitle = 'Configure';
  diagramFrameTitle = 'Board';

  onCircleClick(): void {
    NODES.push(
      {
        id: currentID++,
        nodeOrLink: 'node', 
        label: '',
        selectedOptions: [],
        noOfOptions: 0
      }
    );
  }

  onAddBtnClick(): void {
    NODES.push(
      {
        id: currentID++,
        nodeOrLink: 'node', 
        label: '',
        selectedOptions: [],
        noOfOptions: 0
      }
    );
  }
}

//export { currentID };
