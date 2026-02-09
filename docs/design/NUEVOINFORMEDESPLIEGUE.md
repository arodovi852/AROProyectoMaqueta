==> Downloading cache...
==> It looks like we don't have access to your repo, but we'll try to clone it anyway.
==> Cloning from https://github.com/arodovi852/AROProyectoMaqueta
==> Checking out commit 4ca6938101072e2c4b5960e243eee733196d09c5 in branch dev
==> Downloaded 410MB in 4s. Extraction took 1s.
#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 1.58kB done
#1 DONE 0.1s
#2 [auth] library/nginx:pull render-prod/docker-mirror-repository/library/nginx:pull token for us-west1-docker.pkg.dev
#2 DONE 0.0s
#3 [auth] library/node:pull render-prod/docker-mirror-repository/library/node:pull token for us-west1-docker.pkg.dev
#3 DONE 0.0s
#4 [internal] load metadata for docker.io/library/nginx:alpine
#4 DONE 0.6s
#5 [internal] load metadata for docker.io/library/node:20-alpine
#5 DONE 0.6s
#6 [internal] load .dockerignore
#6 transferring context: 361B done
#6 DONE 0.0s
#7 [internal] load build context
#7 DONE 0.0s
#8 importing cache manifest from local:10930413458838711694
#8 inferred cache manifest type: application/vnd.oci.image.manifest.v1+json done
#8 DONE 0.0s
#9 [builder 1/7] FROM docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c
#9 resolve docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c 0.1s done
#9 DONE 0.1s
#10 [stage-1 1/4] FROM docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 resolve docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 resolve docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55 0.1s done
#10 ...
#7 [internal] load build context
#7 transferring context: 39.42MB 0.9s done
#7 DONE 1.0s
#11 [builder 2/7] WORKDIR /app
#11 CACHED
#12 [builder 3/7] COPY package*.json ./
#12 CACHED
#13 [builder 4/7] RUN npm ci
#13 ...
#10 [stage-1 1/4] FROM docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 DONE 2.4s
#13 [builder 4/7] RUN npm ci
#13 sha256:c2b4197efb6ccd7f8b482ae7800f1c9c78c044ea192587887300080bcff6b2c9 16.78MB / 42.78MB 0.2s
#13 sha256:c2b4197efb6ccd7f8b482ae7800f1c9c78c044ea192587887300080bcff6b2c9 41.63MB / 42.78MB 0.3s
#13 sha256:1074353eec0db2c1d81d5af2671e56e00cf5738486f5762609ea33d606f88612 3.86MB / 3.86MB 0.3s
#13 sha256:c2b4197efb6ccd7f8b482ae7800f1c9c78c044ea192587887300080bcff6b2c9 42.78MB / 42.78MB 2.2s done
#13 sha256:1074353eec0db2c1d81d5af2671e56e00cf5738486f5762609ea33d606f88612 3.86MB / 3.86MB 1.9s done
#13 extracting sha256:1074353eec0db2c1d81d5af2671e56e00cf5738486f5762609ea33d606f88612
#13 extracting sha256:1074353eec0db2c1d81d5af2671e56e00cf5738486f5762609ea33d606f88612 0.1s done
#13 extracting sha256:c2b4197efb6ccd7f8b482ae7800f1c9c78c044ea192587887300080bcff6b2c9
#13 ...
#10 [stage-1 1/4] FROM docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 sha256:e096540205d5d1ab2c2647d716491020d81e3f167a33606665b193d75540857f 20.18MB / 20.18MB 1.1s done
#10 sha256:0abf9e5672665202e79f26f23ef5dbd12558e2ea51ac32807922ab76fdb24ab0 1.40kB / 1.40kB 0.8s done
#10 sha256:085c5e5aaa8eb4b957ecf253c74f16a6a5551231de3fb7c3ac74814a6bf17e06 1.21kB / 1.21kB 0.4s done
#10 sha256:33f95a0f3229b49e777082e801b882b13fcc5b4e389410ce8eb066f4d58c71b9 403B / 403B 0.4s done
#10 sha256:da7c973d8b92a1555060972c8849a332c93bfe2608c11faeee2098c4cfbe8c3d 953B / 953B 0.1s done
#10 sha256:567f84da6fbd4287d40a5837485469435c40a81f9a94e98395b6385d3600643a 626B / 626B 0.1s done
#10 sha256:25f453064fd3e8a9754b6e51b86c637e13203cbfc748fcf73f3c8b2d10816ae3 1.86MB / 1.86MB 0.2s done
#10 extracting sha256:25f453064fd3e8a9754b6e51b86c637e13203cbfc748fcf73f3c8b2d10816ae3
#10 extracting sha256:25f453064fd3e8a9754b6e51b86c637e13203cbfc748fcf73f3c8b2d10816ae3 8.6s done
#10 DONE 13.0s
#13 [builder 4/7] RUN npm ci
#13 ...
#10 [stage-1 1/4] FROM docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 extracting sha256:567f84da6fbd4287d40a5837485469435c40a81f9a94e98395b6385d3600643a
#10 extracting sha256:567f84da6fbd4287d40a5837485469435c40a81f9a94e98395b6385d3600643a 2.4s done
#10 extracting sha256:da7c973d8b92a1555060972c8849a332c93bfe2608c11faeee2098c4cfbe8c3d 0.0s done
#10 extracting sha256:33f95a0f3229b49e777082e801b882b13fcc5b4e389410ce8eb066f4d58c71b9 0.0s done
#10 extracting sha256:085c5e5aaa8eb4b957ecf253c74f16a6a5551231de3fb7c3ac74814a6bf17e06 0.0s done
#10 DONE 15.6s
#13 [builder 4/7] RUN npm ci
#13 extracting sha256:c2b4197efb6ccd7f8b482ae7800f1c9c78c044ea192587887300080bcff6b2c9 11.0s done
#13 sha256:3dcec91425079e7b455efc5f2a18d026450c47c9382c41897620afc6b1424e44 1.26MB / 1.26MB 0.0s done
#13 extracting sha256:3dcec91425079e7b455efc5f2a18d026450c47c9382c41897620afc6b1424e44
#13 extracting sha256:3dcec91425079e7b455efc5f2a18d026450c47c9382c41897620afc6b1424e44 0.1s done
#13 sha256:41b3afaea3b1b1ab04a268431e10dcace7883019a5da7d326aa35dc9713fcbb5 445B / 445B done
#13 extracting sha256:41b3afaea3b1b1ab04a268431e10dcace7883019a5da7d326aa35dc9713fcbb5
#13 extracting sha256:41b3afaea3b1b1ab04a268431e10dcace7883019a5da7d326aa35dc9713fcbb5 0.2s done
#13 sha256:fc9678e8a303f6fc90f9b89a214e6777df117ea6c1e92fec925e3e39ab91b773 92B / 92B done
#13 extracting sha256:fc9678e8a303f6fc90f9b89a214e6777df117ea6c1e92fec925e3e39ab91b773
#13 extracting sha256:fc9678e8a303f6fc90f9b89a214e6777df117ea6c1e92fec925e3e39ab91b773 0.4s done
#13 sha256:8763167bb2687ea0731eb65aa9a7e18295b34f55b121bf30630f4db16b028823 62.24kB / 62.24kB done
#13 extracting sha256:8763167bb2687ea0731eb65aa9a7e18295b34f55b121bf30630f4db16b028823
#13 extracting sha256:8763167bb2687ea0731eb65aa9a7e18295b34f55b121bf30630f4db16b028823 1.4s done
#13 ...
#10 [stage-1 1/4] FROM docker.io/library/nginx:alpine@sha256:b0f7830b6bfaa1258f45d94c240ab668ced1b3651c8a222aefe6683447c7bf55
#10 extracting sha256:0abf9e5672665202e79f26f23ef5dbd12558e2ea51ac32807922ab76fdb24ab0 0.0s done
#10 extracting sha256:e096540205d5d1ab2c2647d716491020d81e3f167a33606665b193d75540857f 2.1s done
#10 DONE 17.8s
#13 [builder 4/7] RUN npm ci
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 26.21MB / 128.84MB 0.2s
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 45.09MB / 128.84MB 0.3s
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 78.64MB / 128.84MB 0.5s
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 105.91MB / 128.84MB 0.6s
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 122.68MB / 128.84MB 0.8s
#13 sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 128.84MB / 128.84MB 1.9s done
#13 extracting sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688
#13 ...
#14 [stage-1 2/4] COPY nginx.conf /etc/nginx/nginx.conf.template
#14 ...
#13 [builder 4/7] RUN npm ci
#13 extracting sha256:69d3b1aef7879365a98646dce257823c656f864b8b8f2ab11c0a899b0db7f688 10.7s done
#13 CACHED
#14 [stage-1 2/4] COPY nginx.conf /etc/nginx/nginx.conf.template
#14 ...
#15 [builder 5/7] COPY . .
#15 ...
#14 [stage-1 2/4] COPY nginx.conf /etc/nginx/nginx.conf.template
#14 DONE 16.5s
#15 [builder 5/7] COPY . .
#15 DONE 14.2s
#16 [builder 6/7] RUN npm run build
#16 0.271 
#16 0.271 > aroproyecto-maqueta@0.0.0 build
#16 0.271 > npm run build:prod
#16 0.271 
#16 0.450 
#16 0.450 > aroproyecto-maqueta@0.0.0 build:prod
#16 0.450 > ng build --configuration production
#16 0.450 
#16 1.358 ❯ Building...
#16 19.27 ✔ Building...
#16 19.28 Initial chunk files | Names           |  Raw size | Estimated transfer size
#16 19.28 chunk-BK6NFEPT.js   | -               | 150.17 kB |                44.12 kB
#16 19.28 chunk-Y56ZLT7Z.js   | -               | 103.67 kB |                26.21 kB
#16 19.28 main-JMVZGTBJ.js    | main            |  73.00 kB |                13.38 kB
#16 19.28 chunk-VITZ4VS5.js   | -               |  55.57 kB |                11.52 kB
#16 19.28 chunk-OZJBHF4F.js   | -               |  40.96 kB |                 5.21 kB
#16 19.28 styles-J5BVYC6R.css | styles          |  30.56 kB |                 5.38 kB
#16 19.28 chunk-F3UPFDCO.js   | -               |  26.03 kB |                 5.47 kB
#16 19.28 chunk-33MNMGSM.js   | -               |  21.07 kB |                 6.18 kB
#16 19.28 chunk-JUAFPKGE.js   | -               |  19.82 kB |                 2.96 kB
#16 19.28 chunk-2JXMNM6S.js   | -               |  11.53 kB |                 2.58 kB
#16 19.28 chunk-UHQZZU23.js   | -               |   7.67 kB |                 1.95 kB
#16 19.28 chunk-TJ3H7KM7.js   | -               |   5.12 kB |                 1.52 kB
#16 19.28 chunk-ZF3MQ3MX.js   | -               |   3.13 kB |               692 bytes
#16 19.28 chunk-LNBBJULI.js   | -               |   1.90 kB |               699 bytes
#16 19.28 chunk-AHYIF2ET.js   | -               |   1.14 kB |               409 bytes
#16 19.28 chunk-6ZWETDC6.js   | -               | 487 bytes |               487 bytes
#16 19.28 
#16 19.28                     | Initial total   | 551.83 kB |               128.76 kB
#16 19.28 
#16 19.28 Lazy chunk files    | Names           |  Raw size | Estimated transfer size
#16 19.28 chunk-W4T3AGL3.js   | home            | 160.50 kB |                25.23 kB
#16 19.28 chunk-KGPG6VGG.js   | demo-components |  58.19 kB |                11.78 kB
#16 19.28 chunk-AKNWIIHL.js   | contacto        |  29.13 kB |                 5.00 kB
#16 19.28 chunk-XDFXOBNZ.js   | -               |  25.51 kB |                 3.98 kB
#16 19.28 chunk-3VTCZAKR.js   | other-profile   |  22.58 kB |                 4.97 kB
#16 19.28 chunk-PUDT56GM.js   | api             |  19.87 kB |                 4.64 kB
#16 19.28 chunk-TGYMXETW.js   | profile         |  17.62 kB |                 4.08 kB
#16 19.28 chunk-XDRWH5C2.js   | list-content    |  17.12 kB |                 4.01 kB
#16 19.28 chunk-W6DTDKWS.js   | roadmap         |  16.49 kB |                 4.05 kB
#16 19.28 chunk-N6EWDSW3.js   | privacy         |  15.58 kB |                 4.35 kB
#16 19.28 chunk-3TTXDUBO.js   | see-more        |  13.56 kB |                 3.60 kB
#16 19.28 chunk-DDFSXJMZ.js   | -               |  13.51 kB |                 3.33 kB
#16 19.28 chunk-AB6YRO4S.js   | news            |  12.40 kB |                 3.26 kB
#16 19.28 chunk-KCGSGTAP.js   | lists           |  11.91 kB |                 2.83 kB
#16 19.28 chunk-BXYZLXFE.js   | -               |  11.72 kB |                 2.60 kB
#16 19.28 ...and 12 more lazy chunks files. Use "--verbose" to show all the files.
#16 19.28 
#16 19.28 Application bundle generation complete. [17.915 seconds] - 2026-01-22T17:19:51.051Z
#16 19.28 
#16 19.28 ▲ [WARNING] NG8113: All imports are unused [plugin angular-compiler]
#16 19.28 
#16 19.28     src/app/pages/contacto/contacto.ts:14:2:
#16 19.28       14 │   imports: [NombreForm],
#16 19.28          ╵   ~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/layout/footer/footer.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/layout/header/header.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/sections/cta/cta.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/sections/features/features.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/sections/hero/hero.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/alert/alert.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/button/button.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/card-list/card-list.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/card/card.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/close-button/close-button.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/form-checkbox/form-checkbox.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/form-input/form-input.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/form-select/form-select.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/form-textarea/form-textarea.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/login-form/login-form.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/nombre-form/nombre-form.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/register-form/register-form.scss:8:8:
#16 19.28       8 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/star/star.scss:1:8:
#16 19.28       1 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/stat-bar/stat-bar.scss:1:8:
#16 19.28       1 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/theme-toggle/theme-toggle.scss:1:8:
#16 19.28       1 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/components/shared/watch-later/watch-later.scss:1:8:
#16 19.28       1 │ @import '../../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/contacto/contacto.scss:1:8:
#16 19.28       1 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/home/home.scss:8:8:
#16 19.28       8 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/list-content/list-content.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/list-info/list-info.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/lists/lists.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/main/main.scss:10:8:
#16 19.28       10 │ @import '../../../styles/01-tools/mixins';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/other-profile/other-profile.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/productos/productos.scss:1:8:
#16 19.28       1 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/profile/profile.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/search-result/search-result.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/app/pages/see-more/see-more.scss:7:8:
#16 19.28       7 │ @import '../../../styles/01-tools/mixins';
#16 19.28         ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/styles.scss:21:8:
#16 19.28       21 │ @import 'styles/00-settings/variables';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28   The plugin "angular-sass" was triggered by this import
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/styles.scss:26:8:
#16 19.28       26 │ @import 'styles/01-tools/mixins';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28   The plugin "angular-sass" was triggered by this import
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/styles.scss:31:8:
#16 19.28       31 │ @import 'styles/02-generic/reset';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28   The plugin "angular-sass" was triggered by this import
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/styles.scss:36:8:
#16 19.28       36 │ @import 'styles/03-elements/base';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28   The plugin "angular-sass" was triggered by this import
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] Deprecation [plugin angular-sass]
#16 19.28 
#16 19.28     src/styles.scss:41:8:
#16 19.28       41 │ @import 'styles/04-objects/layout';
#16 19.28          ╵         ^
#16 19.28 
#16 19.28 
#16 19.28   Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
#16 19.28   
#16 19.28   More info and automated migrator: https://sass-lang.com/d/import
#16 19.28 
#16 19.28   The plugin "angular-sass" was triggered by this import
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] 4 repetitive deprecation warnings omitted.
#16 19.28 Run in verbose mode to see all warnings. [plugin angular-sass]
#16 19.28 
#16 19.28     angular:styles/global:styles:1:8:
#16 19.28       1 │ @import 'src/styles.scss';
#16 19.28         ╵         ~~~~~~~~~~~~~~~~~
#16 19.28 
#16 19.28   null
#16 19.28 
#16 19.28 
#16 19.28 ▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 51.83 kB with a total of 551.83 kB.
#16 19.28 
#16 19.28 
#16 19.28 Output location: /app/dist/AROProyectoMaqueta
#16 19.28 
#16 DONE 19.5s
#17 [builder 7/7] RUN echo "=== Build output structure ===" &&     find /app/dist -type f -name "*.html" &&     ls -la /app/dist/AROProyectoMaqueta/browser/ || true
#17 0.061 === Build output structure ===
#17 0.063 /app/dist/AROProyectoMaqueta/browser/index.html
#17 0.064 total 1436
#17 0.064 drwxr-sr-x    3 root     root          4096 Jan 22 17:19 .
#17 0.064 drwxr-sr-x    3 root     root          4096 Jan 22 17:19 ..
#17 0.064 -rw-r--r--    1 root     root        131204 Jan 22 17:19 Twin_Peaks_TV_Series-892912807-large.jpg
#17 0.064 drwxr-sr-x    4 root     root          4096 Jan 22 17:19 assets
#17 0.064 -rw-r--r--    1 root     root         11527 Jan 22 17:19 chunk-2JXMNM6S.js
#17 0.064 -rw-r--r--    1 root     root         21065 Jan 22 17:19 chunk-33MNMGSM.js
#17 0.064 -rw-r--r--    1 root     root          5732 Jan 22 17:19 chunk-372JYH32.js
#17 0.064 -rw-r--r--    1 root     root         13562 Jan 22 17:19 chunk-3TTXDUBO.js
#17 0.064 -rw-r--r--    1 root     root         22580 Jan 22 17:19 chunk-3VTCZAKR.js
#17 0.064 -rw-r--r--    1 root     root          1924 Jan 22 17:19 chunk-6JUBY6DR.js
#17 0.064 -rw-r--r--    1 root     root           487 Jan 22 17:19 chunk-6ZWETDC6.js
#17 0.064 -rw-r--r--    1 root     root         11361 Jan 22 17:19 chunk-A3HOQPMN.js
#17 0.064 -rw-r--r--    1 root     root         12401 Jan 22 17:19 chunk-AB6YRO4S.js
#17 0.064 -rw-r--r--    1 root     root          1140 Jan 22 17:19 chunk-AHYIF2ET.js
#17 0.064 -rw-r--r--    1 root     root         29132 Jan 22 17:19 chunk-AKNWIIHL.js
#17 0.064 -rw-r--r--    1 root     root        150166 Jan 22 17:19 chunk-BK6NFEPT.js
#17 0.064 -rw-r--r--    1 root     root         11718 Jan 22 17:19 chunk-BXYZLXFE.js
#17 0.064 -rw-r--r--    1 root     root         13507 Jan 22 17:19 chunk-DDFSXJMZ.js
#17 0.064 -rw-r--r--    1 root     root         26032 Jan 22 17:19 chunk-F3UPFDCO.js
#17 0.064 -rw-r--r--    1 root     root         11326 Jan 22 17:19 chunk-HY5F77EV.js
#17 0.064 -rw-r--r--    1 root     root          7324 Jan 22 17:19 chunk-IGBTSGR2.js
#17 0.064 -rw-r--r--    1 root     root         11117 Jan 22 17:19 chunk-JRH4BR2A.js
#17 0.064 -rw-r--r--    1 root     root         19823 Jan 22 17:19 chunk-JUAFPKGE.js
#17 0.064 -rw-r--r--    1 root     root         11914 Jan 22 17:19 chunk-KCGSGTAP.js
#17 0.064 -rw-r--r--    1 root     root         58194 Jan 22 17:19 chunk-KGPG6VGG.js
#17 0.064 -rw-r--r--    1 root     root          1903 Jan 22 17:19 chunk-LNBBJULI.js
#17 0.064 -rw-r--r--    1 root     root         15582 Jan 22 17:19 chunk-N6EWDSW3.js
#17 0.064 -rw-r--r--    1 root     root         40962 Jan 22 17:19 chunk-OZJBHF4F.js
#17 0.064 -rw-r--r--    1 root     root         19871 Jan 22 17:19 chunk-PUDT56GM.js
#17 0.064 -rw-r--r--    1 root     root          4719 Jan 22 17:19 chunk-RB526ONU.js
#17 0.064 -rw-r--r--    1 root     root          3955 Jan 22 17:19 chunk-RC25XNU3.js
#17 0.064 -rw-r--r--    1 root     root         17623 Jan 22 17:19 chunk-TGYMXETW.js
#17 0.064 -rw-r--r--    1 root     root          5123 Jan 22 17:19 chunk-TJ3H7KM7.js
#17 0.064 -rw-r--r--    1 root     root           250 Jan 22 17:19 chunk-U2J6K5DB.js
#17 0.064 -rw-r--r--    1 root     root          7675 Jan 22 17:19 chunk-UHQZZU23.js
#17 0.064 -rw-r--r--    1 root     root         11520 Jan 22 17:19 chunk-UY7TOCE5.js
#17 0.064 -rw-r--r--    1 root     root         55573 Jan 22 17:19 chunk-VITZ4VS5.js
#17 0.064 -rw-r--r--    1 root     root          8191 Jan 22 17:19 chunk-VKDH6TNY.js
#17 0.064 -rw-r--r--    1 root     root         10676 Jan 22 17:19 chunk-VMX3HNSY.js
#17 0.064 -rw-r--r--    1 root     root        160502 Jan 22 17:19 chunk-W4T3AGL3.js
#17 0.064 -rw-r--r--    1 root     root         16487 Jan 22 17:19 chunk-W6DTDKWS.js
#17 0.064 -rw-r--r--    1 root     root         25511 Jan 22 17:19 chunk-XDFXOBNZ.js
#17 0.065 -rw-r--r--    1 root     root         17120 Jan 22 17:19 chunk-XDRWH5C2.js
#17 0.065 -rw-r--r--    1 root     root        103668 Jan 22 17:19 chunk-Y56ZLT7Z.js
#17 0.065 -rw-r--r--    1 root     root          3134 Jan 22 17:19 chunk-ZF3MQ3MX.js
#17 0.065 -rw-r--r--    1 root     root         15086 Jan 22 17:19 favicon.ico
#17 0.065 -rw-r--r--    1 root     root        128529 Jan 22 17:19 index.html
#17 0.065 -rw-r--r--    1 root     root         72996 Jan 22 17:19 main-JMVZGTBJ.js
#17 0.065 -rw-r--r--    1 root     root         30558 Jan 22 17:19 styles-J5BVYC6R.css
#17 DONE 0.1s
#18 [stage-1 3/4] COPY --from=builder /app/dist/AROProyectoMaqueta/browser /usr/share/nginx/html
#18 DONE 0.2s
#19 [stage-1 4/4] RUN echo "=== Nginx html content ===" &&     ls -la /usr/share/nginx/html/ &&     test -f /usr/share/nginx/html/index.html && echo "✓ index.html found" || echo "✗ index.html NOT found"
#19 0.070 === Nginx html content ===
#19 0.071 total 1440
#19 0.072 drwxr-xr-x    1 root     root          4096 Jan 22 17:19 .
#19 0.072 drwxr-xr-x    1 root     root          4096 Dec 18 00:29 ..
#19 0.072 -rw-r--r--    1 root     root           497 Dec  9 19:41 50x.html
#19 0.072 -rw-r--r--    1 root     root        131204 Jan 22 17:19 Twin_Peaks_TV_Series-892912807-large.jpg
#19 0.072 drwxr-sr-x    4 root     root          4096 Jan 22 17:19 assets
#19 0.072 -rw-r--r--    1 root     root         11527 Jan 22 17:19 chunk-2JXMNM6S.js
#19 0.072 -rw-r--r--    1 root     root         21065 Jan 22 17:19 chunk-33MNMGSM.js
#19 0.072 -rw-r--r--    1 root     root          5732 Jan 22 17:19 chunk-372JYH32.js
#19 0.072 -rw-r--r--    1 root     root         13562 Jan 22 17:19 chunk-3TTXDUBO.js
#19 0.072 -rw-r--r--    1 root     root         22580 Jan 22 17:19 chunk-3VTCZAKR.js
#19 0.072 -rw-r--r--    1 root     root          1924 Jan 22 17:19 chunk-6JUBY6DR.js
#19 0.072 -rw-r--r--    1 root     root           487 Jan 22 17:19 chunk-6ZWETDC6.js
#19 0.072 -rw-r--r--    1 root     root         11361 Jan 22 17:19 chunk-A3HOQPMN.js
#19 0.072 -rw-r--r--    1 root     root         12401 Jan 22 17:19 chunk-AB6YRO4S.js
#19 0.072 -rw-r--r--    1 root     root          1140 Jan 22 17:19 chunk-AHYIF2ET.js
#19 0.072 -rw-r--r--    1 root     root         29132 Jan 22 17:19 chunk-AKNWIIHL.js
#19 0.072 -rw-r--r--    1 root     root        150166 Jan 22 17:19 chunk-BK6NFEPT.js
#19 0.072 -rw-r--r--    1 root     root         11718 Jan 22 17:19 chunk-BXYZLXFE.js
#19 0.072 -rw-r--r--    1 root     root         13507 Jan 22 17:19 chunk-DDFSXJMZ.js
#19 0.072 -rw-r--r--    1 root     root         26032 Jan 22 17:19 chunk-F3UPFDCO.js
#19 0.072 -rw-r--r--    1 root     root         11326 Jan 22 17:19 chunk-HY5F77EV.js
#19 0.072 -rw-r--r--    1 root     root          7324 Jan 22 17:19 chunk-IGBTSGR2.js
#19 0.072 -rw-r--r--    1 root     root         11117 Jan 22 17:19 chunk-JRH4BR2A.js
#19 0.072 -rw-r--r--    1 root     root         19823 Jan 22 17:19 chunk-JUAFPKGE.js
#19 0.072 -rw-r--r--    1 root     root         11914 Jan 22 17:19 chunk-KCGSGTAP.js
#19 0.072 -rw-r--r--    1 root     root         58194 Jan 22 17:19 chunk-KGPG6VGG.js
#19 0.072 -rw-r--r--    1 root     root          1903 Jan 22 17:19 chunk-LNBBJULI.js
#19 0.072 -rw-r--r--    1 root     root         15582 Jan 22 17:19 chunk-N6EWDSW3.js
#19 0.072 -rw-r--r--    1 root     root         40962 Jan 22 17:19 chunk-OZJBHF4F.js
#19 0.072 -rw-r--r--    1 root     root         19871 Jan 22 17:19 chunk-PUDT56GM.js
#19 0.072 -rw-r--r--    1 root     root          4719 Jan 22 17:19 chunk-RB526ONU.js
#19 0.072 -rw-r--r--    1 root     root          3955 Jan 22 17:19 chunk-RC25XNU3.js
#19 0.072 -rw-r--r--    1 root     root         17623 Jan 22 17:19 chunk-TGYMXETW.js
#19 0.072 -rw-r--r--    1 root     root          5123 Jan 22 17:19 chunk-TJ3H7KM7.js
#19 0.072 -rw-r--r--    1 root     root           250 Jan 22 17:19 chunk-U2J6K5DB.js
#19 0.072 -rw-r--r--    1 root     root          7675 Jan 22 17:19 chunk-UHQZZU23.js
#19 0.072 -rw-r--r--    1 root     root         11520 Jan 22 17:19 chunk-UY7TOCE5.js
#19 0.072 -rw-r--r--    1 root     root         55573 Jan 22 17:19 chunk-VITZ4VS5.js
#19 0.072 -rw-r--r--    1 root     root          8191 Jan 22 17:19 chunk-VKDH6TNY.js
#19 0.072 -rw-r--r--    1 root     root         10676 Jan 22 17:19 chunk-VMX3HNSY.js
#19 0.072 -rw-r--r--    1 root     root        160502 Jan 22 17:19 chunk-W4T3AGL3.js
#19 0.072 -rw-r--r--    1 root     root         16487 Jan 22 17:19 chunk-W6DTDKWS.js
#19 0.072 -rw-r--r--    1 root     root         25511 Jan 22 17:19 chunk-XDFXOBNZ.js
#19 0.072 -rw-r--r--    1 root     root         17120 Jan 22 17:19 chunk-XDRWH5C2.js
#19 0.072 -rw-r--r--    1 root     root        103668 Jan 22 17:19 chunk-Y56ZLT7Z.js
#19 0.072 -rw-r--r--    1 root     root          3134 Jan 22 17:19 chunk-ZF3MQ3MX.js
#19 0.072 -rw-r--r--    1 root     root         15086 Jan 22 17:19 favicon.ico
#19 0.072 -rw-r--r--    1 root     root        128529 Jan 22 17:19 index.html
#19 0.072 -rw-r--r--    1 root     root         72996 Jan 22 17:19 main-JMVZGTBJ.js
#19 0.072 -rw-r--r--    1 root     root         30558 Jan 22 17:19 styles-J5BVYC6R.css
#19 0.072 ✓ index.html found
#19 DONE 0.2s
#20 exporting to docker image format
#20 exporting layers
#20 exporting layers 1.0s done
#20 exporting manifest sha256:789f8413b6fd428487c01e22ad08c556202b2e60199599993fedc0a25264989c done
#20 exporting config sha256:79a566f7b0c1de31bcb9d0d122c2d8460bed664caa3f9ac6f36dcd893bb37bf5 done
#20 DONE 1.4s
#21 exporting cache to client directory
#21 preparing build cache for export
#21 writing cache image manifest sha256:5c79f9f36f4f2ca5c215b9fc8b57dbf8f19f3aee5896b6fbfe54afd7d9a454e8 0.1s done
#21 DONE 4.2s
Pushing image to registry...
Upload succeeded
==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
==> Deploying...
127.0.0.1 - - [22/Jan/2026:17:20:51 +0000] "HEAD / HTTP/1.1" 200 0 "-" "Go-http-client/1.1"
==> New primary port detected: 10000. Restarting deploy to update network configuration...
==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
127.0.0.1 - - [22/Jan/2026:17:22:02 +0000] "HEAD / HTTP/1.1" 200 0 "-" "Go-http-client/1.1"
==> Your service is live 🎉
==> 
==> ///////////////////////////////////////////////////////////
==> 
==> Available at your primary URL https://broadcasttd.onrender.com
==> 
==> ///////////////////////////////////////////////////////////
127.0.0.1 - - [22/Jan/2026:17:22:07 +0000] "GET / HTTP/1.1" 200 38200 "-" "Go-http-client/2.0"
==> Detected a new open port HTTP:10000