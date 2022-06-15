/**
 * See <GITHUB_LINK>
 * For ERC721Physical.sol
 */
export const IERC721PHYSICAL_ABI = [
    "function chipId(uint256 tokenId) external view returns (bytes32)",
    "function isPhysical(uint256 tokenId) external view returns (bool)",
    "function isValidChipSignature(uint256 tokenId, bytes32 hash, bytes calldata signature) external view returns (bool)"
];

export const IERC721PHYSICAL_API_NAMES = [
    "chipId",
    "isPhysical",
    "isValidChipSignature"
];