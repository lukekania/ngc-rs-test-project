# ngc-rs · Angular 21 test bed

One route per open v0.7.x issue. Under `test/` so it's `.gitignore`d at the repo root.

## Setup

```
cd test/test-ng-project
npm install
ng build                                   # reference build (Angular CLI)
ngc-rs build --project tsconfig.app.json   # build with ngc-rs
```

`dist/test-ng-project/browser/` is the output for both. Diff the trees or serve
each and verify the routes below render identically.

## Docker — parallel side-by-side comparison

Two Dockerfiles, both nginx-serving, on different host ports so you can open
both at once and compare rendered output.

| Image        | Dockerfile       | Build step     | Default port |
| ------------ | ---------------- | -------------- | ------------ |
| `ngc-rs-test`| `Dockerfile`     | `ngc-rs build` | `8080`       |
| `ng-test`    | `Dockerfile.ng`  | `ng build`     | `8081`       |

### Run both at once (compose)

```
cd test/test-ng-project
docker compose up --build       # starts both; ngc-rs on :8080, ng on :8081
```

Then open **http://localhost:8080/** and **http://localhost:8081/** in two
windows and step through every `/#NN` route.

### Run one at a time

```
./docker-build.sh               # ngc-rs image on :8080
./docker-build-ng.sh            # upstream ng image on :8081
```

Both scripts take `--no-run` to stop after `docker build`, and honor a
`PORT=…` env override.

### Manual equivalents (run from the workspace root)

```
# ngc-rs image — compiles ngc-rs from workspace source inside Docker.
docker build -f test/test-ng-project/Dockerfile -t ngc-rs-test .
docker run --rm -p 8080:8080 ngc-rs-test

# ng image — runs `ng build` inside Docker.
docker build -f test/test-ng-project/Dockerfile.ng -t ng-test .
docker run --rm -p 8081:8080 ng-test
```

Build context is the **workspace root**, not this directory, so the ngc-rs Rust
stage can reach `crates/`. The helper scripts handle this automatically.

### Hot iteration on the ngc-rs container

Cross-compile to linux (e.g. `cargo build --release --target aarch64-unknown-linux-musl`)
and copy the binary straight into the running container — no image rebuild:

```
docker cp target/aarch64-unknown-linux-musl/release/ngc-rs ngc-rs-test:/usr/local/bin/ngc-rs
docker exec ngc-rs-test ngc-rs build --project tsconfig.app.json --configuration production
```

Otherwise re-run `./docker-build.sh` — the Rust layer is cached when `crates/`
and `Cargo.*` are unchanged.

## Issue → route map

| Issue | Route | What to verify |
| ----- | ----- | -------------- |
| #55 signal APIs | `/signals` | `input.required`, `input(transform)`, `input(alias)`, `model`, `output`, `viewChild`, `viewChildren`, `contentChild`, `contentChildren` all compile and react |
| #56 `@defer` | `/defer` | every trigger (`on idle/viewport/hover/interaction/timer/immediate`, `when`, `prefetch on idle`) + `@placeholder` / `@loading` / `@error` — each block loads its own chunk |
| #57 `hostDirectives` | `/host-directives` | `RippleDirective` (bare) and `TooltipDirective` (mapped-input form) composed on host |
| #58 `@HostListener` / `@HostBinding` | `/host-bindings` | bare property, `attr.*`, `style.*`, `style.*.px`, `class.*` all bind; click/keydown/window:resize listeners fire |
| #59 animation syntax | `/animations` | `[@fade]="state"` property binding; `(@fade.start)` / `(@fade.done)` listeners; `:enter` / `:leave` on `[@slide]` |
| #60 SVG / MathML namespace | `/svg` | inline SVG bars render; `<foreignObject>` child returns to HTML namespace; `<math>` formula renders |
| #61 SCSS preprocessing | `/scss` | external `styleUrl: .scss` + inline `styles: [` backtick `...` backtick `]` under `inlineStyleLanguage: scss`; `@use`, `$vars`, nested selectors, mixins, `color.adjust()` all compiled |
| #62 i18n / ICU / `$localize` | `/i18n` | `i18n` attr with meaning\|description\|@@id; `i18n-alt`; ICU `plural` + `select`; `$localize` tagged template |
| #63 package.json imports | `/package-imports` | `import { APP_ENV } from '#env/config'` resolves via `package.json` `imports` field |
| #64 exports conditional resolution | `/exports-conditions` | `rxjs` (browser/import/production conditions) + `@angular/core/rxjs-interop` (nested subpath) both resolve; prod vs dev entry points differ |
| #65 service worker | `/service-worker` | `dist/.../ngsw.json` with hashTable matches `ngsw-config.json` globs; `ngsw-worker.js` copied from `@angular/service-worker`; `SwUpdate` injectable works |
| #66 web worker bundling | `/web-worker` | `new Worker(new URL('./hash.worker', import.meta.url), { type: 'module' })` → separate `worker-*.js` chunk; URL rewritten to emitted filename |
| #67 index.html options | `/index-html-options` | `ng build --configuration staging` → `index.html` has `<base href="/app/">`, every script/link prefixed with `https://cdn.example.com/`, `crossorigin="anonymous"`, `integrity="sha384-..."` |

## Configurations

- `development` — unoptimized, source maps, for debugging
- `production` — default, content-hashed, minified
- `staging` — production + `baseHref`, `deployUrl`, `crossOrigin`, `subresourceIntegrity` (issue #67)

## Reference outputs

For each issue, build both:

```
ng build --configuration <cfg>
mv dist dist.ng
ngc-rs build --project tsconfig.app.json --configuration <cfg>
mv dist dist.ngc
diff -r dist.ng/ dist.ngc/
```

Any diff that isn't chunk-filename hash or minifier-cosmetic is a real gap.

## File layout

```
src/
├── app/
│   ├── app.{ts,html,scss,config.ts,routes.ts}
│   └── features/
│       ├── home/                       # nav
│       ├── signals/                    # #55
│       ├── defer/                      # #56
│       ├── host-directives/            # #57
│       ├── host-bindings/              # #58
│       ├── animations/                 # #59
│       ├── svg-namespace/              # #60
│       ├── scss-styles/                # #61
│       ├── i18n/                       # #62
│       ├── package-imports/            # #63
│       ├── exports-conditions/         # #64
│       ├── service-worker/             # #65
│       ├── web-worker/                 # #66
│       └── index-html-options/         # #67
├── env/config.ts                       # consumed via `#env/config` (#63)
└── main.ts
ngsw-config.json                        # (#65)
angular.json                            # `staging` config wires #67; `inlineStyleLanguage: scss` wires #61; `serviceWorker` wires #65
package.json                            # `"imports": { "#env/*": "./src/env/*.ts" }` wires #63
```
