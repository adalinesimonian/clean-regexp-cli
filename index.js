#!/usr/bin/env node

const ukaz = require('ukaz')
const cleanRegexp = require('clean-regexp')
const pkg = require('./package.json')

const app = new ukaz.Application(`${pkg.name} ${pkg.version}`)
  .description('Cleans up regular expressions.')
  .helpFlag()
  .validate()
  .arguments('<regular expressions...>')
  .handler(async ({args}) => {
    if (!args.regularExpressions.present) {
      console.error('Error: No regular expressions supplied to clean up.')
      console.log()
      app.usage()
      return
    }

    const regexWithFlags = /^\/(.+)\/([gimuy]*)$/

    args.regularExpressions.value.forEach(regex => {
      try {
        const match = regexWithFlags.exec(regex)
        if (match) {
          console.log(`/${cleanRegexp(match[1], match[2])}/${match[2]}`)
        } else {
          console.log(cleanRegexp(regex))
        }
      } catch (err) {
        console.error(`Error while cleaning up regex ${regex}: ${err.message}`)
      }
    })
  })

app.run(process.argv)
  .catch(err => {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`)
    } else {
      console.error(err)
    }
  })
