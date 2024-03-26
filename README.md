
## Quick start

Node.js v20.6.0 and above

After running the following command, we can see that the memory usage of the node process continues to rise until it finally reports an error.

```console
$ npm i
$ npm start

> repro-resvg-wasm-memory-leak@1.0.0 start
> node --import tsx/esm --expose-gc main.tsx

       i,         rss,   heapTotal,    heapUsed,    external,arrayBuffers
       0,   137527296,    22085632,    12088672,    29316871,        8416
     100,   463880192,    48037888,    12231784,   334307538,        8416
     200,   766492672,    48300032,    12294616,   639193550,        8416
     300,  1067139072,    48300032,    12399368,   941052366,        8416
     400,  1374306304,    48300032,    12451968,  1245991374,        8416
     500,  1679278080,    48300032,    12478016,  1547850190,        8416
     600,  1982808064,    48824320,    12514472,  1849709006,        8416
     700,  2286387200,    48562176,    12590176,  2154648014,        8416
     800,  2577711104,    18415616,    12475360,  2459914702,        8416
     900,  2880126976,    18415616,    12489104,  2761773518,        8416
    1000,  3182706688,    18415616,    12502448,  3063632334,        8416
    1100,  3485204480,    18415616,    12547632,  3365491150,        8416
node:internal/encoding:449
        return decodeUTF8(input, this[kIgnoreBOM], this[kFatal]);
               ^

TypeError: The encoded data was not valid for encoding utf-8
```
