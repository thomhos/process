#!/usr/bin/env node

/**
 *  Module dependencies.
 */
var program     = require('commander')
var fs          = require('fs')
var glob        = require('glob-all')
var rimraf      = require('rimraf')
var path        = require('path')

/**
 *  Task dependencies
 */
var styles      = require('./tasks/styles')
var scripts     = require('./tasks/scripts')
var html        = require('./tasks/html')
var copy        = require('./tasks/copy')
var serve       = require('./tasks/serve')

/**
 *  Define the interface
 */
program
  .version('0.0.1')
  .option('-c, --config [config]', 'Path to config file to use')
  .parse(process.argv)

/**
 *  Define program variables
 */
var configPath  = program.config

/**
 *  Get the config file
 */
var config      = require(path.resolve(configPath));
var opts        = { watch: config.watch, prod: config.production }

/**
 *  Set globals
 */
global.verbose  = config.verbose
global.output   = config.output

/**
 *  Clean old build
 */
rimraf(global.output, function(err) {
    if(err) console.error(err)

    startBuild();
})

/**
 *  Check each property and build it
 */
function startBuild() {
    if(config.html)     html(config.html, opts)
    if(config.styles)   styles(config.styles, opts)
    if(config.scripts)  scripts(config.scripts, opts)
    if(config.copy)     copy(config.copy, opts)
}

if(config.serve)        serve(global.output)
