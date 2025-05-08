import { existsSync, mkdirSync } from 'node:fs'

export function createFolder(path) {
  if (!existsSync(path)) {
    mkdirSync(path)
  }
}
