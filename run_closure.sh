#!/bin/bash
set -ex

OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--js_output_file=output.js"

  "--js_module_root=built"

  "built/*.js"

  "--entry_point=built.Box"
  "--dependency_mode=STRICT"
)

closureFlags=$(mktemp)
echo ${OPTS[*]} > $closureFlags
java -jar node_modules/google-closure-compiler/compiler.jar --flagfile $closureFlags

node ./output.js
