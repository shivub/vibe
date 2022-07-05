import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddTvComponent } from './components/add-tv/add-tv.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { TvShowDetailComponent } from './components/tv-show-detail/tv-show-detail.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {path: 'add-movie', component: AddMovieComponent},
  {path: 'add-tv', component: AddTvComponent},
  {path: 'login', component: LoginComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'movie-detail/:id', component: MovieDetailComponent},
  {path: 'tv-detail/:id', component: TvShowDetailComponent},
  {path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/browse', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
