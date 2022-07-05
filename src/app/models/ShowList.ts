import { ShowModel } from "./ShowModel";

export class ShowList{
    movies!: ShowModel[];
    tv!: ShowModel[];

    constructor(movies: ShowModel[], tv: ShowModel[]){
        this.movies = movies;
        this.tv = tv;
    }

    public concatShows() {
        return this.movies.concat(this.tv);
    }
}