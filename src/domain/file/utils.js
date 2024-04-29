
function getFileVisibility(file) {
    return file.tags.includes('private') ? 'private' : 'public';
}

function getFileEncryptionType(file) {
    return file.tags.includes('aes') ? 'aes' : 'rsa';
}

module.exports = { getFileVisibility, getFileEncryptionType };