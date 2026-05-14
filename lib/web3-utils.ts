// Smart contract addresses and ABIs
import { Contract } from 'ethers'

export const CONTRACT_ADDRESSES = {
  AIModelRegistry: process.env.NEXT_PUBLIC_AI_MODEL_REGISTRY_ADDRESS || '',
  PaymentManager: process.env.NEXT_PUBLIC_PAYMENT_MANAGER_ADDRESS || '',
  ReputationSystem: process.env.NEXT_PUBLIC_REPUTATION_SYSTEM_ADDRESS || '',
  MarketplaceToken: process.env.NEXT_PUBLIC_MARKETPLACE_TOKEN_ADDRESS || '',
}

// Mock ABIs - replace with actual contract ABIs
export const AI_MODEL_REGISTRY_ABI = [
  'function createModel(string memory name, string memory ipfsHash, uint256 price)',
  'function getModel(uint256 modelId)',
  'function listModels() returns (uint256[])',
  'event ModelCreated(uint256 indexed modelId, address indexed creator)',
]

export const PAYMENT_MANAGER_ABI = [
  'function purchaseModel(uint256 modelId) payable',
  'function withdrawEarnings() payable',
  'function getBalance(address user) returns (uint256)',
  'event PurchaseCompleted(uint256 indexed modelId, address indexed buyer)',
]

export const REPUTATION_SYSTEM_ABI = [
  'function addReview(uint256 modelId, uint8 rating, string memory review)',
  'function getScore(address user) returns (uint256)',
  'event ReviewAdded(uint256 indexed modelId, address indexed reviewer)',
]

export const MARKETPLACE_TOKEN_ABI = [
  'function balanceOf(address account) returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function stake(uint256 amount, uint256 duration) returns (bool)',
]

// Web3 utility functions
export async function getContractInstance(
  contractAddress: string,
  abi: string[],
  signer: any
): Promise<Contract> {
  return new Contract(contractAddress, abi, signer)
}

export async function estimateGas(tx: any): Promise<string> {
  try {
    const gasLimit = await tx.estimateGas()
    return gasLimit.toString()
  } catch (error) {
    console.error('Gas estimation failed:', error)
    return '0'
  }
}

export function formatTxHash(hash: string): string {
  return hash.substring(0, 6) + '...' + hash.substring(hash.length - 4)
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export async function waitForTransaction(hash: string, provider: any): Promise<any> {
  const receipt = await provider.waitForTransaction(hash)
  return receipt
}
