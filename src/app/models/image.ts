export class Image {

    idImage?:number;
    type:string;
    img?:string;
    name:string;
    data:number;

    constructor(name:string,type:string,data:number){
      
        this.type = type;
        this.name = name;
        this.data = data;

    }

}
