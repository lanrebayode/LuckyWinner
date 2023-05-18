import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Style from "./Body.module.css";
//import img1 from "../../public/img1.jpg";

const Body = () => {
  const [showPlayers, setShowPlayers] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  const openPlayers = () => {
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

  const winnersArray = [1, 2, 3];
  const playersArray = [1, 2, 3];
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
            for intermediaries.
          </p>
        </div>
        <div className={Style.Body_box_left}>
          <div className={Style.Body_box_left}>
            <div>
              <button className={Style.Body_box_left_btn}>Play</button>
              <p>Play with 0.01 Eth</p>
            </div>
            <h2>Pot Balance: 0.043 ETH</h2>
            <div className={Style.Body_box_left_players}>
              <h3 onClick={openPlayers}>
                Round Players{" "}
                {/* {showPlayers ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "} */}
              </h3>
              {showPlayers &&
                playersArray.map((el, i) => (
                  <p key={i + 1}>
                    {i + 1}. 898fs8df9dffu9sdfd8f8fs9dffsdf9sdj90su
                  </p>
                ))}
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
                    <p>
                      Winning Address: slfdkg98df9g8dfgfdj9jsdjf0909ufdssd09df
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
