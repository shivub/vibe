export class ShowModel
{
    id!: number;
    title!: string;
    name!: string;
    poster_path!: string;
    media_type!: string;
    popularity?: number;
    vote_average?: number;
    vote_count?: number;
    isWatched?: boolean;
    isfavourite?: boolean;
    isWatchLater?: boolean;
}