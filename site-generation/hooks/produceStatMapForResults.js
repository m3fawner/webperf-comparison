const getResultForMetric = (statFunction, format, metric, data) => {
  const accessor = (obj) => obj[metric];
  return format(statFunction(data, accessor) || 0);
};

const getResultsForSite = (statFunction, format, data) => Object.keys(data[0])
  .reduce((acc, key) => ({
    ...acc,
    [key]: getResultForMetric(statFunction, format, key, data),
  }), {});

const getResultForPath = (statFunction, format, data) => Object.entries(data)
  .reduce((acc, [site, results]) => ({
    ...acc,
    [site]: getResultsForSite(statFunction, format, results),
  }), {});

const produceStatMapForResults = (statFunction, format, data) => Object.entries(data)
  .reduce((acc, [path, results]) => ({
    ...acc,
    [path]: getResultForPath(statFunction, format, results),
  }), {});

export default produceStatMapForResults;
