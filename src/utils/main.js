


const playItem = (item) => {
    return getUris(item.tracks.items)
}


const getUris = (arr) => {
    let uris = arr.map(item => item.track.uri);
    return uris
}

export {
    playItem
}