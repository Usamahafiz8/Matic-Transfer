import React, { useState } from 'react';
import { web3, sendTransaction } from '../utils/web3';

const ConnectButton = () => {
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amountInWei, setAmountInWei] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet: ", error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const txHash = await sendTransaction(account, recipient, amountInWei);
      setTxHash(txHash);
    } catch (error) {
      console.error("Error sending Matic: ", error);
      setError('Transaction failed. Please check the console for more details.');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      
      {account && (
        <form onSubmit={handleTransfer}>
          <div>
            <label>
              Recipient Address:
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Amount (Wei):
              <input
                type="text"
                value={amountInWei}
                onChange={(e) => setAmountInWei(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Send Matic</button>
        </form>
      )}

      {txHash && (
        <div>
          <p>Transaction Hash: {txHash}</p>
        </div>
      )}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
