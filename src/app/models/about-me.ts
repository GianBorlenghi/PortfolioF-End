
export class AboutMe {

    idPer?:number;
    dateOfBirth:Date;
    name:string;
    surname:string;
    description:string;
    city:string;
    country:string;

    constructor(dateOfBirth:Date,
        name:string,
        surname:string,
        description:string,
        city:string,
        country:string
    ){
        this.dateOfBirth=dateOfBirth;
        this.name = name;
        this.surname = surname;
        this.description = description;
        this.city = city;
        this.country = country;
    }
}
