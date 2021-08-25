import { Component } from '@angular/core';
import { NODES } from './nodeLinkList';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DEW App';
  textFrameTitle = 'Configure';
  diagramFrameTitle = 'Board';

  currentID = 1;

  onAddBtnClick(): void {
    NODES.push(
      {
        id: this.currentID++,
        nodeOrLink: 'node', 
        label: '',
        selectedOptions: [],
        noOfOptions: 0
      }
    );
  }
}
