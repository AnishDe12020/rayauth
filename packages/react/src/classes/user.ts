import { userOptions } from "../interfaces";

import { EventEmitter } from "sweet-event-emitter";

export class userConstructor {
  public id!: string | undefined;
  public createdAt!: string | undefined;
  public updatedAt!: string | undefined;
  public email!: string | undefined;
  public address!: string | undefined;
  public avatar!: string | undefined;
  public event: EventEmitter 
  public state: any;

  constructor(options?: userOptions) {
    this.id = options?.id;
    this.createdAt = options?.createdAt;
    this.updatedAt = options?.updatedAt;
    this.email = options?.email;
    this.address = options?.address;
    this.avatar = options?.address;
    this.event = new EventEmitter();
  }


  
  public syncState(state: unknown) {
    this.state = state
  }

}


