# remote-control — RepoDocs
_Generated on 2026-05-11 · Consolidated on 2026-05-19 against commit 000a65c_

## Summary

### Overview
`remote-control` is an outlier hobby/experiment repo: a React+Redux SPA hosted on GitHub Pages that drives a Particle.io Photon-based battle robot (firmware in `robotCPP/`) by POSTing to named Particle cloud functions. It has no relationship to any PowerReviews/Syndigo production system, no org-internal callers, and has been effectively dormant since 2016 — the only post-2016 change was bolting on the org-standard TruffleHog secrets-scan workflow in 2020 (`f79a2b1`, `4009845`).

### Tech Stack
| Category | Technology | Version |
|----------|-----------|---------|
| Language | JavaScript (ES2015 + stage-0 + JSX) | — |
| Language | C/C++ (Particle/Arduino firmware) | — |
| Framework | React / react-redux / Redux / redux-thunk | 0.14 / 4.x / 3.x / 1.x |
| Framework | Radium (CSS-in-JS) | 0.15.x |
| Framework | SuperAgent (HTTP client) | 1.x |
| Build Tool | Webpack 1 + Babel 6 + node-sass 3 | 1.12 / 6.0 / 3.4 |
| CI/CD | GitHub Actions (TruffleHog secrets scan only) | — |
| Cloud/Infra | GitHub Pages (gh-pages branch deploy) | — |
| Cloud/Infra | Particle.io Device Cloud (`api.particle.io/v1`) | v1 |

### Consumers
| Consumer | Type | How They Use It |
|----------|------|-----------------|
| Browser end users | External (humans) | Open `powerreviews.github.io/remote-control` and drive the robot |
| Particle Photon device(s) | External hardware | Execute UI-triggered cloud functions (`up`/`down`/`left`/`right`/`x`/`start`/`read1`/`read2`/`echo1`/`echo2`) |
| GitHub Pages | Cloud Service | Static hosting of the compiled bundle |
| GitHub Actions | CI System | Runs the cron TruffleHog scan |
| Slack `#github-token-scan` | External | Receives failure notifications from the scan workflow |

### Dependencies on Org Repos
None — no imports, package deps, submodules, CI references, or shared infrastructure tie this repo to any other org repo. It is one of the few JavaScript repos in the org with a completely empty entry in the org-wide dependency map.

| Repo | Reason |
|------|--------|
| _(none)_ | — |

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
| React / react-dom | ^0.14.3 | EOL since 2016; current 19.x; many CVEs only patched in 16+ | Severe |
| Redux | ^3.0.4 | EOL major (current 5.x) | Severe |
| react-redux | ^4.0.0 | EOL major (current 9.x) | Severe |
| redux-thunk | ^1.0.0 | EOL major (current 3.x) | Severe |
| Webpack / webpack-dev-server | ^1.12.x | EOL since 2017; current 5.x | Severe |
| Babel (core + es2015/react/stage-0 presets) | ^6.0.15 | EOL; `stage-0` preset removed in Babel 7 | Severe |
| node-sass | ^3.4.1 | Deprecated in favor of Dart `sass`; 3.x unsupported | Severe |
| Node.js (per readme) | v5.0.0 | EOL since June 2016 | Severe |
| SuperAgent | ^1.4.0 | EOL major; older 1.x carries transitive prototype-pollution / regex DoS advisories | Severe |
| Radium | ^0.15.3 | In maintenance mode since 2017 (FormidableLabs) | Severe |

No CVEs are currently flagged at the repo level, but every framework dependency is multiple majors past EOL — practically, this app cannot be built or audited safely against modern tooling without a wholesale rewrite. Mitigated only by the fact that nothing in production depends on it.

### Coupling Profile
| Dependency | Protocol | Frequency Pattern | Failure Mode |
|-----------|----------|-------------------|--------------|
| Particle.io Device Cloud (`api.particle.io/v1/devices/{id}/{fn}`) | sync HTTP (form-encoded POST via SuperAgent) | per-request (one POST per UI click) | hard — no retry, no circuit breaker; failure surfaces in `responseReducer` and re-enables buttons |
| Particle Photon firmware (`robotCPP/*.ino`) | indirect via Particle Cloud RPC | per-request | hard — caller observes Particle Cloud's error response |
| Browser `localStorage` (`token`, `device`, `requestCount`) | shared local store | per-action (writes on `SET_TOKEN`, on every non-`Start` response) | soft — lost storage just resets device/token; user re-enters |
| GitHub Pages (`gh-pages` branch) | file/object store (manual `npm run gh-pages-auto`) | manual on demand | soft — stale site until next push |
| TruffleHog GitHub Action | scheduled CI job | scheduled (cron `0 14 * * 1-5`) | soft — failure pings Slack, does not block anything |
| Slack `#github-token-scan` webhook | sync HTTP webhook (rtCamp/action-slack-notify) | event-triggered (on scan failure only) | soft — notification only |

### Architectural Notes
- **Shared infrastructure**: None. This is the only repo in the org that integrates with Particle.io (confirmed in the org External Dependency Footprint: `Particle.io` row lists `remote-control` exclusively). It uses no shared Postgres, no shared SNS/SQS topics, no shared Redis, no shared S3 buckets, no shared auth, and no shared deploy tooling (no `pwr-service-deploy-orb`, no `pwr-docker-service`, no Jenkins shared library, no Terraform modules).
- **Bounded-context overlaps**: None. The repo's domain — robot motor/sensor control — has no overlap with any UGC, reviews, syndication, moderation, sampling, analytics, or merchant-config concept defined elsewhere in the org. Even the `Counter`/`Header`/`Footer`/`Button` React components are isolated; they do not pull from `pwr-js`, `pwr-js-utils`, `design-system`, `react-jsonld`, `ui-library`, or any other shared frontend package.
- **Architectural evolution**: The codebase has been frozen since 2016-03-04 (`202068f`, "Modify project to use redux devtools chrome extension"). The only post-2016 commits (`f79a2b1`, `4009845`, both 2020-07) added the org-wide TruffleHog + Slack secrets-scan workflow — a pattern this repo shares with ~75 other small/legacy/placeholder repos in the org per the External Dependency Footprint. In other words, the only "evolution" visible here is being swept up in an org-wide security-hygiene pass, not any actual development.
- **Outlier status**: This repo is effectively orphaned org infrastructure — alongside `elm-engineer`, `front-end-engineer`, `frontend-recruiting-*`, `sre_challenge`, `engineering-demo-elasticsearch`, `cd3-selenium-tests`, `company-postmortems`, `pwr-cix`, `pwr-cloudhealth`, `pwr-event-proxy-api`, `shared-bi-infrastructure`, and `syndication-playground` — that the org-health summary flagged as "25+ placeholder, interview, and experiment repos cluttering the org." Unlike interview repos, this one carries 11 severe EOL alerts but zero blast radius. A reasonable disposition is archive-in-place: the secrets-scan already protects against accidental key leaks, and nothing depends on the code.

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
