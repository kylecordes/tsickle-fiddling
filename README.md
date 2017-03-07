# Tsickle Experimentation: RxJS

Setup:

```
yarn
yarn link tsickle    # if necessary to get the latest
```

You must use yarn instead of NPM because the latter inexplicably does not fetch
the RxJS source as specified in the dependencies.

It is necessary to fetch the source this way, or to use a git submodule (which
is more tedious to work with) because tsickle consumes TypeScript source, not
TypeScript output (which is what normally arrives via NPM).

Build:

```
yarn run build
```

## Goal

I'm trying to figure out whether, and how, tsickle can be used to grab a complex
TypeScript library, and push it into Closure form, for the eventual goal of an
optimal Angular+Closure compile with tiny output.

I picked RxJS to experiment on this, because it is the one big external
dependency of Angular. However, it is possible this is a grave error and that
this experiment would be better conducted with a smaller library.

## Current status

```
rxjs/util/root.js:11: ERROR - The body of a goog.module cannot use throw.
    throw new Error('RxJS could not find any global context (window, self, global)');
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

## Miscellaneous explanation

To get through various apparent limitations in the tools involved, I had to put
the tsconfig for RxJS-tsickling at the root of the project. The makes it
possible to look "downward" into node_modules where I have retrieved the Rx JS
source code and extend the tsconfig from there. For some reason a '../' path did
not work.

To get the right goog.provides() values, I used a separate tsconfig and tsickle
pass for the (microscopic) example application file and the library RxJS. I
think this is also more realistic, as ideally there would be a way to simply
obtain RxJS in Closure ready form so it would not be compiled jointly with the
application anyway.

Closure has a --js-module-root but not a --goog-module-root, this required some
arrangment of files to work around.
