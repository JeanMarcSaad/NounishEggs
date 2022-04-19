import { useRef, useState } from "react";
import "./Mint.css";

let f0 = require('f0js')
let web3 = require('web3')
if (typeof window.ethereum == 'undefined') {
  alert("Metamask is not installed");
} else {
  web3 = new Web3(ethereum)
  f0 = new F0();
}

const Mint = () => {
    const [count, setCount] = useState(-1);
    const [isConnected, setIsConnected] = useState(false);
    const [isWhitelisted, setIsWhitelisted] = useState(true);
    const mintSelect = useRef(null);
    const options = [...Array(22)].map((_, i) => {
        return {value: i+1, label: i+1};
    });
    
    const handleSelectChange = () => {
    }

    const mint = () => {
    }

    return (
        <div className="Mint">
            <h3 className="Mint-Counter">{count===-1?"???":count}/555</h3>
            {
                !isConnected?
                <button className="Mint-ConnectButton" onClick={() => setIsConnected(true)}>Connect Wallet</button>
                : <div>
                    {
                        isWhitelisted?
                        <div>
                            <select name="mint-select" className="mint-select" id="mint-select" ref={mintSelect} value={count} defaultValue={1} onChange={handleSelectChange}>
                            {
                            options.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option>)
                            }
                            </select>
                            <button className='mint-button' onClick={mint}>Mint</button>
                        </div>  
                        : <div><p>Sorry, your address is not whitelisted.</p></div>
                    }
                    <div><p>Limit 2 per address.</p></div>
                </div>
            }
        </div>
    )
}

export default Mint;