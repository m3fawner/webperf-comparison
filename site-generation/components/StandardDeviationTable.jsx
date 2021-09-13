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
  const { loaded } = useContext(ResultsContext);
  const { stats: mean } = useMeanOfResults();
  const { stats: standardDeviation } = useStandardDeviationOfResults();
  const tableRows = useMemo(() => (
    loaded
      ? Object.entries(mean).reduce((acc, [path, pathResults]) => ([
        ...acc, ...Object.entries(pathResults).map(([host, results]) => ({
          url: host,
          mean: results[metric],
          standardDeviation: standardDeviation[path][host][metric],
          path,
        }))]), []) : []), [loaded, mean, metric, standardDeviation]);
  return (
    <Box {...props}>
      {loaded ? (
        <Table variant="striped">
          <TableCaption>
            Standard deviation and mean of web performance results run.
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
