// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  //const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  //const unlockTime = currentTimestampInSeconds + 60;
  //const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const subscribtionId = 2020;

  const VRFv2Consumer = await hre.ethers.getContractFactory("VRFv2Consumer");
  const vRFv2Consumer = await VRFv2Consumer.deploy(subscribtionId);
  await vRFv2Consumer.deployed();
  const winningNumbersAddress = vRFv2Consumer.address;

  const LuckyWinnerV1 = await hre.ethers.getContractFactory("LuckyWinnerV1");
  const luckyWinnerV1 = await LuckyWinnerV1.deploy(winningNumbersAddress);

  //const Lock = await hre.ethers.getContractFactory("Lock");
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await luckyWinnerV1.deployed();

  console.log(
    `Deployed VRF to ${vRFv2Consumer.address} and LuckyWInner to ${luckyWinnerV1.address}`
  );
  // console.log(
  //   `Lock with ${ethers.utils.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
