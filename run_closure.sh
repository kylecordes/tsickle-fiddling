#!/bin/bash
set -ex

OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--js_output_file=output.js"

  # More warnings - but you only see one before exiting as an error.
  # Appears to add more warnings, rather than make the same warnigs
  # more verbose.
  # "--warning_level=VERBOSE"

  $(find rxjs -name *.js)
  $(find built -name *.js)

  "--entry_point=built.main"
  "--dependency_mode=STRICT"
)

closureFlags=$(mktemp)
echo ${OPTS[*]} > $closureFlags
java -jar node_modules/google-closure-compiler/compiler.jar --flagfile $closureFlags
