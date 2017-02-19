#!/usr/bin/env node

'use strict'

const {which, exec, echo, exit, mv, cd} = require('shelljs')
const newProjectName = process.argv[2]
const repo = 'https://github.com/tiaanduplessis/bolt-starter.git'

const installDeps = () => which('yarn') ? exec('yarn') : exec('npm i')

if (!which('git')) {
  echo('Sorry, this script requires git')
  exit(1)
}

exec(`git clone ${repo}`, (code, stdout, stderr) => {
  if (code !== 0) {
    console.error(stderr)
    exit(1)
  }

  if (newProjectName) {
    mv('./bolt-starter', `./${newProjectName}`)
    cd(`${newProjectName}/`)
    exec(`node ${__dirname}/node_modules/react-native-rename/lib/index.js ${newProjectName}`, (code, stdout, stderr) => {
      if (code !== 0) {
        console.error(stderr)
        exit(1)
      }

      installDeps()
    })
  } else {
    cd('bolt-starter/')
    installDeps()
  }
})
