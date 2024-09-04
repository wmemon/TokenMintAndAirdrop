import './App.css'


import { Connection, clusterApiUrl } from '@solana/web3.js'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import CreateTokenMint from './CreateTokenMint';
import { SignMessage } from './SignMessage';

function App() {

  return (
    <>
             <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/yV8uf_2Ss1pPDEVsNL36hiOKqv7ctRH3'}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <Airdrop />
                    <CreateTokenMint />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </>
  )
}

export default App
