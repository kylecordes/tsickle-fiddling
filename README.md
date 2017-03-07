# Tsickle Experimentation and error reproductions

This builds cleanly:

```
yarn
yarn run build_with_tsc
```

This fails in tsickle with "INTERNAL COMPILER ERROR"

```
yarn
yarn run build_with_tsickle
```


```
+ echo --language_in=ES6_STRICT --language_out=ES5 --js_output_file=output.js tsickle-output/Apple.js tsickle-output/Box.js
+ java -jar node_modules/google-closure-compiler/compiler.jar --flagfile /var/folders/kt/x4j8gs0j0qs4lghpfq558g8w0000gn/T/tmp.8gaQmbmi
WARNING - File has both goog.module and ES6 modules: tsickle-output/Box.js

0 error(s), 1 warning(s)
java.lang.RuntimeException: java.lang.RuntimeException: INTERNAL COMPILER ERROR.
Please report this problem.
```

