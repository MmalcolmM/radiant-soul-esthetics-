import { Outlet } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import "./App.css";

function App() {
  return (
    <>
      <ApolloProvider  client={client}>
        <ChakraProvider>
          <div className="app-container">
            <Nav />
            <Header />
            <div className="content">
              <Outlet />
            </div>
            <Footer />
          </div>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
