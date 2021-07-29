import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const Page = () => (
    <ChakraProvider>
        <Header mt={4} />
        <Main />
        <Footer />
    </ChakraProvider>
);

export default Page;
