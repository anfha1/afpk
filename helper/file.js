import { existsSync, mkdirSync } from 'fs'

/**
 * Create folder recursively if it doesn't exist
 * @param {string} folderPath - Path to folder
 * @param {object} options - Options for mkdirSync (default: { recursive: true })
 */
export function createFolder(folderPath, options = { recursive: true }) {
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, options)
  }
}

