import { walletListener } from "../classes/eventListener";

export function handleWallet() {
    const event = walletListener.eventEmitter();
    window.onmessage = function(e) {
        console.log(e.data)
        if (e.data.type == 'signtransac') {
          console.log(true)
          event.emit("signTransac", e.data)
        }
    }; 
}