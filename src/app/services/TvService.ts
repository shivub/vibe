import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TvService{
    constructor(private _htttp: HttpClient){}

    public fetchPopularTvShows(){}

    public fetchTrendingTvShows() {}

    public fetchNewTvShows() {}

    public fetchAwardWinningTvShows() {}

    public fetchRegionalTvShows(lang: string) {}

    public searchTvShows(query: string){}

    public fetchTvShowDetails(id: number) {}
}