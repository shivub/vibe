import { ShowModel } from "../models/ShowModel";
const STORAGE_KEY = 'Showslibrary';
const WATCH_LATER = 'Watch Later';
const IS_WATCHED = 'Watched';
const FAVOURITE = 'Favourite';
export class ListService{
    private lists: {[id: string]: ShowModel[]} = {};
    constructor(){
        if(!localStorage.getItem(STORAGE_KEY)){
            this.lists[WATCH_LATER] = [];
            this.lists[FAVOURITE] = []
            this.lists[IS_WATCHED] = [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
        }
        else {
            this.lists = JSON.parse(localStorage.getItem(STORAGE_KEY)??'');
        }
    }

    public addToList(list: string, show: ShowModel)
    {
        this.lists[list] = [...this.lists[list], show];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
    }

    public addToWatchLater(show: ShowModel)
    {
        this.lists[WATCH_LATER] = [...this.lists[WATCH_LATER], show];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
    }

    public removeFromWatchLater(show: ShowModel){
        debugger
        const index = this.lists[WATCH_LATER].findIndex(s => s.id === show.id);
        if(index >= 0)
        {
            this.lists[WATCH_LATER].splice(index,1);
        }
    }

    public addToFavourites(show: ShowModel)
    {
        this.lists[FAVOURITE] = [...this.lists[FAVOURITE], show];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
    }

    public removeFromFavourites(show: ShowModel){
        const index = this.lists[FAVOURITE].findIndex(s => s.id === show.id);
        if(index >= 0)
        {
            this.lists[FAVOURITE].splice(index,1);
        }
    }

    public addToWatched(show:ShowModel) {
        this.lists[IS_WATCHED] = [...this.lists[IS_WATCHED], show];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
    }

    public removeFromWatched(show: ShowModel){
        const index = this.lists[IS_WATCHED].findIndex(s => s.id === show.id);
        if(index >= 0)
        {
            this.lists[IS_WATCHED].splice(index,1);
        }
    }

    public createList(list: string){
        this.lists[list] = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
    }

    public getListNames(): string[]{
        return Object.keys(this.lists)
    }

    public getLists(listType: string){
        return this.lists[listType];
    }

    public getAllLists(){
        return this.lists;
    }

    public findList(id: number){
        const isFav = this.lists[FAVOURITE].some(show => show.id === id);
        const isWatched = this.lists[IS_WATCHED].some(show => show.id === id);
        const isWatchedLater = this.lists[WATCH_LATER].some(show => show.id === id);
        return {isFavourite: isFav, isWatched: isWatched, isWatchLater: isWatchedLater}
    }
}