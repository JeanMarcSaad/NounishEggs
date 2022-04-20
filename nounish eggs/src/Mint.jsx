import { useRef, useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Mint.css";

let f0 = null;
let web3 = null;
if (typeof window.ethereum == 'undefined') {
  alert("Metamask is not installed");
} else {
  web3 = new Web3(ethereum)
  f0 = new F0();
}

const contract_address = "0x8b5065c5354d1EC05d28cc9Fceafe18783C59F69"

const mintPrice = 0;
const public_sale = true;

const Mint = () => {
    const [nextId, setNextId] = useState(-1);
    const [mintCount, setMintCount] = useState(1);
    const [inviteKey, setInviteKey] = useState(null);
    const [mintCost, setMintCost] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [isWhitelisted, setIsWhitelisted] = useState(true);
    const [isMinting, setIsMinting] = useState(false);
    const [error, setError] = useState("");
    const [address, setAddress] = useState("");
    const mintSelect = useRef(null);
    const options = [...Array(9)].map((_, i) => {
        return {value: i+1, label: i+1};
    });

    useEffect(() => {
        setMintCost((mintCount*mintPrice).toFixed(3));
    }, [mintCount]);

    const handleSelectChange = (event) => {
        setMintCount(event.target.value);
        setMintCost((event.target.value*mintPrice).toFixed(3));
    }

    const connectWallet = () => {
        f0?.init({
            web3: web3,
            contract: contract_address,
        })
        .then(async () => {
            let invites = await f0.myInvites();
            let inviteKeys = Object.keys(invites);
            if (!public_sale && inviteKeys.length === 0)
                setIsWhitelisted(false);
            
            if (inviteKeys.length > 0)
                setInviteKey(inviteKeys[0]);
            if (public_sale)
                setInviteKey(null);

            let nextId = await f0.nextId();
            setNextId(nextId);
            setAddress(f0.account);
            setIsConnected(true)
        })
    }

    const mint = () => {
        setIsMinting(true);
        setError("");
        f0?.mint(inviteKey, mintSelect.current.value)
        .then(() => {
            setIsMinting(false);
        })
        .catch((error) => {
            setIsMinting(false);
            setMintCount(1);
            setError(error.message);
        })
    }

    return (
        <div className="Mint">
            <h3 className="Mint-Counter">{nextId===-1?"???":nextId-1}/555</h3>
            {
                !isConnected?
                <button className="Mint-ConnectButton" onClick={() => connectWallet()}>Connect Wallet</button>
                : <div>
                    {
                        isWhitelisted?
                        <div>
                            {
                                isMinting?
                                <ClipLoader size={45}/>
                                :
                                <div>
                                    <select name="mint-select" className="mint-select" id="mint-select" ref={mintSelect} defaultValue={1} onChange={handleSelectChange}>
                                    {
                                    options.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option>)
                                    }
                                    </select>
                                    <button className='mint-button' onClick={mint}>Mint</button>
                                </div>
                            }
                        </div>  
                        : <div className="mint-error"><p>Sorry, your address is not whitelisted.</p></div>
                    }
                    {isWhitelisted&&<div className="mint-error"><p>Total: {mintCost}Ξ<br/><span style={{color: "red"}}>{error}</span></p></div>}
                </div>
            }
        </div>
    )
}

export default Mint;