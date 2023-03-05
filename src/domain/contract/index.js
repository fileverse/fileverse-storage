const abi = require('./abi.json');
const { ethers } = require("ethers");
const provider = require('./provider');

class PortalContract {
    constructor(contractAddress, network) {
        this.contractAddress = contractAddress;
        this.contractABI = abi;
        this.networkProviderUrl = provider.getNetworkUrl(network);
        this.networkProvider = new ethers.providers.JsonRpcProvider(this.networkProviderUrl);
        this.contractInstance = new ethers.Contract(this.contractAddress, this.contractABI, this.networkProvider);
    }

    async getFileCount() {
        const fileCount = await this.contractInstance.getFileCount();
        return fileCount;
    }

    async getFile(fileId) {
        const file = await this.contractInstance.files(fileId);
        return file;
    }

    async getCollaboratorList() {
        const collaboratorList = await this.contractInstance.getCollaborators();
        return collaboratorList;
    }

    async getCollaboratorCount() {
        const collaboratorCount = await this.contractInstance.getCollaboratorCount();
        return collaboratorCount;
    }

    async isCollaborator(address) {
        const isCollaborator = await this.contractInstance.isCollaborator(address);
        return isCollaborator;
    }

    async isMember(address) {
        const memberDetail = await this.contractInstance.members(address);
        return memberDetail;
    }

    async getCollaboratorKeys(address) {
        const keyDetail = await this.contractInstance.collaboratorKeys(address);
        return { account: address, viewDid: keyDetail[0], editDid: keyDetail[1] };
    }

    async isOwner(address) {
        const owner = await this.contractInstance.owner();
        return address.toLowerCase() === owner.toLowerCase();
    }

    static networkFromChainId(chainId) {
        if (!chainId) {
            return 'eth_goerli';
        }
        const chainIdInNumber = Number(chainId);
        if (chainIdInNumber === 5) {
            return 'eth_goerli';
        }
        if (chainIdInNumber === 11155111) {
            return 'eth_sepolia';
        }
        if (chainIdInNumber === 8420) {
            return 'fileverse_testnet';
        }
        if (chainIdInNumber === 1) {
            return 'eth_mainnet';
        }
        if (chainIdInNumber === 137) {
            return 'polygon_mainnet';
        }
        if (chainIdInNumber === 100) {
            return 'gnosis_mainnet';
        }
        if (chainIdInNumber === 10200) {
            return 'gnosis_testnet';
        }
        return 'eth_goerli';
    }
};

module.exports = PortalContract;
