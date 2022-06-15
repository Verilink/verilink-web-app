import { ethers } from "ethers";

/**
 * @description generates the EIP-165 interface id given the abi, apiNames
 * @param {*} abi the abi in any ethers-friendly format
 * @param {*} apiNames a list of function names in the interface
 * @returns interface id for the abi
 */
export const getInterfaceId = (abi, apiNames) => 
{
    let bytes = ethers.utils.arrayify("0x00000000");
    let tmp;
    let iface = new ethers.utils.Interface(abi);

    for(let i = 0; i < apiNames.length; i++)
    {
        tmp = ethers.utils.arrayify(
            iface.getSighash(apiNames[i]));
        for(let j = 0; j < bytes.length; j++)
        {
            bytes[j] = bytes[j] ^ tmp[j];
        }
    }

    /* ifaceId */
    return bytes;
}

/**
 * merges the interface ids into a combined interface id
 * @param {*} interfaceIds 
 * @returns the merged interface id
 */
export const mergeInterfaceIds = (interfaceIds) =>
{
    let bytes = ethers.utils.arrayify("0x00000000");
    let tmp;

    if(interfaceIds.length == 0) return bytes;

    for(let j = 0; j < bytes.length; j++)
    {
        bytes[j] = interfaceIds[0][j];
    }


    for(let i = 1; i < interfaceIds.length; i++)
    {
        for(let j = 0; j < bytes.length; j++)
        {
            bytes[j] = bytes[j] ^ interfaceIds[i][j];
        }
    }

    /* ifaceId */
    return bytes;
}
