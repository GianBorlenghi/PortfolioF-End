import { Image } from "./image";
import { Person } from "./person";

export class Project {

    idproject?:number;
    project_name:string;
    projectPerson:Person;
    listTechXProject:any[];
    img?:Image;
    url?:string;
    urlGit?:string;
    description:string;
    constructor(project_name:string,idproject:number,projectPerson:Person,listTechXProject:any[],img:Image,url:string,urlGit:string,description:string){
        this.projectPerson = projectPerson;
        this.project_name = project_name;
        this.idproject = idproject;
        this.listTechXProject = this.listTechXProject;
        this.img=img;
        this.url = url;
        this.urlGit = urlGit;
        this.description = description;
    }
}
