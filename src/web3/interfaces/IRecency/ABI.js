/**
 * See <GITHUB_LINK>
 * For IRecency.sol
 */
 export const IRECENCY_ABI = [
    "function isRecentBlockHash(bytes32 blockHash) external view returns (bool)",
    "function blockRecencyWindow() external view returns (uint256)"
];

export const IRECENCY_API_NAMES = [
   "isRecentBlockHash",
   "blockRecencyWindow"
];