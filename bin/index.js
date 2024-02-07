#!/usr/bin/env node

import { keyword, green, yellow } from 'chalk';
import boxen from 'boxen';
import translate from '@vitalets/google-translate-api';
import { usage as _usage, showHelp } from "yargs";
import { textSync } from 'figlet';

const usage = keyword('violet')("\nUsage: mycli -l <language>  -s <sentence> \n"
+ boxen(green("\n" + "Translates a sentence to specific language" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
const options = _usage(usage)
      .option("l", {alias:"language", describe: "Translate to language", type: "string", demandOption: false })
      .option("s", {alias:"sentence", describe: "Sentence to be translated", type: "string", demandOption: false })
      .help(true)
      .argv;

// console.log(yargs.argv);
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if(argv.language == null && argv.l == null){
    console.log(
        yellow(
          textSync('MyCLI', { horizontalLayout: 'full' })
        )
      );
    showHelp();
    return;
}
if(argv.sentence == null && argv.s == null){
    showHelp();
    return;
}

const language =  argv.l  || argv.language;

const sentence =  argv.s  || argv.sentence;

// console.log( language,sentence);
translate(sentence, {to: language.toLowerCase()}).then(res => {
    console.log("\n" + boxen(green( sentence + "\n\n" + res.text ), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
}).catch(err => {
    console.error(err);
});