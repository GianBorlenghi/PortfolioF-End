import { Person } from "./person";

export class Education {
    idEducation?:number;
    area:string;
    dateOfGraduation:Date;
    name:string;
    institution:string;
    educPerson:Person;
    hours:number;
    constructor(idEducation:number, area:string,dateOfGraduation:Date,educPerson:Object,name:string,institution:string,hours:number){
        this.idEducation = idEducation;
        this.area = area;
        this.dateOfGraduation = dateOfGraduation;
        this.educPerson = this.educPerson;
        this.name = name;
        this.institution = institution;
        this.hours = hours;
    }
}
