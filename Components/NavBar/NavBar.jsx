import React, { useContext } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

import Style from "./NavBar.module.css";
import ethImg from "../../public/ether.png";
import logo from "../../public/luckyLogo1.jpg";
import { LuckyWinnerContext } from "@/Hooks/Integrations";

const NavBar = () => {
  const { connectWallet, ethPrice } = useContext(LuckyWinnerContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_title}>
          <Image
            className={Style.NavBar_box_title_img}
            src={logo}
            alt="luck-logo"
            width={70}
            height={70}
          />
          <h1>LuckyWinner</h1>
          {/* <Image src={} alt='logo' width={50} height={50} /> */}
        </div>

        <div className={Style.NavBar_box_ethPrice}>
          <Image
            className={Style.NavBar_box_ethPrice_img}
            src={ethImg}
            alt="eth-logo"
            width={50}
            height={50}
          />
          <p> {ethPrice ? `$${ethPrice}` : "--"} </p>
        </div>

        <div
          className={Style.NavBar_box_wallet}
          onClick={() => connectWallet()}
        >
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
