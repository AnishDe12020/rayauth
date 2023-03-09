import { walletListener } from "../classes/eventListener";
export function handleWallet(state: any) {
  
    const event = walletListener.eventEmitter();
    window.onmessage = function(e) {
        console.log(e.data)
        if (e.data.type == 'signtransac') {
          console.log(true)
          event.emit("signTransac", e.data)
        }
        if(e.data.type == "txnData") {
          console.log(true); 
          console.log(e.data)
          state.setTxnData(e.data)
          state.setVisable(false)
          console.log("state idhar hai", state.txnData)
        }
    }; 
}