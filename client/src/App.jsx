import { Outlet } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Header from "./components/Header"
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <Nav />
        <Header />
          <Outlet />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
