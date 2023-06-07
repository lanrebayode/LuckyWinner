import React, { useContext } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

import Style from "./NavBar.module.css";
import ethImg from "../../public/ether.png";
import { LuckyWinnerContext } from "@/Hooks/Integrations";

const NavBar = () => {
  const { connectWallet, ethPrice } = useContext(LuckyWinnerContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_title}>
          <h1>LuckyWinner</h1>
          {/* <Image src={} alt='logo' width={50} height={50} /> */}
        </div>

        <div className={Style.NavBar_box_ethPrice}>
          <Image
            className={Style.NavBar_box_ethPrice_img}
            src={ethImg}
            alt="eth-logo"
            width={40}
            height={40}
          />
          <p> {ethPrice ? `$${ethPrice}` : "--"} </p>
        </div>

        <div className={Style.NavBar_box_wallet}>
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            //  onClick={connectWallet()}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
