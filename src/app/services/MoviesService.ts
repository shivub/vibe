import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MoviesService{
    constructor(private _http: HttpClient){}

    public fetchPopularMovies(){}

    public fetchTrendingMovies() {}

    public fetchNewMovies() {}

    public fetchAwardWinningMovies() {}

    public fetchRegionalMovies(lang: string) {}

    public searchMovie(query: string){}

    public fetchMovieDetails(id: number) {}
}