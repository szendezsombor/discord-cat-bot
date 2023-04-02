const { readdir, readFile } = require('fs').promises;
const { join } = require('path');

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function getCatMeme(): Promise<Buffer> {
    const files: string[] = await readdir(__dirname);
    const imageIndex = randomIntFromInterval(0, (files.length - 1))
    return readFile(join(__dirname, files[imageIndex]))
}

module.exports = { getRandomCatMeme: getCatMeme }
