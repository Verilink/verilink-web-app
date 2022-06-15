/**
 * See <https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/IERC721Metadata.sol>
 * for IERC721Metadata.sol
 */
export const IERC721METADATA_ABI = [
    "function name() external view returns (string memory)",
    "function symbol() external view returns (string memory)",
    "function tokenURI(uint256 tokenId) external view returns (string memory)"
];

export const IERC721METADATA_API_NAMES = [
    "name",
    "symbol",
    "tokenURI"
];