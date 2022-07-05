import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AppInitService{
   constructor(private _socialAuthService: SocialAuthService){}

   public user!: SocialUser;

   public getUserDetail(){
    this._socialAuthService.authState.subscribe(user => this.user = user);
   }

   public isUserLoggedIn(){
    return this.user !== undefined;
   }
}