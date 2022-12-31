import { Connection, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");  

const address = process.argv[2];
const user = new PublicKey(address);
const solBalance = await connection.getBalance(user, 'confirmed') / LAMPORTS_PER_SOL;
// prints the wallet address, and its balance in sol. Comma-delimited
console.log(`${user.toBase58()},${solBalance}`)


