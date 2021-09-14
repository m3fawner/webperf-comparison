import {
  Text, Flex, Box, Heading,
} from '@chakra-ui/react';
import { PROMPT_DESCRIPTIONS } from '../../constants';
import useResults from '../hooks/results';

const format = (answer) => {
  if (Array.isArray(answer)) {
    return answer.join(', ');
  } if (typeof answer === 'boolean') {
    return answer ? 'Yes' : 'No';
  }
  return answer;
};
const PromptAnswers = (props) => {
  const { promptAnswers = {} } = useResults();
  return (
        <Box {...props}>
            <Heading level={2} mb={4}>Prompts selected</Heading>
            {Object.entries(promptAnswers).map(([key, answer]) => (
                <Flex key={key} mb={1}>
                    <Text as="dt" mr={4}><Text as="strong">{PROMPT_DESCRIPTIONS[key]}</Text></Text>
                    <Text as="dd">{format(answer)}</Text>
                </Flex>
            ))}
        </Box>
  );
};

export default PromptAnswers;
