import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-bootsrap-element',
  templateUrl: './bootsrap-element.component.html',
  styleUrls: ['./bootsrap-element.component.css']
})
export class BootsrapElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
  }

}
