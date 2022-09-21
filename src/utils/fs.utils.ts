import fs from 'fs'
import path from 'path'

/**
 * @description Returns absolute path, uses path.join and Location from constants.
 * @param {string} fileName - The name of the file we want to get the absolute path to.
 * @returns {string} Absolute filepath
 */
export function getAbsolutePath(fileName: string): string {
  return path.join(path.resolve('./'), `/pictures/${fileName}`)
}

/**
 * @description Checks if file exists, uses fs.existsSync and location
 * @param {string} fileLocation - The absolute path of the file.
 * @returns {boolean} If file exists or not.
 */
export function checkIfFileExists(fileLocation: string): boolean {
  return fs.existsSync(fileLocation)
}
