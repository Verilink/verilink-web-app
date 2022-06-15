/**
 * See <GITHUB_LINK>
 * For IERC721PhysicalTap2Claim.sol
 */
export const IERC721PHYSICALTAP2CLAIM_ABI = [
    "function unlock(uint256 tokenId) external",
    "function claim(address from, address to, uint256 tokenId, bytes32 blockHash, bytes calldata signature) external",
    "function isUnlocked(uint256 tokenId) external view returns (bool)"
];

export const IERC721PHYSICALTAP2CLAIM_API_NAMES = [
    "unlock",
    "claim",
    "isUnlocked"
];