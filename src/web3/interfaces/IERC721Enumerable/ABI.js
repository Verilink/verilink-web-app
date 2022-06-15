/**
 * See <https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/IERC721Enumerable.sol>
 * for IERC721Enumerable.sol
 */
export const IERC721ENUMERABLE_ABI = [
    "function totalSupply() external view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
    "function tokenByIndex(uint256 index) external view returns (uint256)"
];

export const IERC721ENUMERABLE_API_NAMES = [
    "totalSupply",
    "tokenOfOwnerByIndex",
    "tokenByIndex"
];