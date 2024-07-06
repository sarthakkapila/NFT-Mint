"use client"

import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [walletExtension, setWalletExtension] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      setWalletExtension(true);
    }
  }, []);

  async function connectWallet() {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setError(null);
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Failed to connect wallet. Please try again.");
    }
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="font-bold text-5xl text-center mb-8">Horoscope Minting DAPP</h1>
      {!walletExtension ? (
        <p className="text-center text-red-500">Please install a wallet extension like MetaMask.</p>
      ) : !account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-center">Connected: {account}</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );

















  
   
      
      
    
      
        
      
      
  
      





