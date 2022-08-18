import { Data } from "@angular/router";
import { Image } from "./image";
import { Person } from "./person";

export class Works {
    idWork? : number;
    workName:string;
    company:string;
    date_from:Date;
    date_until:Date;
    description:string;
    workPerson?:Person;
    img?:Image;

    constructor(workName:string,
                company:string,
                date_from:Date,
                date_until:Date,
                description:string,
                workPerson:Person,
                img:Image){
                    this.workName = workName;
                    this.company = company;
                    this.date_from = date_from;
                    this.date_until = date_until;
                    this.description = description;
                    this.workPerson = this.workPerson;
                    this.img = img;
                }
}
