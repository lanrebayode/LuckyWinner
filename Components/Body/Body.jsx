import React, { useContext, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Style from "./Body.module.css";
import { LuckyWinnerContext } from "@/Hooks/Integrations";
//import img1 from "../../public/img1.jpg";

const Body = () => {
  const {
    play,
    balance,
    ethBalance,
    roundPlayers,
    prevWinners,
    payWinner,
    totalEthPaidOut,
  } = useContext(LuckyWinnerContext);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  const openPlayers = () => {
    console.log("Open", roundPlayers);
    if (!showPlayers) {
      setShowPlayers(true);
    } else {
      setShowPlayers(false);
    }
  };

  const openWinners = () => {
    if (!showWinners) {
      setShowWinners(true);
    } else {
      setShowWinners(false);
    }
  };

  const winnersArray = prevWinners;
  const playersArray = roundPlayers;
  return (
    <div className={Style.Body}>
      <div className={Style.Body_box}>
        <div className={Style.Body_box_down}>
          <h1>Our Mission</h1>
          <p>
            LuckyWinner is a decentralized application on the Ethereum(Sepolia)
            blockchain that offers a transparent and fair lottery system. Each
            round has a maximum of players, and the winner receives the proceeds
            in Ether. Smart contracts handle entry, random number generation
            with Chainlink VRF, and the distribution of winnings.
            <br />
            <br /> Participants enter by sending 0.01 Ether to the smart
            contract address, and once the maximum number of players is reached,
            a winner is selected using a provably fair algorithm. LuckyWInner
            provides a user-friendly interface to track rounds and previous
            winners. It ensures security, transparency, and eliminates the need
            for intermediaries. A total of{" "}
            <strong className={Style.paidEth}>{totalEthPaidOut}Eth</strong> has
            been paid out.
          </p>
        </div>
        <div className={Style.Body_box_left}>
          <div className={Style.Body_box_left}>
            <div>
              <button
                className={Style.Body_box_left_btn}
                onClick={() => play()}
              >
                Play
              </button>
              <p>Play with 0.01 Eth</p>
            </div>
            <h2>Pot Balance: {balance} ETH</h2>
            <div className={Style.Body_box_left_players}>
              <h3 onClick={openPlayers}>
                Round Players{" "}
                {/* {showPlayers ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "} */}
              </h3>
              {showPlayers &&
                playersArray.map((el, i) =>
                  playersArray.length > 1 ? (
                    <p key={i + 1}>
                      {i + 1}. {el}
                    </p>
                  ) : (
                    <p>No Players yet</p>
                  )
                )}
            </div>
            <div className={Style.Body_box_right}>
              <h3 onClick={openWinners}>
                Game History{" "}
                {/* {showWinners ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "} */}
              </h3>
              {showWinners &&
                winnersArray.map((el, i) => (
                  <div
                    className={Style.Body_box_right_item}
                    key={i + 1}
                    el={el}
                    i={i}
                  >
                    <p>Round {i + 1} </p>
                    <p>Winning Address: {el}</p>
                  </div>
                ))}
            </div>
            <button
              className={Style.Body_box_left_btn}
              onClick={() => payWinner()}
            >
              Pick WInner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
