// Execute.js


const PATH_FINDER_API_URL = "https://api-beta.pathfinder.routerprotocol.com/api";

const getTransaction = async (params, quoteData) => {
    const endpoint = "v2/transaction";
    const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(txDataUrl);

    try {
        const response = await fetch(txDataUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...quoteData,
                senderAddress: params.senderAddress,
                receiverAddress: params.receiverAddress,
                refundAddress: params.refundAddress || params.senderAddress,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`Fetching tx data from pathfinder: ${e}`);
    }
};

export default getTransaction;
