import { ShowDetailModel } from "./ShowDetailModel";

export class MovieDetailModel extends ShowDetailModel{
    adult!: boolean;
    original_title!: string;
    release_date!: string;
    runtime!: number;
    title!: string;
}