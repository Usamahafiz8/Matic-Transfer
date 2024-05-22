// 'https://mainnet.infura.io/v3/b46c93187b4e4a6d894777eba4b6cda6'
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and MetaMask is running.
  web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error("User denied account access");
  }
} else {
  // We are on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'
  );
  web3 = new Web3(provider);
}

const sendTransaction = async (from, to, valueInWei) => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000; // Typical limit for standard transactions

    const transactionParameters = {
      to,
      from,
      value: web3.utils.toHex(valueInWei),
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      chainId: '0x89' // Polygon Mainnet (137)
    };

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    return txHash;
  } catch (error) {
    console.error("Error sending transaction: ", error);
    throw error;
  }
};

export { web3, sendTransaction };
