import { ShowDetailModel } from "./ShowDetailModel";
import { TvSeasonsModel } from "./TvSeasonsModel";

export class TvDetailModel extends ShowDetailModel{
    in_production!: boolean;
    languages!: [string];
    name!: string;
    number_of_episodes!: number;
    number_of_seasons!: number;
    original_name!: string;
    seasons!: TvSeasonsModel;
    type!: string;
}