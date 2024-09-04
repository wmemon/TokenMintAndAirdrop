import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, Transaction, Keypair, Connection } from '@solana/web3.js';
import { useCallback } from 'react';
import { useWallet} from '@solana/wallet-adapter-react';

export default function CreateTokenMint() {
    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/yV8uf_2Ss1pPDEVsNL36hiOKqv7ctRH3');

    const createMintWithWallet = useCallback(
        async (
            connection,
            payerAddress,
            mintAuthority,
            freezeAuthority,
            decimals,
            keypair = Keypair.generate(),
            confirmOptions
        ) => {
            try {
                const lamports = await getMinimumBalanceForRentExemptMint(connection);
                const mint = Keypair.generate();
                let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
                console.log("recentBlockhash: ", blockhash);
                let transaction =  new Transaction({feePayer: payerAddress});
                transaction.recentBlockhash = blockhash;
                console.log("Payer Address:", payerAddress.toBase58());
                console.log("Mint Keypair PublicKey:", keypair.publicKey.toBase58());
                console.log("Lamports Required:", lamports);


                transaction.add(
                    SystemProgram.createAccount({
                        fromPubkey: payerAddress,
                        newAccountPubkey: mint.publicKey,
                        space: MINT_SIZE,
                        lamports,
                        programId: TOKEN_PROGRAM_ID,
                    }),
                    createInitializeMint2Instruction(mint.publicKey, decimals, mintAuthority, freezeAuthority),
                );

                console.log("Transaction:", transaction);
                await signTransaction(transaction)

                const signature = await sendTransaction(transaction, connection, {signers: [mint]});
                console.log('Transaction sent with signature:', signature);

                await connection.confirmTransaction(signature, 'confirmed');
                console.log('Transaction confirmed with signature:', signature);

                return keypair.publicKey;
            } catch (error) {
                console.error('Transaction failed:', error);
                throw error; // rethrow the error after logging
            }
        },
        [connection, sendTransaction]
    );

    const createTokenMint = async () => {
        if (publicKey) {
            try {
                await createMintWithWallet(connection, publicKey, publicKey, publicKey, 9);
            } catch (error) {
                console.error('Failed to create token mint:', error);
            }
        }
    };

    return (
        <div>
            <button onClick={createTokenMint} disabled={!publicKey}>
                Create Token Mint
            </button>
        </div>
    );
}
