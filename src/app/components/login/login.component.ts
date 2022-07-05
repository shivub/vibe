import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { AppInitService } from 'src/app/services/AppinitService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: SocialAuthService, private _appInit: AppInitService) { }

  ngOnInit(): void {
  }

  public signInWithGoogle(){
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this._appInit.getUserDetail();
  }

}
