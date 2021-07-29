import {
  Heading, Container, Link, Text,
} from '@chakra-ui/react';
import {
  Twitter, LinkedIn, GitHub, External,
} from './Icons';

const Footer = (props) => (
    <Container as="footer" display="flex" flexDir="column" alignItems="center" {...props}>
        <Heading as="h2" size="2xl">About this site</Heading>
        <Heading as="h3" my={2} size="xl">Author: Evan Williams</Heading>
        <Heading as="h3" my={2} size="xl"><Twitter color="twitter.500" as={Link} mr={4} href="https://www.twitter.com/@angular_evan" /><LinkedIn color="linkedin.500" as={Link} mr={4} href="https://www.linkedin.com/in/ewillia/" /><GitHub as={Link} href="https://github.com/m3fawner/" /></Heading>
        <Heading as="h3" my={2} size="xl">Having issues?</Heading>
        <Text>They&apos;re bound to happen! <Link color="teal.500" display="inline-flex" alignItems="center" isExternal href="https://github.com/m3fawner/webperf-comparison/issues">Please file an issue <External mx={1} /></Link></Text>
    </Container>
);
export default Footer;
