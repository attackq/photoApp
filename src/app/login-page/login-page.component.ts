import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation:  ViewEncapsulation.None

})
export class LoginPageComponent implements OnInit {

  public bgPath: string = 'assets/images/logiwp.jpg';

  constructor() { }

  @HostBinding('class.login__background') someField: boolean = true;

  ngOnInit(): void {
  }

}
