import { getHashedName, getNameAccountKey, NameRegistryState } from "@bonfida/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");  

const sns = process.argv[2]

const hashedName = await getHashedName(sns.replace(".sol", ""));

const nameAccountKey = await getNameAccountKey(
    hashedName,
    undefined,
    new PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx") // SOL TLD Authority
  );

  const owner = await NameRegistryState.retrieve(
    connection,
    nameAccountKey
  );

console.log(`${owner.registry.owner.toBase58()},${sns}`);

