import {
  Alert, AlertIcon, Container, Code, Flex, Text,
} from '@chakra-ui/react';
import useResults, { ResultsContext } from '../hooks/results';
import Metrics from './Metrics';
import PromptAnswers from './PromptAnswers';

const Main = (props) => {
  const results = useResults();
  return (
      <ResultsContext.Provider value={results}>
        <Container {...props} as="main" maxW="container.xl">
            {results.failed ? (
                <Alert status="error" aria-live="assertive" my={4}>
                    <AlertIcon />
                    <Flex alignItems="center">
                        <Text>A critical error occurred, most likely a lack of</Text>
                        <Code mx={1}>results.json</Code>
                        <Text>. Please ensure a successful run occurred.</Text>
                    </Flex>
                </Alert>
            ) : (
              <>
                <PromptAnswers />
                <Metrics mt={8} />
              </>
            )}
        </Container>
    </ResultsContext.Provider>
  );
};

export default Main;
