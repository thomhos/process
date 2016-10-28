# PROCESS

A static site generator built on top of;
* commander
* nunjucks
* stylus
* rollup

It requires a config file to get started;

```js
module.exports = {
    output: './build', // Where all the build output goes
    watch: true, // If it needs to rebuild when something changes
    serve: true, // If the result needs to be served
    production: false, // If you want to use production settings. STILL IN PROGRESS

    // Where we grab the style files from and where to output them
    // TODO: Allow different engines to compile css
    styles: {
        input: "./test/src/styles/*.styl",
        output: "/css"
    },

    // Where we grab the scripts from and out the result.
    // We're using rollup which allows an extra config file.
    // You can add plugins here, but make sure to require them in this file
    scripts: {
        input: "./test/src/scripts/*.js",
        output: "/js",
        config: {
            format: "iife",
            sourceMap: true,
        }
    },

    // Where the html templates live, and their extension
    // The pages and site properties hold all page data and site data
    html: {
        templates: "./test/src/templates",
        extension: ".tpl",

        pages: "./test/data/pages/**/*.json",
        site: "./test/data/site/**/*.json"
    },

    // Copy this stuff.
    // TODO: allow for multiple copy tasks.
    copy: {
        input: "./test/src/assets/**/*",
        output: "/assets"
    }
}
```
