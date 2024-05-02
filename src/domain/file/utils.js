
function getFileVisibility(file) {
    return file.tags.includes('private') ? 'private' : 'public';
}

module.exports = { getFileVisibility };