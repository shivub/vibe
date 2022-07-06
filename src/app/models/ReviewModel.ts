import { AuthorDetailMode } from "./AuthorDetailModel";

export class ReviewModel{
    author!: string;
    author_details!: AuthorDetailMode;
    content!: string;
    created_at?: string;
    id!: string;
    updated_at?: string;
    url?: string;
    showId?: number;
    mediaType?: string;

    constructor(username: string, author: string,rating: number, content: string, showId: number, mediaType: string ){
        this.author  = author;
        this.author_details = { rating, username };
        this.content = content;
        this.id = '';
        this.showId = showId;
        this.mediaType = mediaType;
    }
}