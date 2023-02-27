import { userOptions } from "../interfaces";

export class user {
    public id!: string;
    public createdAt!: string;
    public updatedAt!: string;
    public email!: string;
    public address!: string;
    public avatar!: string;
    
    constructor(options: userOptions) {
     this.id = options.id
     this.createdAt = options.createdAt;
     this.updatedAt = options.updatedAt;
     this.email = options.email;
     this.address = options.address;
     this.avatar = options.address;
    }

     public sendTransaction(addr: string, options: {}) {
         console.log(addr, options)
    }
}