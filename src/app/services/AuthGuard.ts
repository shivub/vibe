import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppInitService } from "./AppinitService";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private _appInit: AppInitService){}
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        debugger
        return this._appInit.user !== undefined;
    }

}