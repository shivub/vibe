import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { UserModel } from "../models/UserModel";

@Injectable({providedIn: 'root'})
export class UserService{
   constructor(private _socialAuthService: SocialAuthService){}

   private user: UserModel = {userDetails: undefined, isAdmin: false, isPrime: false};

   private user$: ReplaySubject<UserModel> = new ReplaySubject<UserModel>();
   public getUserDetail(){
    this._socialAuthService.authState.subscribe(user => {
      this.user.userDetails = user
      this.user$.next(this.user);
   });
   }

   public isUserLoggedIn(){
    return this.user.userDetails !== undefined;
   }

   public giveAdminRights(){
      this.user.isAdmin = true;
      this.user$.next(this.user);
   }

   public getUser(){
      return this.user$.asObservable();
   }

   public updateToPrime(){
      this.user.isPrime = true;
      this.user$.next(this.user);
      localStorage.setItem(this.user.userDetails?.email as string, JSON.stringify({isPrime: true}));
   }


   public signOut(){
      this.user = {userDetails: undefined, isAdmin: false, isPrime: false};
      this.user$.next(this.user);
      this._socialAuthService.signOut();
   }

   public isAdmin(){
      return this.user.isAdmin;
   }

   public isPrime(){
      const res = localStorage.getItem(this.user.userDetails?.email?? '');
      if(res){
         return JSON.parse(res).isPrime;
      }
      return false;
   }
}