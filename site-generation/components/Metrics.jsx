import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
import { METRICS, METRIC_LABELS_LONG, METRIC_HINTS } from '../../constants';
import StandardDeviationTable from './StandardDeviationTable';

const Metrics = (props) => <Accordion {...props}>
  {
    Object.entries(METRICS)
      .map(([key, metric]) => (
        <AccordionItem key={key}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Tooltip label={METRIC_HINTS[key]} aria-label={`More information on ${METRIC_LABELS_LONG[key]}`}>{METRIC_LABELS_LONG[key]}</Tooltip>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Heading as="h3" size="sm" mb={4}>{METRIC_HINTS[key]}</Heading>
            <StandardDeviationTable metric={metric} />
          </AccordionPanel>
        </AccordionItem>
      ))
  }
  </Accordion>;

export default Metrics;
