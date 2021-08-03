const METRIC_LOOKUP = {
  FCP: 'fcp',
  LCP: 'lcp',
  INT: 'int',
  SPD: 'spd',
  TBT: 'tbt',
  CLS: 'cls',
};
const METRIC_LABELS = {
  ROUTE: 'Route',
  ORIGINAL_COMP: 'Orig./Comp',
  [METRIC_LOOKUP.FCP]: 'FCP',
  [METRIC_LOOKUP.LCP]: 'LCP',
  [METRIC_LOOKUP.INT]: 'Interactive',
  [METRIC_LOOKUP.SPD]: 'Speed',
  [METRIC_LOOKUP.TBT]: 'Blocking Time',
  [METRIC_LOOKUP.CLS]: 'CLS',
};
const METRIC_LABELS_LONG = {
  [METRIC_LOOKUP.FCP]: 'First Contentful Paint',
  [METRIC_LOOKUP.LCP]: 'Largest Contentful Paint',
  [METRIC_LOOKUP.INT]: 'Time to Interactive',
  [METRIC_LOOKUP.SPD]: 'Speed Index',
  [METRIC_LOOKUP.TBT]: 'Total Blocking Time',
  [METRIC_LOOKUP.CLS]: 'Cumulative Layout Shift',
};
const METRIC_HINTS = {
  [METRIC_LOOKUP.FCP]: 'First Contentful Paint marks the time at which the first text or image is painted.First Contentful Paint marks the time at which the first text or image is painted.',
  [METRIC_LOOKUP.LCP]: 'Largest Contentful Paint marks the time at which the largest text or image is painted.',
  [METRIC_LOOKUP.INT]: 'Time to interactive is the amount of time it takes for the page to become fully interactive',
  [METRIC_LOOKUP.SPD]: 'Speed Index shows how quickly the contents of a page are visibly populated.',
  [METRIC_LOOKUP.TBT]: 'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.',
  [METRIC_LOOKUP.CLS]: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.',
};
const METRICS = {
  [METRIC_LOOKUP.FCP]:
  'firstContentfulPaint',
  [METRIC_LOOKUP.LCP]: 'largestContentfulPaint',
  [METRIC_LOOKUP.INT]: 'interactive',
  [METRIC_LOOKUP.SPD]: 'speedIndex',
  [METRIC_LOOKUP.TBT]: 'totalBlockingTime',
  [METRIC_LOOKUP.CLS]: 'cumulativeLayoutShift',
};
module.exports = {
  METRICS,
  METRIC_LABELS,
  METRIC_LOOKUP,
  METRIC_HINTS,
  METRIC_LABELS_LONG,
};
