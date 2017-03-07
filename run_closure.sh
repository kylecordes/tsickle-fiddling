#!/bin/bash
set -ex

OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--js_output_file=output.js"

  # "--js_module_root=tsickle-output"

  "tsickle-output/*.js"
)

closureFlags=$(mktemp)
echo ${OPTS[*]} > $closureFlags
java -jar node_modules/google-closure-compiler/compiler.jar --flagfile $closureFlags

node ./output.js
