import {
  Heading, Text, Container, Code,
} from '@chakra-ui/react';

const Header = (props) => (
    <Container as="header" maxW="container.xxl" textAlign="center" {...props}>
        <Heading as="h1" size="3xl" mb={2}>Web Performance Comparison Tool Result Analyzer</Heading>
        <Text>
            This site is a visualization/expansion upon the command
             line output of the npm module. The content here relies
             upon the <Code>results.json</Code> file.</Text>
    </Container>
);
export default Header;
