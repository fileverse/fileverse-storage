
function getFileVisibility(file) {
    return file.tags.includes('private') ? 'private' : 'public';
}

function getFileEncryptionType(file) {
    const visibility = getFileVisibility(file);
    let encryptionType = 'none';
    if (visibility == 'private') {
        encryptionType = file.tags.includes('aes') ? 'aes' : 'rsa';
    }
    return encryptionType;
}

module.exports = { getFileVisibility, getFileEncryptionType };