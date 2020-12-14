import { Behov } from "./Behov";
import { Kodeliste } from "./Kodeliste";

export interface Krav{
    id:string,
    tittel:string, 
    beskrivelse:string, 
    behov:Behov;
    version: number;
    type:string;
    kodeliste?:Kodeliste;

}