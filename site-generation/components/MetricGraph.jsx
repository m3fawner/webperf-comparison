import { VictoryChart, VictoryBoxPlot } from 'victory';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useResults from '../hooks/results';
import { METRICS } from '../../constants';

const MetricGraph = ({ metric, ...props }) => {
  const {
    loaded, failed, data,
  } = useResults();
  const plotData = useMemo(() => (loaded && !failed ? Object.entries(data)
    .reduce((acc, [path, pathResults]) => ([
      ...acc,
      ...Object.entries(pathResults).map(([host, results]) => ({
        x: `${host}${path}`, y: results.map((obj) => obj[metric]),
      })),
    ]), []) : []), [data, metric, loaded, failed]);
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
