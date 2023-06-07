require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/fsJewAWhnXNEaTRYIMhO9dTN6a4f0SHb",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
