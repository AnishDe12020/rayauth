import { EventEmitter } from "sweet-event-emitter";


export class WalletListener {
    private event: EventEmitter


    constructor() {
        this.event = new EventEmitter()
    }
    
    
    public eventEmitter(): EventEmitter {
      return this.event
    }

    public onSignTransac(func: (data: {}) => void) {
        this.event.on("signTransac", func)
    }
}