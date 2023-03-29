import { Component } from '@angular/core';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Url = AppURL;
}
