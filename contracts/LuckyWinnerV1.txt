//SPDX-License-Identifier:MIT

pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/inteerfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./WinningNumbers.sol";
import "./EthPrice.sol";


contract LuckyWinnerV1 is AggregatorV3Interface {

    uint public totalRounds;

    struct Round{
        uint startTime;
        uint endTime;
        uint[] winningNumbers;
        uint totalWinners;
        uint totalWonEther;
        uint totalEtherPaidEther;
    }

    mapping(uint => Round) public roundsToId; //round-Id-RoundDetails

    address public owner;
    mapping(uint => address[]) public roundIdToPlayers; //round-to-playersAddress
    mapping(uint => mapping(address => uint[])) public roundIdToAddressGame; //Number played by each address for a specific round
    mapping (uint => uint[]) public roundIdToWinningNumbers; //round winning numbers
    mapping(uint => mapping(address => uint)) public addressPrizeInRound; //Amount won by each addreess for each round 
    mapping(uint => address) public roundWinner;

    uint public gamingFee; //base gamingFee
    uint public minimunStake = 0.0005 ether; //base min-stake

    WinningNumber immutable winningNumber;
    EthPrice immutable ethPrice;

    constructor(address _winningNumbers, address _ethPrice) payable{
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    //Getting round data to Memory to save gas instead of reding directly fromthe state
    function getRoundData(uint _id) public view 
    returns(
        uint _startTime, 
        uint _endtIime, 
        uint[] memory _winningNumbers, 
        uint _totalWinners, 
        uint _totalWonEther, 
        uint _totalPaidEther
        ) {
        Round memory round = roundsToId[_id];
        _startTime = round.startTime;
        _endtIime = round.endTime;
        _winningNumbers = round.winningNumbers;
        _totalWinners = round.totalWinners;
        _totalWonEther = round.totalWonEther;
        _totalPaidEther = round.totalEtherPaidEther; 

        return (_startTime, _endtIime, _winningNumbers, _totalWinners, _totalWonEther, _totalPaidEther); 
    }

    function startGame() public onlyOwner() {
        latestRound = totalRounds + 1;
        roundsToId[latestRound].startTime = block.timestamp;
        roundIdTo[latestRound].endTime = roundsToId[latestRound].startTime + 3600; //One Hour Game Time
        totalRounds += 1;
    }

    function play(uint[] memory _playingNumbers, uint _stakeAmount) public payable {
        require(_playingNumbers.length >= 2, "Incomple game");
        require(_playingNumbers.length <= 5, "Overfloating game");
        addressToPlayNumberToRound[]
    }
}
