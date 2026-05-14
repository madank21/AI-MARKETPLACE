// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PaymentManager
 * @dev Manages payments and subscriptions for AI models
 */
contract PaymentManager {
    struct Payment {
        uint256 id;
        address buyer;
        uint256 modelId;
        uint256 amount;
        uint256 timestamp;
        bool completed;
    }

    mapping(uint256 => Payment) public payments;
    mapping(address => uint256) public earnings;
    mapping(address => mapping(uint256 => bool)) public hasAccess;
    
    uint256 public nextPaymentId = 1;
    uint256 public platformFeePercentage = 10; // 10% platform fee
    
    address public owner;

    event PaymentInitiated(uint256 indexed paymentId, address indexed buyer, uint256 modelId);
    event PaymentCompleted(uint256 indexed paymentId, address indexed buyer);
    event EarningsWithdrawn(address indexed creator, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function initiatePayment(
        address _buyer,
        uint256 _modelId,
        uint256 _amount
    ) public returns (uint256) {
        uint256 paymentId = nextPaymentId++;
        
        payments[paymentId] = Payment({
            id: paymentId,
            buyer: _buyer,
            modelId: _modelId,
            amount: _amount,
            timestamp: block.timestamp,
            completed: false
        });
        
        emit PaymentInitiated(paymentId, _buyer, _modelId);
        return paymentId;
    }

    function completePayment(uint256 _paymentId, address _creator) public payable onlyOwner {
        require(payments[_paymentId].amount == msg.value, "Incorrect amount");
        require(!payments[_paymentId].completed, "Payment already completed");
        
        Payment storage payment = payments[_paymentId];
        payment.completed = true;
        
        uint256 platformFee = (msg.value * platformFeePercentage) / 100;
        uint256 creatorEarnings = msg.value - platformFee;
        
        earnings[_creator] += creatorEarnings;
        earnings[owner] += platformFee;
        
        hasAccess[payment.buyer][payment.modelId] = true;
        
        emit PaymentCompleted(_paymentId, payment.buyer);
    }

    function withdrawEarnings() public {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");
        
        earnings[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit EarningsWithdrawn(msg.sender, amount);
    }

    function getEarnings(address _creator) public view returns (uint256) {
        return earnings[_creator];
    }

    function hasModelAccess(address _user, uint256 _modelId) public view returns (bool) {
        return hasAccess[_user][_modelId];
    }

    receive() external payable {}
}
