import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    console.log('data', data)
    console.log('1 : ')
    console.log('2 : ')
}

const countFullyContains = () => {
    
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day4\\input.txt', 'utf8');
        return data.split('\r\n')
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()