const read = fileName => {
    return require(`.//../data/${fileName}`)
}

const FileReader = {
    read
}

export default FileReader