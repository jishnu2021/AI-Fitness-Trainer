import { ethers } from "ethers";

const PATH_FINDER_API_URL = "https://api-beta.pathfinder.routerprotocol.com/api"; // Replace with your actual PathFinder API URL

// Function to get transaction data from the API using fetch
export const getTransaction = async (params, quoteData, account) => {
    const endpoint = "v2/transaction";
    const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(txDataUrl);

    try {
        const res = await fetch(txDataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...quoteData,
                slippageTolerance: 0.5,
                senderAddress: account,
                receiverAddress: account,
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch transaction data: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (e) {
        console.error(`Fetching tx data from pathfinder: ${e}`);
        throw new Error("Failed to fetch transaction data");
    }
};

// Function to execute the transaction
export const executeTransaction = async (fromTokenAddress, toTokenAddress, quoteData) => {
    if (window.ethereum) {
        console.log('Ethereum detected');
        try {
            // Request the user's Ethereum account
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const account = accounts[0];
            console.log(account);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get transaction data from API
            const txResponse = await getTransaction({
                fromTokenAddress: '0x4200000000000000000000000000000000000006',
                toTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
                fromTokenChainId: "10",
                toTokenChainId: "42161",
                widgetId: 0,
            }, quoteData, account);

            // Send the transaction using the data from the API
            const tx = await signer.sendTransaction(txResponse.txn);
            try {
                await tx.wait();
                console.log(`Transaction mined successfully: ${tx.hash}`);
                alert(`Transaction mined successfully: ${tx.hash}`);
            } catch (error) {
                console.error(`Transaction failed with error: ${error}`);
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        console.error("Ethereum wallet is not detected");
    }
};

