import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";

export default function Airdrop(){
    const [amount, setAmount] = useState(0);
    const wallet = useWallet();
    const [walbal, setWalBal] = useState(null);
    const balance = useEffect(() => {
        getWalletBalance(wallet.publicKey);
    })

    async function sendAirdrop(walletAddress, amount){
        const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/yV8uf_2Ss1pPDEVsNL36hiOKqv7ctRH3');
        await connection.requestAirdrop(walletAddress, parseInt(amount) * 1e9);
    }

    async function getWalletBalance(walletAddress){
        const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/yV8uf_2Ss1pPDEVsNL36hiOKqv7ctRH3');
        const balance  = await connection.getBalance(walletAddress);
        console.log(balance);
        setWalBal(balance);
        return balance;
    }

    function handleButtonClick(){
        if(amount === 0){
            return null;
        }

        if(!wallet.publicKey){
            return null;
        }

        const publicKey = wallet.publicKey;

        sendAirdrop(publicKey, amount);
        console.log("Done");
    }
    return(
        <>
            <input type={"number"} placeholder={"Enter amoount"} value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <br />
            <button onClick={handleButtonClick}>Send airdrop</button>
            <h3>The balance is {walbal/ 1e9} SOL</h3>
        </>
    );
}