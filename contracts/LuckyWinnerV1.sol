//SPDX-License-Identifier:MIT

pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./WinningNumbers.sol";
import "./EthPrice.sol";

contract LuckyWinnerV1 {
    address public owner;
    uint public totalRound = 1; /////////////////////////TOTALROUNDS///////////////////////
    uint public totalEthPaidOut;
    address payable[] public players; ////////////////////////PLAYERS////////////////////////////

    uint public prizePool; //////////////////////////PRIZE POOL//////////////////////////
    mapping(uint => address) public roundToWinner; //ROUNDWINNERS////////////////////////

    uint public stake = 0.01 ether; ///////////////////////Lottery Stake////////////////////////
    mapping(uint => mapping(address => bool)) public playedInRound;

    //////////CONTRACT INSTANCE/////////////
    VRFv2Consumer immutable winningNumbers;
    AggregatorV3Interface internal priceFeed;

    constructor(address _winningNumbers) {
        owner = msg.sender;
        winningNumbers = VRFv2Consumer(_winningNumbers);
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
        require(msg.value == stake, "Incorrect Stake");
        require(!playedInRound[totalRound][msg.sender], "Not Allowed");
        prizePool += msg.value;
        players.push(payable(msg.sender));
    }

    function getRoundBalance() public view returns (uint) {
        return prizePool;
    }

    function getWinner() public returns (address) {
        require(players.length >= 3, "Minimum of Three players Required");
        uint256 randomNumbers = winningNumbers.requestRandomWords();
        uint winningIndex = randomNumbers % players.length;
        address winner = players[winningIndex];
        roundToWinner[totalRound] = winner;
        return winner;
    }

    function payWinner() external {
        require(players.length >= 3, "Minimum of Three players Required");
        uint prize = stake * players.length;
        address winner = roundToWinner[totalRound];
        require(winner != address(0), "Unauthorized Address(0) Transfer");
        prizePool -= prize;
        totalEthPaidOut += prize;
        (bool success, ) = winner.call{value: prize}("");
        require(success, "Transfer Failed");
        players = new address payable[](0); //reset array
        totalRound += 1; //next round
    }

    function getLatestEthPrice() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function getPlayersLength() public view returns (uint) {
        return players.length;
    }
}
