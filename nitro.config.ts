// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2024-12-19',
  experimental: {
    database: true,
  },
  devStorage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },
})
