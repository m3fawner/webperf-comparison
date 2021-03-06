# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.0.2](https://github.com/m3fawner/webperf-comparison/compare/v5.0.1...v5.0.2) (2021-12-15)

### [5.0.1](https://github.com/m3fawner/webperf-comparison/compare/v5.0.0...v5.0.1) (2021-09-14)

## [5.0.0](https://github.com/m3fawner/webperf-comparison/compare/v4.0.0...v5.0.0) (2021-09-14)


### ⚠ BREAKING CHANGES

* Log prompt answers to the results.json, consume them in the site to provide context to previous run values

#### Breaking change
* `hosts` became a nested property of promptAnswers, breaking previous results.json outputs

### Features

* Log prompt answers to the results.json, consume them in the site to provide context to previous run values ([274b91f](https://github.com/m3fawner/webperf-comparison/commit/274b91f87b37538f423f29d5af436ce60b6793f6))

## [4.0.0](https://github.com/m3fawner/webperf-comparison/compare/v3.1.0...v4.0.0) (2021-09-13)


### ⚠ BREAKING CHANGES

* **cli:** Allow a list of hosts, instead of assuming original and comparison. This allows for single runs, as well as more than 2 hosts.

#### Breaking change
* originalURL is deprecated
* comparisonURL is deprecated
* *New property* `hosts`: Comma delimited list of hostnames to run lighthouse against. Allows for single host, or many. Replaces originalURL/comparisonURL

### Features

* **cli:** Allow a list of hosts, instead of assuming original and comparison. This allows for single runs, as well as more than 2 hosts. ([586ad87](https://github.com/m3fawner/webperf-comparison/commit/586ad879a8bd5d6434e316cee07eb189b7b17131))

## [3.1.0](https://github.com/m3fawner/webperf-comparison/compare/v1.4.0...v3.1.0) (2021-09-08)


### Features

* **cli/site:** Add first input delay measurements ([935478a](https://github.com/m3fawner/webperf-comparison/commit/935478aca13892db9abd600f00454b5d91df7d13))
* **cli:** Throttling of network & CPU added, simulated via lighthouse ([3652f3e](https://github.com/m3fawner/webperf-comparison/commit/3652f3eaee4288bf1d51fff5ae2944946dd83338))

## [3.0.0](https://github.com/m3fawner/webperf-comparison/compare/v1.4.0...v3.0.0) (2021-09-03)


### ⚠ BREAKING CHANGES

* **cli:** Replace usage of the new keyword throughout code and prompts.

### Features

* **cli/site:** Add first input delay measurements ([ddd61e1](https://github.com/m3fawner/webperf-comparison/commit/ddd61e1b7eef0f494d3bb9deb9d030f1f5068400))


* **cli:** Replace usage of the new keyword throughout code and prompts. ([d936a46](https://github.com/m3fawner/webperf-comparison/commit/d936a469fc9f4c8f59da85b74cf06d2c22b4bf8b))

## [2.0.0](https://github.com/m3fawner/webperf-comparison/compare/v1.4.0...v2.0.0) (2021-08-03)


### ⚠ BREAKING CHANGES

**Impact** Previous `results.json` files will no longer be loadable by `--usePrevious`, `npm run start:previous` or by `npm run start:site`

* **cli:** Replace usage of the new keyword throughout code and prompts. ([d936a46](https://github.com/m3fawner/webperf-comparison/commit/d936a469fc9f4c8f59da85b74cf06d2c22b4bf8b))

## [1.4.0](https://github.com/m3fawner/webperf-comparison/compare/v1.3.0...v1.4.0) (2021-08-03)


### Features

* **cli:** Run every other instead of full group to decrease likelihood of outside factors causing variance ([ce2e3fc](https://github.com/m3fawner/webperf-comparison/commit/ce2e3fc2e527489724a35e8a08af05be6fa74582))
* **site:** Add box & whisker plots for metric groups ([d108c1f](https://github.com/m3fawner/webperf-comparison/commit/d108c1f27ad13cdb9435fa144499586377498c70))
* **site:** Regroup standard deviation table to be an accordion per metric ([28660ff](https://github.com/m3fawner/webperf-comparison/commit/28660ff179483d8995d1e7140575e59c58e40de3))

## [1.3.0](https://github.com/m3fawner/webperf-comparison/compare/v1.2.0...v1.3.0) (2021-07-29)


### Features

* **site:** I couldn't live with myself after writing the readme update. React/Chakra-fied ([cdb98bf](https://github.com/m3fawner/webperf-comparison/commit/cdb98bfe879417b6170de20d58f0c11f09b52cc1))

## [1.2.0](https://github.com/m3fawner/webperf-comparison/compare/v1.1.0...v1.2.0) (2021-07-29)


### Features

* **printout:** Enhance the print out table to use the new and comparison URLs instead of new/comp to be explicit ([6d7239a](https://github.com/m3fawner/webperf-comparison/commit/6d7239ac17a946993c7e04e6f3d53b879f2ee7f0))
* **site:** Produce a quick and dirty page for consuming the results in more depth, presently standard variation ([690cd6c](https://github.com/m3fawner/webperf-comparison/commit/690cd6c4ca0f248dd09a746dc2ff55fe182ed1cf))

## [1.1.0](https://github.com/m3fawner/webperf-comparison/compare/v1.0.0...v1.1.0) (2021-07-20)


### Features

* Round output more effectively to account for larger numbers ([478d5b4](https://github.com/m3fawner/webperf-comparison/commit/478d5b499dd6e4570b7037bfb50e364542621e0b))

## 1.0.0 (2021-07-20)


### Features

* Initial implementation ([a290a9a](https://github.com/m3fawner/webperf-comparison/commit/a290a9afbc5959fc0e728b8eeb91c9ee174740eb))
