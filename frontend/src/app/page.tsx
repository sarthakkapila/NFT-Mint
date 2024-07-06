"use client"

import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [walletExtension, setWalletExtension] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [date, setDate] = useState("2000-05-27");
  const [zodiac, setZodiac] = useState("Gemini")

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


  function calculateZodiacSign(date: string) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month == 0) {
      if (day >= 20) {
        setZodiac("Aquarius");
      } else {
        setZodiac("Capricorn");
      }
    } else if (month == 1) {
      if (day >= 19) {
        setZodiac("Pisces");
      } else {
        setZodiac("Aquarius");
      }
    } else if (month == 2) {
      if (day >= 21) {
        setZodiac("Aries");
      } else {
        setZodiac("Pisces");
      }
    } else if (month == 3) {
      if (day >= 20) {
        setZodiac("Taurus");
      } else {
        setZodiac("Aries");
      }
    } else if (month == 4) {
      if (day >= 21) {
        setZodiac("Gemini");
      } else {
        setZodiac("Taurus");
      }
    } else if (month == 5) {
      if (day >= 21) {
        setZodiac("Cancer");
      } else {
        setZodiac("Gemini");
      }
    } else if (month == 6) {
      if (day >= 23) {
        setZodiac("Leo");
      } else {
        setZodiac("Cancer");
      }
    } else if (month == 7) {
      if (day >= 23) {
        setZodiac("Virgo");
      } else {
        setZodiac("Leo");
      }
    } else if (month == 8) {
      if (day >= 23) {
        setZodiac("Libra");
      } else {
        setZodiac("Virgo");
      }
    } else if (month == 9) {
      if (day >= 23) {
        setZodiac("Scorpio");
      } else {
        setZodiac("Libra");
      }
    } else if (month == 10) {
      if (day >= 22) {
        setZodiac("Sagittarius");
      } else {
        setZodiac("Scorpio");
      }
    } else if (month == 11) {
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

        <div>
          <p className="text-center">Connected: {account}</p>

          <input onChange={handleDateInput} value={date} type="date" id="dob" />

          {zodiac ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
              viewBox="0 0 300 300"
              width="400px"
              height="400px"
            >
              <style>{`.base { fill: white; font-family: serif; font-size: 24px;`}</style>
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="50%"
                class="base"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                {zodiac}
              </text>
            </svg>
          ) : null}

          <br />
          <br />
          <button disabled={isMinting} onClick={mintNFT}>
            {isMinting ? "Minting..." : "Mint"}
          </button>
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
