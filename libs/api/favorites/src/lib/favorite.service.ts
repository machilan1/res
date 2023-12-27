import { Inject, Injectable } from "@nestjs/common";
import { PG_CONNECTION,Database} from '@res/api-database'

@Injectable()
export class FavoriteService{
    constructor(
        @Inject(PG_CONNECTION)
    ){}

    create(){}

    delete(){}
}