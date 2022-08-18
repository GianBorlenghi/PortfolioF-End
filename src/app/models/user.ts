export class User {
        iduser?:number;
        mail:string;
        password:string;
        lastConnection?:Date;
        online?:boolean;
    
        constructor(mail:string,password:string,lastConnection:Date,online:boolean){
            this.mail = mail;
            this.password = password;
            this.lastConnection = lastConnection;
            this.online = online;
        }

        setMail?(mail:string){
            this.mail = mail;
        }

        setPassword?(password:string){
            this.password = password;
        }
    }
    

