import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default function createDb(config) {
  config.driver = sqlite3.Database
  return open(config)
}
