import { Person } from "./person";

export class Technology {

    idTechnology?:number;
    nameTechnology:string;
    level:string;
    techPerson:Person;

    constructor(idTechnology:number,nameTechnology:string,
        level:string,
        techPerson:Person){
            this.idTechnology = idTechnology;
            this.nameTechnology = nameTechnology;
            this.level = level;
            this.techPerson = this.techPerson;
        }
}
