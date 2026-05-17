// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AIModelRegistry
 * @dev Registry for AI models on the marketplace.
 */
contract AIModelRegistry {
    struct AIModel {
        uint256 id;
        address creator;
        string name;
        string ipfsHash;
        uint256 price;
        uint256 downloads;
        uint256 rating;
        uint256 createdAt;
        bool isActive;
    }

    uint256 public nextModelId = 1;
    address public owner;

    mapping(uint256 => AIModel) public models;
    mapping(address => uint256[]) public creatorModels;

    event ModelCreated(
        uint256 indexed modelId,
        address indexed creator,
        string name,
        uint256 price
    );
    event ModelUpdated(uint256 indexed modelId);
    event ModelDeactivated(uint256 indexed modelId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createModel(
        string memory _name,
        string memory _ipfsHash,
        uint256 _price
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");

        uint256 modelId = nextModelId++;

        models[modelId] = AIModel({
            id: modelId,
            creator: msg.sender,
            name: _name,
            ipfsHash: _ipfsHash,
            price: _price,
            downloads: 0,
            rating: 0,
            createdAt: block.timestamp,
            isActive: true
        });

        creatorModels[msg.sender].push(modelId);

        emit ModelCreated(modelId, msg.sender, _name, _price);
        return modelId;
    }

    function getModel(uint256 _modelId) public view returns (AIModel memory) {
        require(_modelId < nextModelId, "Model does not exist");
        return models[_modelId];
    }

    function getCreatorModels(address _creator) public view returns (uint256[] memory) {
        return creatorModels[_creator];
    }

    function deactivateModel(uint256 _modelId) public {
        require(models[_modelId].creator == msg.sender || msg.sender == owner, "Not authorized");
        models[_modelId].isActive = false;
        emit ModelDeactivated(_modelId);
    }

    function getTotalModels() public view returns (uint256) {
        return nextModelId - 1;
    }
}

