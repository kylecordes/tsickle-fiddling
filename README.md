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

The current state is that it appears there are only three problems in all of Our
extraneous that prevents a clean tsickle and Closure compile.

### 1) Closure "The body of a goog.module cannot use throw."

Details of the warning:

```
rxjs/util/root.js:11: ERROR - The body of a goog.module cannot use throw.
    throw new Error('RxJS could not find any global context (window, self, global)');
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

This repo has a workaround for this problem. It simply comments out the line of
code. That won't matter unless someone somehow finds a way to run the code in an
environment lacking any of those globals.

Proposed solution: rather than wait for the Closure team to possibly relieve
this limitation, simply put an IIFE around it upstream in RX JS.

### 2) Dependency problem with Observable.empty()

Consuming application code must do: `import 'rxjs/add/observable/empty';` to
make .empty() available so Notification can be compiled by Closure. I believe
this indicates some difficulty in how dependencies are translated from
TypeScript to Closure - but it is surprising that this is the only symptom of
such a problem. Hopefully this means it is a minor problem.

I don't have a proposed solution for this one yet. I don't know if this problem
will grow as more of RxJS is used in a consuming application, or whether it is
just this one glitch that could be worked around easily. This one needs ideas
from someone deeply familiar with tsickle.

### 3) Array access TypeScript construct

The following construct appears in the TypeScript code:

```
export class Subscriber<T> extends Subscription implements Observer<T> {
  [$$rxSubscriber]() { return this; }
```

Tsickle passes the important bit through essentially unchanged, Closure warns about it:

```
rxjs/Subscriber.js:60: WARNING - Cannot do '[]' access on a struct
    [rxSubscriber_1.$$rxSubscriber]() { return this; }
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

This one is an open question: Is this a mismatch of the type systems? A missing
feature in tsickle?

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
