import { Image } from "./image";

export class Person {
    idPer? : number;
    name: string;
    surname:string;
    dateOfBirth:Date;
    city:string;
    country:string;
    description:string;
    img?:Image;

    constructor(country:string,idPer:number,name:string,surname:string,dateOfBirth:Date,city:string,description:string,img:Image){
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.city = city;
        this.country = country;
        this.description = description;
        this.idPer = idPer;
        this.img = img;
    }

}
