import {
  Box,
  Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { METRICS, METRIC_HINTS } from '../../constants';
import StandardDeviationTable from './StandardDeviationTable';

const MetricGroup = ({ metricLookupKey, ...props }) => (
    <Box {...props}>
      <Heading as="h3" size="sm" mb={4}>{METRIC_HINTS[metricLookupKey]}</Heading>
      <StandardDeviationTable metric={METRICS[metricLookupKey]} />
    </Box>
);
MetricGroup.propTypes = {
  metricLookupKey: PropTypes.oneOf(Object.keys(METRICS)),
};
export default MetricGroup;
