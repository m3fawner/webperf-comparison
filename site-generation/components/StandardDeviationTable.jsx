import { format } from 'd3-format';
import { deviation, mean } from 'd3-array';
import { useContext, useMemo } from 'react';
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
import { ResultsContext } from '../hooks/results';

const twoDecimal = format('0.4r');
const getRowsForResultArray = (arr, url, path) => Object.keys(arr[0]).reduce((acc, key) => {
  const accessor = (obj) => obj[key];
  return [
    ...acc, {
      url,
      path,
      metric: key,
      rowDeviation: twoDecimal(deviation(arr, accessor) || 0),
      rowMean: twoDecimal(mean(arr, accessor) || 0),
    },
  ];
}, []);
const getStandardDeviationData = (data, newURL, comparisonURL) => Object
  .entries(data)
  .reduce((acc, [path, { new: newSite, comparison }]) => [
    ...acc,
    ...getRowsForResultArray(newSite, newURL, path),
    ...getRowsForResultArray(comparison, comparisonURL, path),
  ], []);

const StandardDeviationTable = (props) => {
  const {
    loaded, data, newURL, comparisonURL,
  } = useContext(ResultsContext);
  const tableRows = useMemo(
    () => (loaded ? getStandardDeviationData(data, newURL, comparisonURL) : []),
    [data, newURL, comparisonURL, loaded],
  );
  return (
    <Box {...props}>
      {loaded ? (
        <Table variant="striped">
          <TableCaption>
            Results for web performance run on sites {newURL} and {comparisonURL}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>URL</Th>
              <Th>Path</Th>
              <Th>Metric</Th>
              <Th isNumeric>Standard Deviation</Th>
              <Th isNumeric>Mean</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableRows.map(({
              url, path, metric, rowDeviation, rowMean,
            }) => (
              <Tr key={`${url}${path}${metric}`}>
                <Td>{url}</Td>
                <Td>{path}</Td>
                <Td>{metric}</Td>
                <Td isNumeric>{rowDeviation}</Td>
                <Td isNumeric>{rowMean}</Td>
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
export default StandardDeviationTable;
