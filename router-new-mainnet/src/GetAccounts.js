
import createMetaMaskProvider from 'metamask-extension-provider';



const getProvider = () => {
    if (window.ethereum) {
        console.log('found window.ethereum>>');
        return window.ethereum;
    } else {
        const provider = createMetaMaskProvider();
        return provider;
    }
}


const getAccounts = async (provider) => {
    if (provider) {
        try {
            const [accounts, chainId] = await Promise.all([
                provider.request({ method: 'eth_requestAccounts' }),
                provider.request({ method: 'eth_chainId' }),
            ]);
            return { accounts, chainId };
        } catch (error) {
            console.error("Error fetching accounts and chainId:", error);
            return { accounts: [], chainId: null };
        }
    }
    return { accounts: [], chainId: null };
};