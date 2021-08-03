import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  SkeletonText,
  Box,
} from '@chakra-ui/react';
import { METRICS } from '../../constants';
import { ResultsContext } from '../hooks/results';
import useStandardDeviationOfResults from '../hooks/standardDeviationOfResults';
import useMeanOfResults from '../hooks/meanOfResults';

const StandardDeviationTable = ({ metric, ...props }) => {
  const { originalURL, comparisonURL, loaded } = useContext(ResultsContext);
  const { stats: mean } = useMeanOfResults();
  const { stats: standardDeviation } = useStandardDeviationOfResults();
  const tableRows = useMemo(() => (
    loaded
      ? Object.entries(mean).reduce((acc, [path, { original, comparison }]) => ([
        ...acc, {
          url: originalURL,
          mean: original[metric],
          standardDeviation: standardDeviation[path].original[metric],
          path,
        }, {
          url: comparisonURL,
          mean: comparison[metric],
          standardDeviation: standardDeviation[path].comparison[metric],
          path,
        }]), []) : []), [originalURL, comparisonURL, loaded, mean, metric, standardDeviation]);
  return (
    <Box {...props}>
      {loaded ? (
        <Table variant="striped">
          <TableCaption>
            Results for web performance run on sites {originalURL} and {comparisonURL}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>URL</Th>
              <Th>Path</Th>
              <Th isNumeric>Standard Deviation</Th>
              <Th isNumeric>Mean</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableRows.map(({
              url, path, standardDeviation: sd, mean: m,
            }) => (
              <Tr key={`${url}${path}${metric}`}>
                <Td>{url}</Td>
                <Td>{path}</Td>
                <Td isNumeric>{sd}</Td>
                <Td isNumeric>{m}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <SkeletonText noOfLines={4} spacing={4} />
      )}
    </Box>
  );
};
StandardDeviationTable.propTypes = {
  metric: PropTypes.oneOf(Object.values(METRICS)),
};
export default StandardDeviationTable;
