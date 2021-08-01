import { VictoryChart, VictoryBoxPlot } from 'victory';
import {
  Box, Flex, ListItem, Text, UnorderedList,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useResults from '../hooks/results';
import { METRICS } from '../../constants';

const MetricGraph = ({ metric, ...props }) => {
  const {
    loaded, failed, data, newURL, comparisonURL,
  } = useResults();
  const { legends, data: plotData } = useMemo(() => (loaded && !failed ? Object.entries(data)
    .reduce(({ legends: accLegends, data: accData }, [path, { new: newSite, comparison }], i) => {
      const newLabel = String.fromCharCode('A'.charCodeAt(0) + (i * 2));
      const comparisonLabel = String.fromCharCode('A'.charCodeAt(0) + (i * 2 + 1));
      return ({
        legends: {
          ...accLegends,
          [newLabel]: `${newURL}${path}`,
          [comparisonLabel]: `${comparisonURL}${path}`,
        },
        data: [
          ...accData,
          { x: newLabel, y: newSite.map((obj) => obj[metric]) },
          { x: comparisonLabel, y: comparison.map((obj) => obj[metric]) },
        ],
      });
    }, { legends: [], data: [] }) : []), [data, newURL, comparisonURL, metric, loaded, failed]);
  return loaded && !failed && (
  <Box {...props}>
    <UnorderedList appearance="">
      {Object.entries(legends).map(([series, label]) => (
        <ListItem key={series}><Flex><Text as="strong" mr={1}>{series}:</Text><Text>{label}</Text></Flex></ListItem>
      ))}
    </UnorderedList>
    <VictoryChart domainPadding={20} height={75 * plotData.length}>
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
