import React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_title}>
          <h1>LuckyWinner</h1>
          {/* <Image src={} alt='logo' width={50} height={50} /> */}
        </div>

        <div className={Style.NavBar_box_ethPrice}>
          <p>ETH: $1,700</p>
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
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
