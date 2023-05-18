//SPDX-License-Identifier:MIT

pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/inteerfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./WinningNumbers.sol";
import "./EthPrice.sol";

contract LuckyWinnerV1 is AggregatorV3Interface {
    uint public totalRound = 1; /////////////////////////TOTALROUNDS///////////////////////
    address payable[] public players; ////////////////////////PLAYERS////////////////////////////

    uint public prizePool; //////////////////////////PRIZE POOL//////////////////////////
    mapping(uint => address) public roundToWinner; //ROUNDWINNERS////////////////////////

    uint public stake = 0.01 ether; ///////////////////////Lottery Stake////////////////////////

    //////////CONTRACT INSTANCE/////////////
    WinningNumbers immutable winningNumbers;
    AggregatorV3Interface internal priceFeed;

    constructor(address _winningNumbers) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function play() public payable {
        require(players.length < 10, "Max Players");
        require(msg.value >= stake, "Low Stake");
        prizePool += msg.value;
        players.push(msg.sender);
    }

    function getRoundBalance() public view returns (uint) {
        return prizePool;
    }

    function getWinner() public view onlyOwner returns (address) {
        require(players.length >= 3, "Minimum of Three players Required");
        uint256 randomNumbers = winningNumbers.requestRandomWords();
        uint winningIndex = randomNumbers % players.length;
        address winner = players[winningIndex];
        roundToWinner[totalRound];
        return winner;
    }

    function payWinner() external onlyOwner {
        (bool success, ) = roundToWinner[totalRound].call({value: prizePool})(
            ""
        );
        require(success, "Transfer Failed");
        players = new address payable[](0); //reset array
        totalRound += 1; //next round
    }

    function getLatestEthPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }
}
