<img src="https://img.shields.io/npm/v/webperf-comparison" /> <img src="https://img.shields.io/node/v/webperf-comparison" />

# Web performance comparison tool

## Purpose

- Run lighthouse in a headless mode in an automated fashion
- [Able to perform multiple runs in order to get a better aggregate result](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/variability.md)
- Perform a comparison between two hosted experiences
- Grok Lighthouse's insanely large JSON response

## Pre-requisites

- Node 14+, I haven't tested on any previous versions, so ultimately it could work prior, but I haven't validated it. YMMV
- Chrome installed -- Necessary for running lighthouse!

## Target audience

**Developers** - I didn't implement any error logging because there aren't many recoverable steps. If errors arise, I feel the errors in the dependencies themselves provide enough context as to what went wrong. Hence, my target audience is one who can read & understand unhandled promise rejections.

## Starting

### by way of cloning this project

- Install the packages, using `npm i`
- Start the prompts using `npm start`

### via the published module

- Run the command `npx webperf-comparison`

1. Answer all the prompts (note: light gray values represent defaults, pressing enter accepts the default, and any keystroke erases the default)
1. Let lighthouse do its magic, the progress bar should keep you up to date on status
1. See the output table

### Previous Use

If you want to re-evaluate the previous run, which leverages the `results.json` written to disk, you can use the command: `webperf-comparison --usePrevious` or, if cloned, `npm run start:previous`

## Want to run your own Chromium? Use the CHROME_PATH environment argument

`chrome-launcher` allows you to define the CHROME_PATH for the launcher. For instance, if you wanted to run Brave Browser, you could do `CHROME_PATH="C:\Program Files (x86)\BraveSoftware\Brave-Browser\Application\brave.exe" npm start`, and huzzah, it works!

## Implementation

- [prompts](https://www.npmjs.com/package/prompts) - For asking the leading questions
- [lighthouse](https://www.npmjs.com/package/lighthouse) - For analyzing web performance

Using prompts, we gather the URL of the host(s) to run against. Additionally, we ask a series of path segments to test against for each experience and how many times to run the test. Many of these values can be set by a [.webperfrc](#webperfc) for convenience.

## <a name="webperfc"></a> .webperfrc

The configuration file can be defined in a number of ways, as per the [rc module documentation](https://www.npmjs.com/package/rc). The simplest way is to provide the file by way of `--config=.webperfrc`.

| Property      | Description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| runs          | The number of times to run lighthouse against each URL/route combination                   |
| hosts        | A comma delimited list of hosts to test against |
| routes        | A comma delimited list of paths to test per URL (i.e. /, /test)                            |
| loadSite      | Whether to load the results details site upon finish, leaving just the command line output |
| chromePath    | Path to Chromium install, optional                                                         |
| network | Network throttling option, see [Network throttling](#network_throttling) |
| cpu | CPU throttling option, see [CPU throttling](#cpu_throttling) |

## <a name="network_throttling"></a> Network throttling (case insensitive)

Lighthouse allows network throttling to be simulated. I had looked at [throttle](https://www.sitespeed.io/documentation/throttle/) to enable this at the hardware level, but it would require sudo permissions and only works on Mac/Linux. Instead, I opted for simulated network throttling which is built into lighthouse itself.

| Option | Round trip time (ms) | Upload speed (Kbps) | Download speed (Kbps) |
| ------ | -------------------- | ------------------- | --------------------- |
| 3gslow | 200                  | 400                 | 400                   |
| 3g     | 150                  | 768                 | 1600                  |
| 3gfast | 75                   | 768                 | 1600                  |
| 4g     | 85                   | 9000                | 9000                  |
| cable  | 14                   | 1000                | 5000                  |

## <a name="cpu_throttling"></a> CPU throttling (case insensitive)

Additional to network throttling, Lighthouse allows CPU throttling which helps mimic processing capabilities of mobile phones vs the device running this module. This is important for testing things like LCP/FID/Blocking time, etc.

| Option            | CPU modifier, 1/modifier | Description |
| ----------------- | ------------------------ | ----------- |
| Slow mobile phone | 6                        | Slow mobile |
| Mobile phone      | 4                        | Mobile      |
| Desktop           | 1                        | Your device |
## Site development

Want to help change what the site output is? That's great! Thanks for the help, in advance. You will have to clone this repository to do so. After installing the npm modules, you should be able to invoke `npm start:site` to get running locally.

Note, it does require a valid `results.json` file at the root of the project directory, so you'll have to drop one in or produce one via `npm start`.
