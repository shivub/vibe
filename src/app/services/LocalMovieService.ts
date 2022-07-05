import { Injectable } from "@angular/core";
import { MovieDetailModel } from "../models/MovieDetailModel";

const STORAGE_KEY = "Movies"
@Injectable({providedIn: 'root'})
export class LocalMovieService{

    private movieList!: MovieDetailModel[];
    constructor(){
        if(!localStorage.getItem(STORAGE_KEY)){
            this.movieList = []
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.movieList));
        }
        else {
            this.movieList = JSON.parse(localStorage.getItem(STORAGE_KEY)??'');
        }
    }

    public saveMovie(movie: MovieDetailModel){
        movie.id = this.movieList.length + 1;
        this.movieList = [...this.movieList, movie];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.movieList));
    }

    public getMovies(){
        return this.movieList;
    }
}