import React from "react";
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillGithub,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { TiSocialInstagramCircular } from "react-icons/ti";

import Style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Style.Footer}>
      <div className={Style.Footer_box}></div>
      <div className={Style.Footer_box_icons}>
        <a href="https://www.linkedin.com/in/olanrewaju-bayode-a71674189/">
          <AiFillLinkedin className={Style.Footer_box_icon} />
        </a>
        <a href="https://twitter.com/LanreBayode1">
          <AiFillTwitterCircle className={Style.Footer_box_icon} />
        </a>
        <a href="https://github.com/lanrebayode/LuckyWinner">
          <AiFillGithub className={Style.Footer_box_icon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
