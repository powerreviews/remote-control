# remote-control — RepoDocs
_Generated on 2026-05-11_

## Summary

### Overview
`remote-control` is a small React/Redux single-page web app that acts as a remote control UI for a battle-robot built on a Particle.io (formerly Spark Core) Photon microcontroller. Buttons in the UI map to named Particle cloud functions (e.g. `up`, `down`, `left`, `right`, `read1`, `echo1`, `start`) which are POSTed to `api.particle.io`, where the firmware in `robotCPP/` (Arduino-style `.ino` sketches) executes the corresponding hardware action. The repo appears to be an internal/hobby project (the `readme` and gh-pages target `powerreviews.github.io/remote-control`); there is no indication it integrates with any production PowerReviews/Syndigo system.

### Tech Stack
| Category | Technology | Version |
|----------|-----------|---------|
| Language | JavaScript (ES2015 + stage-0 + JSX) | — |
| Language | C/C++ (Particle/Arduino firmware) | — |
| Framework | React | ^0.14.3 |
| Framework | Redux | ^3.0.4 |
| Framework | react-redux | ^4.0.0 |
| Framework | redux-thunk | ^1.0.0 |
| Framework | Radium (CSS-in-JS) | ^0.15.3 |
| Framework | SuperAgent (HTTP client) | ^1.4.0 |
| Build Tool | Webpack | ^1.12.3 |
| Build Tool | Babel | ^6.0.15 (presets: es2015, react, stage-0) |
| Build Tool | node-sass / sass-loader | ^3.4.1 / ^3.1.1 |
| Build Tool | Node | tested on v5.0.0 (per readme) |
| Database | _Not determinable from code._ (uses browser `localStorage`) | — |
| CI/CD | GitHub Actions (secrets scanning only) | — |
| Cloud/Infra | GitHub Pages (deployed via `gh-pages` branch) | — |
| Cloud/Infra | Particle.io device cloud (target of API calls) | v1 |

### Consumers
| Consumer | Type | How They Use It |
|----------|------|----------------|
| Browser end users | External (humans) | Open the GitHub Pages site (`powerreviews.github.io/remote-control`) and drive the robot from a phone/desktop browser |
| Particle Photon device(s) | External hardware | Receive HTTP-triggered function calls (`up`, `down`, `left`, `right`, `x`, `start`, `read1`, `read2`, `echo1`, `echo2`) registered via `Particle.function(...)` in `robotCPP/*.ino` |
| GitHub Pages | External (hosting) | Serves the built `index.html` + `app.js` bundle (via `npm run gh-pages` / `gh-pages-auto`) |
| GitHub Actions | External (CI) | Runs the scheduled TruffleHog secrets scan defined in `.github/workflows/secrets-scan.yml` |
| Slack (`#github-token-scan`) | External | Receives failure notifications from the secrets-scan workflow via `rtCamp/action-slack-notify` |

### Dependencies on Org Repos
_None — no org repos are referenced via imports, package dependencies, submodules, or CI configuration._

### External Integrations
| Service | Purpose | Integration Type |
|---------|---------|-----------------|
| Particle.io Device Cloud (`api.particle.io/v1/devices/{device}/{function}`) | Invokes named functions on a remote Particle Photon microcontroller to drive motors and read sensors | REST |
| GitHub Pages | Static hosting of the compiled UI | REST (deploy via git push to `gh-pages`) |
| TruffleHog (`edplato/trufflehog-actions-scan`) | Scheduled scan for secrets committed to the repo | GitHub Action |
| Slack (`rtCamp/action-slack-notify`) | Posts to the `github-token-scan` channel when the scan finds secrets | Webhook (outbound) |

### Async & Scheduled Work
| Channel / Job | Type | Direction | Purpose |
|--------------|------|-----------|---------|
| `secrets-scan.yml` (cron `0 14 * * 1-5`) | GitHub Actions scheduled workflow | N/A (for jobs) | Weekday 14:00 UTC TruffleHog secret scan against the repo; pings Slack `#github-token-scan` on failure |

### Upgrade Alerts
| Dependency | Current Version | Issue | Severity |
|-----------|----------------|-------|----------|
| React | ^0.14.3 | EOL — last 0.14.x release was in 2016; current major is 19.x. Many known CVEs are patched only in 16+ | Severe |
| react-dom | ^0.14.3 | Same EOL situation as React 0.14 | Severe |
| Redux | ^3.0.4 | Major-version EOL; current line is 5.x | Severe |
| redux-thunk | ^1.0.0 | EOL major; current line is 3.x | Severe |
| react-redux | ^4.0.0 | EOL major; current line is 9.x | Severe |
| Webpack | ^1.12.3 | EOL — webpack 1 unsupported since 2017; current is 5.x | Severe |
| Babel | ^6.0.15 (core + es2015/react/stage-0 presets) | EOL — Babel 6 unmaintained since Babel 7 (Aug 2018); `stage-0` preset removed | Severe |
| node-sass | ^3.4.1 | Deprecated by maintainers in favor of `sass` (Dart Sass); 3.x line unsupported | Severe |
| webpack-dev-server | ^1.12.1 | EOL — current is 5.x; relies on EOL webpack 1 | Severe |
| Node.js | v5.0.0 (per `readme.md`) | EOL since June 2016 | Severe |
| SuperAgent | ^1.4.0 | EOL major; older 1.x versions have known prototype-pollution / regex DoS advisories in transitive deps | Severe |
| Radium | ^0.15.3 | Project officially placed in maintenance mode by FormidableLabs (2017) | Severe |

## API Reference

This repo exposes no server-side HTTP API. The "API surface" is (a) the Redux store contract used by components and (b) the Particle cloud endpoint format the UI POSTs to, plus the C++ functions registered by the firmware.

### Redux action creators — `src/redux/actionCreators.js`
- `setToken(device, token)` → action `{ type: 'SET_TOKEN', data: { device, token } }`. Persists Particle device id + access token to `localStorage` via `tokenReducer`.
- `sendRequest(requestName, params)` → action `{ type: 'SEND_REQUEST', requestName, params }`.
- `receiveResponse(response)` → action `{ type: 'RECEIVE_RESPONSE', response }`.
- `makeRequest(requestName, params)` (thunk) — dispatches `SEND_REQUEST`, then issues:
  - `POST https://api.particle.io/v1/devices/{params.device}/{requestName}` (lowercased)
  - `Content-Type: application/x-www-form-urlencoded` (SuperAgent `.type('form')`)
  - Body: `access_token={params.token}`
  - On completion dispatches `RECEIVE_RESPONSE` with `res.body`.

### Reducers — `src/redux/reducers.js`
- `tokenReducer(state, action)` — state shape `{ token, device }`, hydrated from `localStorage`.
- `requestReducer(state, action)` — state shape `{ requestName, inProgress }`; flips `inProgress` true on `SEND_REQUEST`, false on `RECEIVE_RESPONSE`.
- `responseReducer(state, action)` — state shape `{ response }` (JSON-stringified body).
- `requestCountReducer(state, action)` — integer count of non-`Start` requests, mirrored to `localStorage.requestCount`.

### React components — `src/components/`
- `Root({ store })` — wraps `<App/>` in a `react-redux <Provider/>`.
- `App` — top-level layout: `Header`, `DirectionalController`, `ButtonPanel buttons={'abcdefghijkl'.split('')}`, `Footer`.
- `Button({ requestName?, children, style?, params, requestInProgress, dispatch })` — on click dispatches `makeRequest(requestName || children, params)`. Disabled while `requestInProgress`.
- `DirectionalController` — emits Particle calls `up`, `down`, `left`, `right`, `x`, plus sensor buttons via `SensorButtons`.
- `SensorButtons` — emits Particle calls `read1`, `read2`, `echo1`, `echo2`, and a `heading` label button.
- `StartButton` — pulsing button labeled "Start".
- `ButtonPanel({ buttons })` — renders one `Button` per letter from a string of labels (default a-l).
- `Header` — top sticky bar showing latest `requestName` and `response`.
- `Footer` — bottom sticky bar with `device` and `token` displayed; clicking either flips to an inline `<input>` and dispatches `setToken` on save / Enter / Esc.
- `StickyBar({ position, type, items, style })` — fixed bar; if `type === 'footer'` it also renders `Counter`.
- `Counter` — displays `Requests made: {state.requestCountReducer}` (uses `dangerouslySetInnerHTML`).

### Firmware "API" — `robotCPP/*.ino`
Each sketch registers callables with the Particle Cloud, e.g. `Particle.function("start", start)`, `Particle.function("read1", read1)`, `Particle.function("read2", read2)`, `Particle.function("echo1", echo1)`, `Particle.function("echo2", echo2)`. The UI's REST calls map 1:1 to these names; `support.h` defines hardware abstractions (`OpticalSensor`, `Sonar`, `Motor`, `Heading`).

## Architecture

### System-context diagram
```
        +------------------------+
        |        Browser         |
        |  React + Redux SPA     |
        |  (gh-pages static)     |
        +-----------+------------+
                    | HTTPS POST (form)
                    | access_token in body
                    v
        +------------------------+
        |  api.particle.io/v1    |
        |  /devices/{id}/{fn}    |
        +-----------+------------+
                    | Particle Cloud
                    v
        +------------------------+
        |   Particle Photon      |
        |   (robotCPP firmware)  |
        |   motors / sonar /     |
        |   optical / heading    |
        +------------------------+

GitHub Actions (cron Mon-Fri 14:00 UTC)
   --> TruffleHog scan of this repo
       on failure --> Slack webhook (#github-token-scan)
```

### Key components
- **`src/app.js`** — entrypoint; creates the Redux store and mounts `<Root/>` into `#app`.
- **`src/redux/createStore.js`** — composes `redux.createStore` with `redux-thunk` middleware and the Redux DevTools browser extension (`window.devToolsExtension`).
- **`src/redux/{actionCreators,reducers}.js`** — only one thunk (`makeRequest`) makes a network call; everything else is local UI state.
- **`src/components/*.jsx`** — presentational + connected components; styles are co-located via Radium.
- **`robotCPP/*.ino` + `support.h`** — Particle/Arduino firmware that registers cloud functions and drives motors/sensors. Includes lesson sketches (`lesson1.ino` … `lesson5.ino`), a `template.ino`, and `verify.ino`. `Breadboard_Internals.jpg` and `RoboWiring.png` document the hardware wiring.

### Data flow
1. User clicks a `Button`; component dispatches `makeRequest(name, { device, token })`.
2. Reducer flips `requestReducer.inProgress = true`; UI disables buttons and shows "pending…" in the header.
3. SuperAgent POSTs to `https://api.particle.io/v1/devices/{device}/{name}` with `access_token` in the form body.
4. Particle Cloud invokes the Photon-registered function; firmware actuates motors / reads sensors and returns an int.
5. `RECEIVE_RESPONSE` is dispatched; `responseReducer.response = JSON.stringify(body)`; counter increments (unless `name === 'Start'`).
6. `device`, `token`, and `requestCount` are persisted to `localStorage`.

### CI/CD tooling
**GitHub Actions** — only one workflow exists: `.github/workflows/secrets-scan.yml`. It is a scheduled job (`cron: 0 14 * * 1-5`) that checks out the repo, runs `edplato/trufflehog-actions-scan@master` with `--regex --entropy=False --max_depth=1`, and on failure sends a Slack notification to `github-token-scan` via `rtCamp/action-slack-notify@v2.0.2`. There is no build / test / deploy pipeline; the app is published manually via the npm scripts `gh-pages` (`webpack && mv build/* ./`) and `gh-pages-auto` (force-pushes a freshly built `gh-pages` branch).

### Test architecture
_No test framework, runner, or test files are present in the repo._

### Data model / database schema
No database. Persistent state is browser `localStorage` only:
- `token` — Particle access token (string)
- `device` — Particle device id (string)
- `requestCount` — integer count of non-Start requests

### Auth & trust boundaries
- **Inbound auth (web UI):** none — the SPA is served as static files from GitHub Pages and has no login.
- **Outbound auth (to Particle Cloud):** the Particle `access_token` is held in browser `localStorage` and sent as `access_token=<token>` in the form-encoded POST body to `api.particle.io`. The token and device id are entered by the user via inline inputs in the `Footer` and saved with the `SET_TOKEN` action. There is no encryption at rest beyond the browser's own `localStorage`.
- **Reachable without authentication:** the entire UI; only the actual Particle calls require a valid token, and that token is supplied by the user.
- **Authorization model:** none in the SPA. Authorization is delegated to the Particle Cloud which validates the access token against the target device.

### Data ownership
- **Browser `localStorage`** — Owner (read/write). Keys: `token`, `device`, `requestCount`. Not shared with any sibling repo (single-page static app).
- No server-side datastore is referenced in this repo.

### Deployment topology
- **Runtime:** static assets (`index.html` + bundled `app.js`) served from the `gh-pages` branch by GitHub Pages.
- **Scaling model:** stateless static hosting (handled entirely by GitHub Pages CDN).
- **Environments:** single environment — production via `powerreviews.github.io/remote-control`.
- **Region(s):** GitHub Pages global CDN.
- No Dockerfile, Kubernetes manifests, Terraform, Helm charts, or other infra-as-code is present in this repo. The Particle Photon firmware is flashed out-of-band via the Particle toolchain (no automation in repo).

## Repo Activity
Derived from git history; current HEAD is `4009845`.
- **Created:** 2015-11-21 (initial commit `3aeac43`).
- **Last meaningful change:** 2016-03-04 — `202068f` "Modify project to use redux devtools chrome extension". Two later commits (`f79a2b1`, `4009845`, both 2020-07) only add/tweak the GitHub Actions secrets-scan workflow.
- **Activity level:** 0 commits in the last 90 days. No commits since 2020-07-08.
- **Hot spots (last 6 months):** _No commits in the last 6 months — no churn to report._
- **Recent major changes:** _No major changes in the last 6 months._ (The repo has been effectively dormant since 2016; the only post-2016 activity was the 2020 addition of a secrets-scan workflow.)
