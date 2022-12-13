import ky from 'ky-universal'
import type { KyInstance } from 'ky/distribution/types/ky'

export const kyClient: KyInstance = ky
  .create({
    prefixUrl: 'http://localhost:3000/api',
  })
  .extend({
    timeout: 10000,
  })