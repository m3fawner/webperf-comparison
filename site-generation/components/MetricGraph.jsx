import { VictoryChart, VictoryBoxPlot } from 'victory';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useResults from '../hooks/results';
import { METRICS } from '../../constants';

const MetricGraph = ({ metric, ...props }) => {
  const {
    loaded, failed, data, originalURL, comparisonURL,
  } = useResults();
  const plotData = useMemo(() => (loaded && !failed ? Object.entries(data)
    .reduce((acc, [path, { original, comparison }]) => ([
      ...acc,
      { x: `${originalURL}${path}`, y: original.map((obj) => obj[metric]) },
      { x: `${comparisonURL}${path}`, y: comparison.map((obj) => obj[metric]) },
    ]), []) : []), [data, originalURL, comparisonURL, metric, loaded, failed]);
  const chartHeight = useMemo(() => 100 * plotData.length, [plotData.length]);
  return loaded && !failed && (
  <Box {...props} height={chartHeight} pb={4}>
      <VictoryChart domainPadding={20} height={chartHeight}>
        <VictoryBoxPlot
          horizontal
          boxWidth={20}
          data={plotData}
        />
      </VictoryChart>
    </Box>
  );
};
MetricGraph.propTypes = {
  metric: PropTypes.oneOf(Object.values(METRICS)),
};
export default MetricGraph;
