const { PortalContract } = require('../../domain/contract');
const Portal = require('../../domain/publicPortal');
const File = require('../../domain/file');


function getFilesMetadata(publicLayoutFile) {
    // convert publicLayoutFile to json object
    const publicLayout = JSON.parse(publicLayoutFile);
    const sections = publicLayout.sections;

    let resp = [];
    sections.forEach(section => {
        const files = section.files;
        const sectionFiles = files.forEach(file => {
            if (file.ipfsHash) {
                return file.ipfsHash;
            } else {
                console.log("ipfsHash not found for file in section:", section.id)
            }
        });

        resp = resp.concat(sectionFiles);
    });

    return resp;
}



async function enablePortalHadler(req, res) {
    const { contractAddress } = req;
    const { publicLayoutFileId } = req.body;

    // get public layout file from portal contract
    const portalContract = new PortalContract(contractAddress, req.network);
    const publicLayoutFile = await portalContract.getFile(publicLayoutFileId);

    const filesIpfsHash = getFilesMetadata(publicLayoutFile);
    const allFiles = await File.find(filesIpfsHash);

    const files = allFiles.map(file => {
        return {
            
        }
    });

    try {
        await Portal.updateOrCreate(contractAddress, files);
    }
    catch (err) {
        console.log("Error in updating portal files", err);
        res.status(500).send("Error in updating portal files due to: " + err);
    }

    res.status(200).send("Portal enabled successfully");

    /*
    * FILE sturct
   * { name, ipfsHash, type, gatewayUrl}
   */
}

module.exports = enablePortalHadler;