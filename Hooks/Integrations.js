import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
//import Router, { useRouter } from "next/router";
import { getContract, getProvider } from "@wagmi/core";
import { Wallet } from "ethers";

import {
  LuckyWinnerV1Address,
  LuckyWinnerV1ABI,
  LuckyNumbersV1ABI,
  VrfAddress,
} from "./constants";
//import { network } from "hardhat";
import { AlchemyProvider } from "alchemy-sdk";

export const LuckyWinnerContext = React.createContext();

export const LuckyWinnerProvider = ({ children }) => {
  const [luckyWinnerV1Instance, setLuckyWinnerV1Instance] = useState();
  const [balance, setBalance] = useState();
  const [roundPlayers, setRoundPlayers] = useState([]);
  const [ethPrice, setEthPrice] = useState();
  const [prevWinners, setPrevWinners] = useState([]);
  const [totalEthPaidOut, setTotalEthPaidOut] = useState();

  let provider;

  const connectWallet = async () => {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LuckyWinnerV1Address,
        LuckyWinnerV1ABI,
        signer
      );
      setLuckyWinnerV1Instance(contract);

      console.log("contract instance:", contract);
      console.log("Connected Address", address);

      // DATA THAT WILL LOAD AS SOON AS THE CONTRACTINSTANCE IS GENERATED ////
      if (contract != "undefined") {
        ////////////////////// ETHER PRICE //////////////////////////////////////
        const ethPrice = await contract.getLatestEthPrice();
        const Eth = ethPrice.toNumber() / 100000000;
        setEthPrice(Eth);
        ////////////////////// POOL BALANCE //////////////////////////////////////
        const potBalance = await contract.getRoundBalance();
        const bal = ethers.utils.formatEther(potBalance);
        setBalance(bal);
        ////////////////////// Players Addresses //////////////////////////////////////
        const playersLength = await contract.getPlayersLength();
        const pLength = playersLength.toNumber();
        let playersArray = [];
        console.log(pLength);
        for (let i = 0; i < pLength; i++) {
          const playerAddress = await contract.players(i);
          playersArray.push(playerAddress);
          console.log(playerAddress);
        }
        setRoundPlayers(playersArray);

        ////////////////////// Previous Winners //////////////////////////////////////
        const historyLength = await contract.totalRound();
        const length = historyLength.toNumber();
        let winnersArray = [];
        if (length > 1) {
          for (let i = 1; i < length; i++) {
            const winner = await contract.roundToWinner(i);
            winnersArray.push(winner);
            //console.log(winner);
          }
        }
        setPrevWinners(winnersArray);

        ////////////////////// Total Paid Eth //////////////////////////////////////
        const totalPaidEth = await contract.totalEthPaidOut();
        const amount = ethers.utils.formatEther(totalPaidEth);
        console.log(amount);
        setTotalEthPaidOut(amount);
      }
    } catch (error) {
      console.log("Error while loading connecting", error);
    }
  };

  // console.log(roundPlayers);

  //////////////////FUNCTION PLAY////////////////////////
  const play = async () => {
    // const randomness = await contract2.requestRandomWords();
    // const winIndex = randomness % 3;
    // console.log(randomness);
    // console.log(winIndex);
    try {
      const fees = await luckyWinnerV1Instance.stake();
      const gameFee = ethers.utils.formatEther(fees);
      console.log(gameFee);
      const transaction = await luckyWinnerV1Instance.play({
        value: fees,
        gasLimit: 100000,
      });
      const txResponse = await transaction.wait();
      return txResponse;
    } catch (error) {
      console.log("encountered error on play", error);
    }
  };

  // const alchemyProvider = new ethers.providers.AlchemyProvider(
  //   "fsJewAWhnXNEaTRYIMhO9dTN6a4f0SHb"
  // );
  const prov = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/fsJewAWhnXNEaTRYIMhO9dTN6a4f0SHb"
  );

  const PRIVATEKEY = process.env.PRIVATE_KEY;

  const payWinner = async () => {
    console.log("paying....");
    if (roundPlayers == 3) {
    }
    const winner = await luckyWinnerV1Instance.getWinner({ gasLimit: 200000 });
    console.log(winner);
    const prize = await luckyWinnerV1Instance.prizePool();
    console.log(prize);
    const transaction = await luckyWinnerV1Instance.payWinner({
      gasLimit: 100000,
    });
    const txResponse = await transaction.wait();
    //const wallet = new Wallet(PRIVATEKEY);
  };

  //

  useEffect(() => {
    connectWallet();
    // if (roundPlayers.length >= 3) {
    //   payWinner();
    // }
  }, []);

  return (
    <LuckyWinnerContext.Provider
      value={{
        connectWallet,
        play,
        payWinner,
        balance,
        ethPrice,
        roundPlayers,
        prevWinners,
        totalEthPaidOut,
      }}
    >
      {children}
    </LuckyWinnerContext.Provider>
  );
};
