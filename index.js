#!/usr/bin/env node

import { createRequire } from 'node:module'
import { Application } from 'ukaz'
import cleanRegexp from 'clean-regexp'

const require = createRequire(import.meta.url)
const { name, version } = require('./package.json')

const app = new Application(`${name} ${version}`)
  .description('Cleans up regular expressions.')
  .helpFlag()
  .validate()
  .arguments('<regular expressions...>')
  .handler(async ({ args }) => {
    if (!args.regularExpressions.present) {
      console.error('Error: No regular expressions supplied to clean up.')
      console.log()
      app.usage()
      return
    }

    const regexWithFlags = /^\/(.+)\/([gimuy]*)$/

    for (const regex of args.regularExpressions.value) {
      try {
        const match = regexWithFlags.exec(regex)
        if (match) {
          console.log(`/${cleanRegexp(match[1], match[2])}/${match[2]}`)
        } else {
          console.log(cleanRegexp(regex))
        }
      } catch (error) {
        console.error(`Error while cleaning up regex ${regex}: ${error.message}`)
      }
    }
  })

app.run(process.argv)
  .catch(error => {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    } else {
      console.error(error)
    }
  })
