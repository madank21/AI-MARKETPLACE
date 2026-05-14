// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ReputationSystem
 * @dev Manages reputation and reviews for creators and models
 */
contract ReputationSystem {
    struct Review {
        uint256 id;
        address reviewer;
        uint256 modelId;
        uint8 rating; // 1-5
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Review) public reviews;
    mapping(uint256 => uint256[]) public modelReviews; // modelId => reviewIds
    mapping(address => uint256) public reputationScore;
    mapping(address => uint256) public totalReviews;
    
    uint256 public nextReviewId = 1;
    address public owner;

    event ReviewAdded(
        uint256 indexed reviewId,
        uint256 indexed modelId,
        address indexed reviewer,
        uint8 rating
    );
    
    event ReputationUpdated(address indexed creator, uint256 newScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addReview(
        uint256 _modelId,
        address _creator,
        uint8 _rating,
        string memory _content
    ) public returns (uint256) {
        require(_rating >= 1 && _rating <= 5, "Rating must be 1-5");
        require(bytes(_content).length > 0, "Content required");
        
        uint256 reviewId = nextReviewId++;
        
        reviews[reviewId] = Review({
            id: reviewId,
            reviewer: msg.sender,
            modelId: _modelId,
            rating: _rating,
            content: _content,
            timestamp: block.timestamp
        });
        
        modelReviews[_modelId].push(reviewId);
        totalReviews[_creator]++;
        
        updateReputationScore(_creator);
        
        emit ReviewAdded(reviewId, _modelId, msg.sender, _rating);
        return reviewId;
    }

    function updateReputationScore(address _creator) internal {
        // Score calculation based on reviews
        // This is a simplified version - can be made more complex
        reputationScore[_creator] = totalReviews[_creator] * 10;
        
        emit ReputationUpdated(_creator, reputationScore[_creator]);
    }

    function getModelReviews(uint256 _modelId) public view returns (uint256[] memory) {
        return modelReviews[_modelId];
    }

    function getReview(uint256 _reviewId) public view returns (Review memory) {
        return reviews[_reviewId];
    }

    function getReputationScore(address _creator) public view returns (uint256) {
        return reputationScore[_creator];
    }

    function getTotalReviews(address _creator) public view returns (uint256) {
        return totalReviews[_creator];
    }
}
