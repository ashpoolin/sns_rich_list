import { getAllRegisteredDomains, performReverseLookup } from "@bonfida/spl-name-service";
import { Connection } from "@solana/web3.js";
import {  } from "@bonfida/spl-name-service";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");  

const registeredDomains = await getAllRegisteredDomains(connection);

console.log("address, domain");

registeredDomains.map(async domain => {
    const domainName = await performReverseLookup(connection, domain.pubkey);
    console.log(domain.pubkey.toBase58(),domainName);
});

