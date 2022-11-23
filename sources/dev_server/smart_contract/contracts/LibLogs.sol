//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibLogs
{
    function logEvent(string calldata eventName, uint256[] calldata eventData) public
    {
        
    bytes32 _id = stringToBytes32(eventName);

        for (uint256 i = 0; i < eventData.length; i++) {

        bytes32 param = bytes32(eventData[i]);

            assembly {
                let p := add(msize(), 0x20)
                mstore(p, param)
                log1(p, 0x20, _id)
            }
        }

    }

    function logEvent(string calldata eventName, uint256 eventData) public
    {
        
    bytes32 _id = stringToBytes32(eventName);
    bytes32 param = bytes32(eventData);
        assembly {
            let p := add(msize(), 0x20)
            mstore(p, param)
            log1(p, 0x20, _id)
        }
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
    