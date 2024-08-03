import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react"

function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <>
      <Flex className="navContainer" align="center" justify="space-around" padding="1rem">
        <Flex  className="nav">
          <Box as="li" className="nav-item">
            <Link to="/" className={currentPage === "/" ? "nav-link active" : "nav-link"}>Home</Link>
          </Box>
          <Box as="li" className="nav-item">
            <Link to="/About" className={currentPage === "/About" ? "nav-link active" : "nav-link"}>About</Link>
          </Box>
          <Box as="li" className="nav-item">
            <Link to="/Services" className={currentPage === "/Services" ? "nav-link active" : "nav-link"}>Services</Link>
          </Box>
          <Box as="li" className="nav-item">
            <Link to="/Contact" className={currentPage === "/Contact" ? "nav-link active" : "nav-link"}>Contact</Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default NavTabs;