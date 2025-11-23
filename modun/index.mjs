/**
 * AFPK Modules
 * 
 * Re-export từ af-common-min và các module BE-only
 * 
 * Lưu ý:
 * - Queue, Wait được re-export từ af-common-min (đã bundle trong afpk-min)
 * - CronJob, Interact là các module BE-only
 * - Các file Wait.mjs, Queue.mjs, EOn.mjs trong thư mục này đã deprecated
 */

// Re-export từ af-common-min (từ module namespace)
import afCommonMin from 'af-common-min'
const { Queue, Wait } = afCommonMin.module

// Import các module BE-only
import CronJob from './CronJob.mjs'
import Interact from './Interact.mjs'

export default {
  Queue,
  Wait,
  CronJob,
  Interact,
}