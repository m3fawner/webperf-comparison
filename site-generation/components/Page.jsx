import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const Page = () => (
    <ChakraProvider>
        <Header mt={4} />
        <Main mt={4} />
        <Footer mt={4} />
    </ChakraProvider>
);

export default Page;
