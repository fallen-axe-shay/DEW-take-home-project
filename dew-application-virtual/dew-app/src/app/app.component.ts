import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { NODES } from './nodeLinkList';
// Firebase
// import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, set } from "firebase/database";
import { drawLines } from './drawing-board/drawing-board.component';
import { links } from './links';

var currentID = 1;

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const nodesRef = ref(database, 'nodes');
const linksRef = ref(database, 'links');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {
  
  title = 'DEW App';
  textFrameTitle = 'Configure';
  diagramFrameTitle = 'Board';

  nodeLinks: any;
  links: any;

  constructor() {
    this.nodeLinks = NODES;
    this.links = links;
    get(nodesRef).then((snapshot) => {
      const data = snapshot.val();
      if(data!=null) {
        for(var item of data) {
          this.nodeLinks.push(item);
        }
      }
    }).then(() => {
      get(linksRef).then((snapshot) => {
        const data = snapshot.val();
        if(data!=null) {
          for(var item of data) {
            this.links.push(item);
          }
          drawLines(true);
        }
      });
    });
  }

  ngAfterViewInit(): void {

  }


  onCircleClick(): void {
    NODES.push(
      {
        id: currentID++,
        nodeOrLink: 'node', 
        label: '',
        selectedOptions: [],
        noOfOptions: 0,
        text: '',
        errorExists: false,
        oldValue: ''
      }
    );
    set(ref(database, 'nodes'), 
      NODES
    );
    set(ref(database, 'links'), 
      links
    );
  }

  onAddBtnClick(): void {
    NODES.push(
      {
        id: currentID++,
        nodeOrLink: 'node', 
        label: '',
        selectedOptions: [],
        noOfOptions: 0,
        text: '',
        errorExists: false,
        oldValue: ''
      }
    );
    set(ref(database, 'nodes'), 
      NODES
    );
    set(ref(database, 'links'), 
      links
    );
  }
}

//export { currentID };
