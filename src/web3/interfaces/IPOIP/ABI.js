export const IPOIP_ABI = [
    "function uri(uint256 id) public view returns (string memory)",
    "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
    "function eventTokenLimit(uint256 eventId) external view returns (uint256)",
    "function eventTokensMinted(uint256 eventId) external view returns (uint256)",
    "function eventStart(uint256 eventId) public view returns (uint256)",
    "function eventFinish(uint256 eventId) public view returns (uint256)",
    "function mint(uint256 eventId, bytes32 chipId, address to, bytes32 blockHash, bytes calldata signature)",
    "function eventCreator(uint256 eventId) external view returns (address)"
];