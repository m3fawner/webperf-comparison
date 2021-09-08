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
const {
  METRICS,
  METRIC_LOOKUP,
  METRIC_LABELS,
  NETWORK_THROTTLES,
  NETWORK_THROTTLES_OPTIONS,
  CPU_THROTTLES,
  CPU_THROTTLES_LOOKUP,
  CPU_THROTTLES_DESCRIPTIONS,
} = require('./constants');

function* urlGenerator(routes, count, hosts) {
  for (let h = 0; h < routes.length; h += 1) {
    for (let i = 0; i < count; i += 1) {
      for (let j = 0; j < hosts.length; j += 1) {
        const host = hosts[j];
        const route = routes[h];
        yield {
          url: host + route,
          route,
          host,
        };
      }
    }
  }
}

const getResultForURL = async (url, lighthouseOptions) => {
  const {
    lhr: {
      audits: {
        metrics: {
          details: {
            items: [result],
          },
        },
      },
    },
  } = await lighthouse(url, {
    quiet: true, output: 'json', onlyCategories: ['performance'], ...lighthouseOptions,
  });
  return Object.values(METRICS).reduce((acc, key) => ({
    ...acc,
    [key]: result[key],
  }), {});
};
const order = [
  'ROUTE',
  'HOST',
  METRIC_LOOKUP.FCP,
  METRIC_LOOKUP.LCP,
  METRIC_LOOKUP.FID,
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

const getRouteRows = (route, results) => Object
  .entries(results)
  .map(([host, data]) => getResultRow(route, host, data));

const getMaxLengths = (collectionOfCollections) => collectionOfCollections
  .reduce(
    (currentMaxes, internalCollection) => internalCollection.map(
      (item, i) => Math.max(currentMaxes[i] || 0, (typeof item === 'string' ? item.length : item) || 0),
    ),
    [],
  );

const COLUMN_SPACING = '     ';
const logResults = (results) => {
  const allRoutes = Object.entries(results)
    .map(([route, value]) => getRouteRows(route, value));
  const headings = order.map((key) => METRIC_LABELS[key]);
  const maximums = getMaxLengths([
    headings,
    ...allRoutes.flat(),
  ]);
  const resultRows = Object
    .values(allRoutes)
    /**
     * Not a fan of how this is done, but each result should have the column padded
     * to the maximum column width (maximums[i]), be a single string with the appropriate
     * column spacing to align with the headers join(COLUMN_SPACING), end in a new line character
     * join('\n'), but then also have each result array, which represents a route, separated from
     * the next route, with another \n (hence the template string).
     */
    .map((resultArray) => `${resultArray.map((item) => item.map((column, i) => column.toString().padEnd(maximums[i])).join(COLUMN_SPACING)).join('\n')}\n`);
  // eslint-disable-next-line no-console
  console.log(`
${chalk.hex('#FFD237').bold('Detailed results are logged in "results.json" of this directory.')}
${chalk.hex('#579DFF')('The following is a comparison of the averages across the multiple runs.')}

${headings.map((heading, i) => heading.padEnd(maximums[i])).join(COLUMN_SPACING)}
${resultRows.join('\n')}

${chalk.hex('#BE1C00')(`Thank you for using webperf-comparison! Any issues or comments, please add them to the GitHub repository: ${repositoryURL}`)}
    `);
};
const loadFromJSON = () => {
  const { data, hosts } = JSON.parse(fs.readFileSync('results.json', 'UTF-8').toString());
  logResults(data, hosts);
};
(async () => {
  const { usePrevious } = minimist(process.argv.slice(2));
  if (usePrevious) {
    loadFromJSON();
  } else {
    const {
      network, cpu, hosts, routes, runs, loadSite,
    } = await prompts([{
      type: 'select',
      name: 'network',
      message: 'Which network throttling option?',
      initial: defaultAnswers.network,
      choices: Object.values(NETWORK_THROTTLES).map((value) => ({
        title: value,
        value,
      })),
    }, {
      type: 'select',
      name: 'cpu',
      message: 'Which CPU throttling option?',
      initial: defaultAnswers.cpu,
      choices: Object.values(CPU_THROTTLES_LOOKUP).map((value) => ({
        title: CPU_THROTTLES_DESCRIPTIONS[value],
        value: CPU_THROTTLES[value],
      })),
    }, {
      type: 'list',
      name: 'hosts',
      message: 'What are the hosts that you wish to test?',
      initial: defaultAnswers.hosts,
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
    }], { onCancel: () => process.exit(0) });
    const safeHosts = hosts.map((host) => (host.endsWith('/') ? host.slice(0, -1) : host));
    const safeRoutes = routes.map((route) => route.trim());
    const gen = urlGenerator(safeRoutes, runs, safeHosts);
    const results = {};
    let item = gen.next();
    // eslint-disable-next-line no-console
    console.debug('Launching chrome');
    const chrome = await chromeLauncher.launch({ chromePath: defaultAnswers.chromePath || process.env.CHROME_PATH, chromeFlags: ['--headless', '--ignore-certificate-errors'] });
    // eslint-disable-next-line no-console
    console.debug('Chrome launched');
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progress.start(hosts.length * routes.length * runs, 0);
    while (!item.done) {
      const { route, url, host } = item.value;
      if (!results[route]) {
        // Establish initial list of results on a new route
        results[route] = hosts.reduce((acc, curr) => ({
          ...acc,
          [curr]: [],
        }), {});
      }
      const existingResults = results[route][host];
      // eslint-disable-next-line no-await-in-loop
      const result = await getResultForURL(url, {
        port: chrome.port,
        throttlingMethod: 'simulate',
        throttling: { ...NETWORK_THROTTLES_OPTIONS[network], cpuSlowdownMultiplier: cpu },
      });
      progress.increment();
      results[route][host] = [...existingResults, result];
      item = gen.next();
    }
    await chrome.kill();
    progress.stop();
    fs.writeFileSync('results.json', JSON.stringify({
      hosts,
      data: results,
    }, null, 5));
    logResults(results, hosts);

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
