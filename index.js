#!/usr/bin/env node
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const prompts = require('prompts');
const chalk = require('chalk');
const minimist = require('minimist');
const cliProgress = require('cli-progress');
const defaultAnswers = require('rc')('webperf');
const webpack = require('webpack');
const open = require('open');
const path = require('path');
const { repository: { url: repositoryURL } } = require('./package.json');
const webpackConfig = require('./webpack.config');
const { METRICS, METRIC_LOOKUP, METRIC_LABELS } = require('./constants');

function* urlGenerator(routes, count, newURL, comparisonURL) {
  // eslint-disable-next-line no-restricted-syntax
  for (const route of routes) {
    for (let i = 0; i < count; i += 1) {
      yield {
        url: newURL + route,
        route,
        isNew: true,
      };
    }
    for (let i = 0; i < count; i += 1) {
      yield {
        url: comparisonURL + route,
        route,
        isNew: false,
      };
    }
  }
}

const getResultForURL = async (url, port) => {
  const {
    lhr: {
      audits: {
        metrics: {
          details: {
            items: [{
              firstContentfulPaint,
              largestContentfulPaint,
              interactive,
              speedIndex,
              totalBlockingTime,
              cumulativeLayoutShift, // note: seems to be exactly the same every time
            }],
          },
        },
      },
    },
  } = await lighthouse(url, {
    quiet: true, output: 'json', onlyCategories: ['performance'], port,
  });
  return {
    firstContentfulPaint,
    largestContentfulPaint,
    interactive,
    speedIndex,
    totalBlockingTime,
    cumulativeLayoutShift,
  };
};
const order = [
  'ROUTE',
  'NEW_COMP',
  METRIC_LOOKUP.FCP,
  METRIC_LOOKUP.LCP,
  METRIC_LOOKUP.INT,
  METRIC_LOOKUP.SPD,
  METRIC_LOOKUP.TBT,
  METRIC_LOOKUP.CLS,
];
const getResultRow = (route, site, result) => [
  route,
  site,
  ...result.reduce((acc, curr) => {
    const reduced = [];
    order.slice(2).forEach((key, i) => {
      reduced.push([...(acc[i] ?? []), curr[METRICS[key]]]);
    });
    return reduced;
  }, []).map((item) => {
    const average = item.reduce((sum, part) => sum + part, 0) / item.length;
    return average.toLocaleString('en-US', {
      // I normally agree with you, AirBnB, but in this case succinctness is my jam.
      // eslint-disable-next-line no-nested-ternary
      maximumFractionDigits: average > 1000 ? 0 : average > 100 ? 1 : average > 1 ? 3 : 5,
    });
  }),
];

const getRouteRows = (route, { new: newPage, comparison }, comparisonURL, newURL) => {
  const newResult = getResultRow(route, newURL, newPage);
  const compResult = getResultRow(route, comparisonURL, comparison);
  return {
    new: newResult,
    comparison: compResult,
  };
};

const getMaxLengths = (collectionOfCollections) => collectionOfCollections
  .reduce(
    (currentMaxes, internalCollection) => internalCollection.map(
      (item, i) => Math.max(currentMaxes[i] || 0, (typeof item === 'string' ? item.length : item) || 0),
    ),
    [],
  );

const logResults = (results, comparisonURL, newURL) => {
  const allRoutes = Object.entries(results)
    .map(([route, value]) => getRouteRows(route, value, comparisonURL, newURL));
  const headings = order.map((key) => METRIC_LABELS[key]);
  const maximums = getMaxLengths([
    headings,
    getMaxLengths(allRoutes.map(({ new: newItems }) => newItems)),
    getMaxLengths(allRoutes.map(({ comparison }) => comparison)),
  ]);
  // eslint-disable-next-line no-console
  console.log(`
        ${chalk.hex('#FFD237').bold('Detailed results are logged in "results.json" of this directory.')}
        ${chalk.hex('#579DFF')('The following is a comparison of the averages across the multiple runs.')}

        ${headings.map((heading, i) => heading.padEnd(maximums[i])).join('   ')}
        ${allRoutes.map(({ new: newItems, comparison }) => `
        ${newItems.map((item, i) => item.toString().padEnd(maximums[i])).join('   ')}
        ${comparison.map((item, i) => item.toString().padEnd(maximums[i])).join('   ')}
        `).join('')}

        ${chalk.hex('#BE1C00')(`Thank you for using webperf-comparison! Any issues or comments, please add them to the GitHub repository: ${repositoryURL}`)}
    `);
};
const loadFromJSON = () => {
  const { data, comparisonURL, newURL } = JSON.parse(fs.readFileSync('results.json', 'UTF-8').toString());
  logResults(data, comparisonURL, newURL);
};
(async () => {
  const { usePrevious } = minimist(process.argv.slice(2));
  if (usePrevious) {
    loadFromJSON();
  } else {
    const {
      comparisonURL, newURL, routes, runs, loadSite,
    } = await prompts([{
      type: 'text',
      name: 'comparisonURL',
      message: 'What is the URL to compare against?',
      initial: defaultAnswers.comparisonURL,
    }, {
      type: 'text',
      name: 'newURL',
      message: 'What is the URL of the new branch?',
      initial: defaultAnswers.newURL,
    }, {
      type: 'list',
      name: 'routes',
      message: 'What routes (paths) would you like to test between the two?',
      initial: defaultAnswers.routes,
    }, {
      type: 'number',
      name: 'runs',
      message: 'How many times, per experience, would you like to run the lighthouse runner?',
      initial: defaultAnswers.runs,
    }, {
      type: 'toggle',
      name: 'loadSite',
      message: 'Would you like to view the full results via your browser?',
      initial: defaultAnswers.loadSite,
    }]);
    const safeNewURL = newURL.endsWith('/') ? newURL.slice(0, -1) : newURL;
    const safeComparisonURL = comparisonURL.endsWith('/') ? comparisonURL.slice(0, -1) : comparisonURL;
    const safeRoutes = routes.map((route) => route.trim());
    const gen = urlGenerator(safeRoutes, runs, safeNewURL, safeComparisonURL);
    const results = {};
    let item = gen.next();
    // eslint-disable-next-line no-console
    console.debug('Launching chrome');
    const chrome = await chromeLauncher.launch({ chromePath: defaultAnswers.chromePath || process.env.CHROME_PATH, chromeFlags: ['--headless', '--ignore-certificate-errors'] });
    // eslint-disable-next-line no-console
    console.debug('Chrome launched');
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progress.start(2 * routes.length * runs, 0);
    while (!item.done) {
      const { route, url, isNew } = item.value;
      if (!results[route]) {
        results[route] = {
          new: [],
          comparison: [],
        };
      }
      const prop = isNew ? 'new' : 'comparison';
      const existingResults = results[route][prop];
      // eslint-disable-next-line no-await-in-loop
      const result = await getResultForURL(url, chrome.port);
      progress.increment();
      results[route][prop] = [...existingResults, result];
      item = gen.next();
    }
    await chrome.kill();
    progress.stop();
    fs.writeFileSync('results.json', JSON.stringify({
      newURL,
      comparisonURL,
      data: results,
    }, null, 5));
    logResults(results, comparisonURL, newURL);

    if (loadSite) {
      webpack(webpackConfig, (err) => {
        if (err) {
          // Gotta let the user know it failed!
          // eslint-disable-next-line no-console
          console.error(chalk.hex('#A3000B')('An error occurred while compiling the site. Don\'t worry, the results.json has all the data!'));
        } else {
          open(path.resolve(__dirname, 'dist', 'index.html'));
        }
      });
    }
  }
})();
