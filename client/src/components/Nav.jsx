import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useAuth } from "../utils/auth"; // Ensure correct import path
import "../App.css";

function NavTabs() {
  const currentPage = useLocation().pathname;
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex className="navContainer" align="center" justify="space-between" padding="1rem">
      <Flex className="nav" listStyleType="none" m={0} p={0}>
        <Box as="li" className="nav-item" mr={4} marginLeft={5}>
          <Link to="/" className={currentPage === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        </Box>
        <Box as="li" className="nav-item" mr={4} marginLeft={5}>
          <Link to="/About" className={currentPage === "/About" ? "nav-link active" : "nav-link"}>About</Link>
        </Box>
        <Box as="li" className="nav-item" mr={4} marginLeft={5}>
          <Link to="/Services" className={currentPage === "/Services" ? "nav-link active" : "nav-link"}>Services</Link>
        </Box>
        <Box as="li" className="nav-item" mr={4} marginLeft={5}>
          <Link to="/Contact" className={currentPage === "/Contact" ? "nav-link active" : "nav-link"}>Contact</Link>
        </Box>
      </Flex>

      <Box className="login" display="flex" justifyContent="flex-end">
        {isAuthenticated ? (
          <Button size='xs' bg="white" variant='ghost' onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/Login">
            <Button size='xs' bg="white" variant='ghost'>Login</Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}

export default NavTabs;
