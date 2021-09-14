const METRIC_LOOKUP = {
  FCP: 'fcp',
  LCP: 'lcp',
  INT: 'int',
  SPD: 'spd',
  TBT: 'tbt',
  CLS: 'cls',
  FID: 'fid',
};
const METRIC_LABELS = {
  ROUTE: 'Route',
  HOST: 'Host',
  [METRIC_LOOKUP.FCP]: 'FCP',
  [METRIC_LOOKUP.LCP]: 'LCP',
  [METRIC_LOOKUP.FID]: 'FID',
  [METRIC_LOOKUP.INT]: 'Interactive',
  [METRIC_LOOKUP.SPD]: 'Speed',
  [METRIC_LOOKUP.TBT]: 'Blocking Time',
  [METRIC_LOOKUP.CLS]: 'CLS',
};
const METRIC_LABELS_LONG = {
  [METRIC_LOOKUP.FCP]: 'First Contentful Paint',
  [METRIC_LOOKUP.LCP]: 'Largest Contentful Paint',
  [METRIC_LOOKUP.FID]: 'First Input Delay',
  [METRIC_LOOKUP.INT]: 'Time to Interactive',
  [METRIC_LOOKUP.SPD]: 'Speed Index',
  [METRIC_LOOKUP.TBT]: 'Total Blocking Time',
  [METRIC_LOOKUP.CLS]: 'Cumulative Layout Shift',
};
const METRIC_HINTS = {
  [METRIC_LOOKUP.FCP]: 'First Contentful Paint marks the time at which the first text or image is painted.First Contentful Paint marks the time at which the first text or image is painted.',
  [METRIC_LOOKUP.LCP]: 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
  [METRIC_LOOKUP.FID]: 'First Input Delay measures interactivity. To provide a good user experience, pages should have a FID of 100 milliseconds or less.',
  [METRIC_LOOKUP.INT]: 'Time to interactive is the amount of time it takes for the page to become fully interactive',
  [METRIC_LOOKUP.SPD]: 'Speed Index shows how quickly the contents of a page are visibly populated.',
  [METRIC_LOOKUP.TBT]: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.',
  [METRIC_LOOKUP.CLS]: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
};
const METRICS = {
  [METRIC_LOOKUP.FCP]:
  'firstContentfulPaint',
  [METRIC_LOOKUP.LCP]: 'largestContentfulPaint',
  [METRIC_LOOKUP.FID]: 'maxPotentialFID',
  [METRIC_LOOKUP.INT]: 'interactive',
  [METRIC_LOOKUP.SPD]: 'speedIndex',
  [METRIC_LOOKUP.TBT]: 'totalBlockingTime',
  [METRIC_LOOKUP.CLS]: 'cumulativeLayoutShift',
};
const NETWORK_THROTTLES_LOOKUP = {
  THREE_G_SLOW: '3gslow',
  THREE_G: '3g',
  THREE_G_FAST: '3gfast',
  CABLE: 'cable',
  FOUR_G: '4g',
};
const NETWORK_THROTTLES = {
  [NETWORK_THROTTLES_LOOKUP.THREE_G_SLOW]: '3gslow',
  [NETWORK_THROTTLES_LOOKUP.THREE_G]: '3g',
  [NETWORK_THROTTLES_LOOKUP.THREE_G_FAST]: '3gfast',
  [NETWORK_THROTTLES_LOOKUP.CABLE]: 'cable',
  [NETWORK_THROTTLES_LOOKUP.FOUR_G]: '4g',
};
const NETWORK_THROTTLES_OPTIONS = {
  [NETWORK_THROTTLES_LOOKUP.THREE_G_SLOW]: {
    uploadThroughputKbps: 400,
    downloadThroughputKbps: 400,
    rttMs: 200,
  },
  [NETWORK_THROTTLES_LOOKUP.THREE_G]: {
    uploadThroughputKbps: 768,
    downloadThroughputKbps: 1600,
    rttMs: 150,
  },
  [NETWORK_THROTTLES_LOOKUP.THREE_G_FAST]: {
    uploadThroughputKbps: 768,
    downloadThroughputKbps: 1600,
    rttMs: 75,
  },
  [NETWORK_THROTTLES_LOOKUP.CABLE]: {
    uploadThroughputKbps: 1000,
    downloadThroughputKbps: 5000,
    rttMs: 14,
  },
  [NETWORK_THROTTLES_LOOKUP.FOUR_G]: {
    uploadThroughputKbps: 9000,
    downloadThroughputKbps: 9000,
    rttMs: 85,
  },
};
const CPU_THROTTLES_LOOKUP = {
  SLOW_MOBILE_CPU: 'slow_mobile',
  MOBILE_CPU: 'mobile',
  DESKTOP: 'desktop',
};
const CPU_THROTTLES = {
  [CPU_THROTTLES_LOOKUP.SLOW_MOBILE_CPU]: 6,
  [CPU_THROTTLES_LOOKUP.MOBILE_CPU]: 4,
  [CPU_THROTTLES_LOOKUP.DESKTOP]: 1,
};
const CPU_THROTTLES_DESCRIPTIONS = {
  [CPU_THROTTLES_LOOKUP.SLOW_MOBILE_CPU]: 'Slow mobile phone',
  [CPU_THROTTLES_LOOKUP.MOBILE_CPU]: 'Mobile phone',
  [CPU_THROTTLES_LOOKUP.DESKTOP]: 'Desktop',
};

const PROMPT_KEY_LOOKUP = {
  CPU: 'cpu',
  HOSTS: 'hosts',
  LOAD_SITE: 'loadSite',
  NETWORK: 'network',
  ROUTES: 'routes',
  RUNS: 'runs',
};
const PROMPT_DESCRIPTIONS = {
  [PROMPT_KEY_LOOKUP.CPU]: 'Which CPU throttling option?',
  [PROMPT_KEY_LOOKUP.HOSTS]: 'What are the hosts that you wish to test?',
  [PROMPT_KEY_LOOKUP.LOAD_SITE]: 'Would you like to view the full results via your browser?',
  [PROMPT_KEY_LOOKUP.NETWORK]: 'Which network throttling option?',
  [PROMPT_KEY_LOOKUP.ROUTES]: 'What routes (paths) would you like to test between the two?',
  [PROMPT_KEY_LOOKUP.RUNS]: 'How many times, per experience, would you like to run the lighthouse runner?',
};

module.exports = {
  METRICS,
  METRIC_LABELS,
  METRIC_LOOKUP,
  METRIC_HINTS,
  METRIC_LABELS_LONG,
  NETWORK_THROTTLES,
  NETWORK_THROTTLES_OPTIONS,
  CPU_THROTTLES_LOOKUP,
  CPU_THROTTLES,
  CPU_THROTTLES_DESCRIPTIONS,
  PROMPT_KEY_LOOKUP,
  PROMPT_DESCRIPTIONS,
};
