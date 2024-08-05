import logo from "../assets/logo.jpg";
import { Box } from "@chakra-ui/react";
import "../App.css";

export default function Header() {
  return (
    <>
      <Box display="flex" justifyContent="center" align="center" paddingBottom="10px">
        <a href="/" className="header"><img className="logoPic" src={logo} alt="logo Picture" /></a>
      </Box>
      <Box className="nav-book" zIndex="10" paddingBottom="5px" paddingTop="2.5px">
        <a href="/BookNow" className="book-link">Book Now</a>

        {/* <a href="https://radiantsoulesthetics.square.site/" className="book-link">Book Now</a> */}
      </Box>

    </>
  );
}
