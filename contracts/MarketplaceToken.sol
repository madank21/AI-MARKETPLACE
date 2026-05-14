// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MarketplaceToken (NEXUS)
 * @dev ERC20 token for the NexusAI marketplace
 */
contract MarketplaceToken {
    string public name = "NexusAI Token";
    string public symbol = "NEXUS";
    uint8 public decimals = 18;
    uint256 public totalSupply = 100000000 * 10 ** 18; // 100M tokens

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingTimestamp;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Stake(address indexed staker, uint256 amount);
    event Unstake(address indexed staker, uint256 amount);

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;

        emit Transfer(from, to, value);
        return true;
    }

    function stake(uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        stakedAmount[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;

        emit Stake(msg.sender, amount);
        return true;
    }

    function unstake(uint256 amount) public returns (bool) {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked balance");

        stakedAmount[msg.sender] -= amount;
        balanceOf[msg.sender] += amount;

        emit Unstake(msg.sender, amount);
        return true;
    }

    function getStakedAmount(address staker) public view returns (uint256) {
        return stakedAmount[staker];
    }
}
