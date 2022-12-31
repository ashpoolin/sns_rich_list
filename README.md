# SNS Rich List

## What
Just for fun. I pulled down the list of all Solana Name Service domains, then matched their vanity domain (SNS) with the current SOL record holder (the wallet address the name resolves to). From here, we get the top wallets by balance, and I give you the top 100.

## Code
Accompanying scripts can be found here. Code is just basic calls using the solana/web.js library and Bonfida's [SNS library](https://bonfida.github.io/solana-name-service-guide/installation.html). Credit can be given to the Solana Cookbook, and it looks like Levi, who wrote the bulk of the script used in step #2: [Resolving SOL Domains](https://solanacookbook.com/references/name-service.html#name-registry)

## Process
Here's the sequence if you want to recreate the list on your own:
1. Get all of the domains (this dumps the address of the domain itself, and the SNS .sol shortname)
    ```node getRegisteredDomains.mjs > all_domains.csv```

2. Then we get the wallet address that the domain points to in the SOL record.
```node getSolRecord.mjs <solana .sol name> // include .sol```

3. Finally, we collect all of the balances
```node getBalance.mjs <wallet address>```

The scripts are designed to be run atomically, in parallel, to speed things up. So if you don't have a rate limit, then you can hammer your RPC with the calls in steps #2 and #3, and be done a lot quicker. We do this as follows:
```
cat list_of_sns_domain_names.txt | parallel -j <number of threads to run in parallel> node getSolRecord.mjs {} > SNS_WALLET_ADDRESS_LIST.csv &  
# runs script #2 in the background, as it will take awhile. Can monitor progress like:
wc -l domains_with_wallet_address.csv 
# where the line count indicates the progress. There are about 180,000 SNS domains at the current time.
```
Similarly, you can fetch the balances in parallel and then stitch them together with a vlookup in Excel or some database like Postgres.
```
cat list_of_sns_wallet_addresses.txt | parallel -j <number of threads to run in parallel> node getBalance.mjs {} > sns_wallets_with_balance.csv & 
# same as before   
```

It's an exercise to the reader to combine the addresses with updated balances, if that's what they want to do.

## Future Work
None. I'll finish cleaning up this readme later. The current owners and balances will change. This is reasonably up to date as of 2022-12-30.