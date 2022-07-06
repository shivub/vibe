import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: SocialAuthService, private userservice: UserService) { }

  ngOnInit(): void {
  }

  public signInWithGoogle(){
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.userservice.getUserDetail();
  }

}
