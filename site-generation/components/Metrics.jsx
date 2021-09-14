import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Tooltip,
} from '@chakra-ui/react';
import { METRICS, METRIC_LABELS_LONG, METRIC_HINTS } from '../../constants';
import MetricGroup from './MetricGroup';

const Metrics = (props) => (
  <Box {...props}>
    <Heading level={2} mb={4}>Metrics</Heading>
    <Accordion>
      {
        Object.keys(METRICS)
          .map((key) => (
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
                <MetricGroup metricLookupKey={key} />
              </AccordionPanel>
            </AccordionItem>
          ))
      }
    </Accordion>
  </Box>
);

export default Metrics;
