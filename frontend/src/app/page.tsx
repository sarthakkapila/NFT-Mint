"use client"

import { useEffect, useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";
import NFT from '../abi/horoscopeNFT.json';

export default function Home() {
  const [walletExtension, setWalletExtension] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [date, setDate] = useState("2000-05-27");
  const [zodiac, setZodiac] = useState("Gemini");
  const [NFTContract, setNFTContract] = useState<Contract | null>(null);

  const NFT_CONTRACT_ADDRESS = "0x5c512A1eaF19a7A55909F6749345152f58B46d17";

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

  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);

  useEffect(() => {
    function initNFTContract() {
      if (account) {
        const provider = new BrowserProvider((window as any).ethereum);
        provider.getSigner().then((signer) => {
          const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer);
          setNFTContract(contract);
        }).catch((error: Error) => {
          console.error("Error initializing contract:", error);
        });
      }
    }
    initNFTContract();
  }, [account]);

  async function mintNFT() {
    if (!NFTContract || !account) {
      setError("Contract or account not initialized");
      return;
    }

    setIsMinting(true);
    try {
      const transaction = await NFTContract.mintNFT(account, zodiac);

      // Wait for the transaction to be confirmed
      await transaction.wait();

      // Transaction is confirmed
      alert("Minting Successful");
    } catch (e) {
      console.error(e);
      setError("Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  }

  function calculateZodiacSign(date: string) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month === 0) {
      if (day >= 20) {
        setZodiac("Aquarius");
      } else {
        setZodiac("Capricorn");
      }
    } else if (month === 1) {
      if (day >= 19) {
        setZodiac("Pisces");
      } else {
        setZodiac("Aquarius");
      }
    } else if (month === 2) {
      if (day >= 21) {
        setZodiac("Aries");
      } else {
        setZodiac("Pisces");
      }
    } else if (month === 3) {
      if (day >= 20) {
        setZodiac("Taurus");
      } else {
        setZodiac("Aries");
      }
    } else if (month === 4) {
      if (day >= 21) {
        setZodiac("Gemini");
      } else {
        setZodiac("Taurus");
      }
    } else if (month === 5) {
      if (day >= 21) {
        setZodiac("Cancer");
      } else {
        setZodiac("Gemini");
      }
    } else if (month === 6) {
      if (day >= 23) {
        setZodiac("Leo");
      } else {
        setZodiac("Cancer");
      }
    } else if (month === 7) {
      if (day >= 23) {
        setZodiac("Virgo");
      } else {
        setZodiac("Leo");
      }
    } else if (month === 8) {
      if (day >= 23) {
        setZodiac("Libra");
      } else {
        setZodiac("Virgo");
      }
    } else if (month === 9) {
      if (day >= 23) {
        setZodiac("Scorpio");
      } else {
        setZodiac("Libra");
      }
    } else if (month === 10) {
      if (day >= 22) {
        setZodiac("Sagittarius");
      } else {
        setZodiac("Scorpio");
      }
    } else if (month === 11) {
      if (day >= 22) {
        setZodiac("Capricorn");
      } else {
        setZodiac("Sagittarius");
      }
    }
  }

  function handleDateInput({ target }: any) {
    setDate(target.value);
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="container mx-auto p-8 text-center bg-gray-900 rounded-lg shadow-lg">
        <h1 className="font-bold text-5xl text-white mb-8">Horoscope Minting DAPP</h1>
        {!walletExtension ? (
          <p className="text-red-500">Please install a wallet extension like MetaMask.</p>
        ) : !account ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg shadow-md transition duration-300"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">Connected: {account}</p>

            <input
              onChange={handleDateInput}
              value={date}
              type="date"
              id="dob"
              className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {zodiac ? (
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin meet"
                  viewBox="0 0 300 300"
                  width="300px"
                  height="300px"
                >
                  <style>{`.base { fill: white; font-family: serif; font-size: 24px; }`}</style>
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    className="base"
                    dominantBaseline="middle"
                    textAnchor="middle"
                  >
                    {zodiac}
                  </text>
                </svg>
              </div>
            ) : null}

            <button
              disabled={isMinting}
              onClick={mintNFT}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-lg shadow-md transition duration-300 ${isMinting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isMinting ? "Minting..." : "Mint"}
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

