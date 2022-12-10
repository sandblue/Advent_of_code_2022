import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    const directory = createDirectory(data)
    console.log(data)
    console.log('1 :', findSumDirectorySizeLessThanN(directory, 100000))
    const targetFreeSpace = 30000000 - (70000000 - directory.size)
    console.log('2 :', findDirSizeThatNeedToBeDelete(directory, targetFreeSpace))
}

interface directory {
    name: string
    size: number
    prevDirectory: directory | undefined
    directoryList: directory[]
    fileList: file[]
}

interface file {
    size: number
    name: string
}

const findDirSizeThatNeedToBeDelete = (currentDir: directory, targetFreeSpace: number) => {
    let result = currentDir.size
    if (currentDir.size < targetFreeSpace) return result
    for (let dir of currentDir.directoryList) {
        const subDirSize = findDirSizeThatNeedToBeDelete(dir, targetFreeSpace)
        if (result > subDirSize && subDirSize > targetFreeSpace) result = subDirSize
    }
    return result
}

const findSumDirectorySizeLessThanN = (currentDir: directory, n: number) => {
    let result = 0
    if (currentDir.size < n) result += currentDir.size
    currentDir.directoryList.forEach((dir) => {
        result += findSumDirectorySizeLessThanN(dir, n)
    })
    return result
}

const createDirectory = (data: string[][]) => {
    const root = {
        name: '/',
        prevDirectory: undefined,
        directoryList: [],
        fileList: [],
        size: 0
    } as directory
    let currentDir: directory = root
    data.forEach((c) => {
        const prefixCommand = c[0]
        switch (prefixCommand) {
            case '$':
                if (c[1] == 'cd') {
                    if (c[2] == '/') return currentDir = root
                    if (c[2] == '..') return currentDir = currentDir.prevDirectory ?? {} as directory
                    currentDir = currentDir.directoryList.find((d) => {
                        return d.name == c[2]
                    }) ?? {} as directory
                }
                break
            case 'dir':
                const newDir = {
                    name: c[1],
                    prevDirectory: currentDir,
                    directoryList: [],
                    fileList: [],
                    size: 0
                } as directory
                currentDir.directoryList.push(newDir)
                break
            default:
                const byte = parseInt(c[0])
                const newFile = {
                    name: c[1],
                    size: byte
                } as file
                currentDir.fileList.push(newFile)
                updateByte(byte, currentDir)
                break
        }
    })
    return root
}

const updateByte = (byte: number, directory: directory) => {
    let currentDir = directory
    currentDir.size += byte
    while (currentDir.prevDirectory != undefined) {
        currentDir = currentDir.prevDirectory
        currentDir.size += byte
    }
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day7\\input.txt', 'utf8');
        return data.split('\r\n').map((c) => { return c.split(" ") })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()