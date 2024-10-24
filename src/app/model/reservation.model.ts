import { Image } from "./image.model";
import { Type } from "./type.model";
export class reservation {
    idReservation!: number;
    nomclient?: string;
    prixsejour?: number;
    datedebut?: Date;
    datefin?: Date;
    type !: Type;
    image! : Image 
    imageStr!:string
    images!: Image[]; 
}
