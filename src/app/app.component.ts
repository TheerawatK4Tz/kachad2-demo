import { Component, OnInit } from '@angular/core';
declare const App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Kachad2';

  ngOnInit() {
    App.initialLoadPage();
  }
}
