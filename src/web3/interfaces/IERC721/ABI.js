/**
 * See <https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol>
 * for IERC721.sol
 */
export const IERC721_ABI = [
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function ownerOf(uint256 tokenId) external view returns (address owner)",
    "function safeTransferFrom(\
        address from,\
        address to,\
        uint256 tokenId,\
        bytes calldata data\
    ) external",
    "function safeTransferFrom(\
        address from,\
        address to,\
        uint256 tokenId\
    ) external",
    "function transferFrom(\
        address from,\
        address to,\
        uint256 tokenId\
    ) external",
    "function approve(address to, uint256 tokenId) external",
    "function setApprovalForAll(address operator, bool _approved) external",
    "function getApproved(uint256 tokenId) external view returns (address operator)",
    "function isApprovedForAll(address owner, address operator) external view returns (bool)"
];

export const IERC721_API_NAMES = [
    "balanceOf",
    "ownerOf",
    "safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)",
    "safeTransferFrom(address from, address to, uint256 tokenId)",
    "transferFrom",
    "approve",
    "setApprovalForAll",
    "getApproved",
    "isApprovedForAll"
];