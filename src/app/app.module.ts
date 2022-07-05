import { APP_ID, APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HttpClientModule } from '@angular/common/http';
import {ConfigurationService} from './services/ConfigurationService';
import { ShowService } from './services/ShowService';
import { ListService } from './services/ListsService';
import { LibraryComponent } from './components/library/library.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GOOGLE_CLIENT_ID } from './shared/constants/category.const';
import { LoginComponent } from './components/login/login.component';
import { AppInitService } from './services/AppinitService';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddTvComponent } from './components/add-tv/add-tv.component';

function initializeConfig(configService: ConfigurationService){
  return () => {
    configService.fetchImageConfiguration();
    return new Promise<void>((resolve,reject) => resolve())
  }
}

function initializeApp(appInit: AppInitService){
  return () => {
    appInit.getUserDetail();
    return new Promise<void>((resolve,reject) => resolve())
  }
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrowseComponent,
    LibraryComponent,
    ShowDetailComponent,
    MovieDetailComponent,
    TvShowDetailComponent,
    LoginComponent,
    AddMovieComponent,
    AddTvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  providers: [
    ShowService,
    ListService,
    {
      provide: APP_INITIALIZER,
      deps: [ConfigurationService],
      multi: true,
      useFactory: initializeConfig
    },
    {
      provide: APP_INITIALIZER,
      deps: [AppInitService],
      multi: true,
      useFactory: initializeApp
    },
    {
      provide: 'SocialAuthServiceConfig', 
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID)
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
