import { ShowCategory } from "../shared/constants/category.const";

export class CardContext{
    id!: number;
    imageUrl!: string;
    category?: string;
    title!: string;
    isWatched?: boolean;
    isWatchedLater?: boolean;
    isfavourite? : boolean;
}