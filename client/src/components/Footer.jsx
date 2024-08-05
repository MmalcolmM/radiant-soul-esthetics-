import { FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { Box, Grid, Flex, Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  return (
    <Flex className="footer" align="center" justify="center" direction="column" >
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} width="100%">
        <Flex direction="column" align="center" justify="center" color="#fff">
          <Box className="hours" color="#fff" textAlign="center">
            <div className="hours-table">
              <table>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>2:30 PM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>2:30 PM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>2:30 PM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>2:30 PM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>2:30 PM - 8:00 PM</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Sunday</td>
                    <td>Closed</td>
                  </tr>
                </tbody>
              </table>
              <Link to="/admin">
                <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Admin</Button>
              </Link>
            </div>
          </Box>
        </Flex>
        <Flex direction="column" align="center" justify="center" color="#fff" p={4}>
          <Box className="address" mb={2} textAlign="center">
            <a
              className="address"
              href="https://www.google.com/maps/place/Radiant+Soul+Esthetics/@39.7405506,-105.1057049,15z/data=!4m6!3m5!1s0x876b878bf0851eb5:0x97aed49b20619ce3!8m2!3d39.7405506!4d-105.1057049!16s%2Fg%2F11y3_mq0n1?entry=ttu"
            >
              9629 W Colfax Ave ste 301, Lakewood, CO 80215
            </a>
          </Box>
          <Flex className="icons" justifyContent="center" mt={2}>
            <a href="https://www.instagram.com/radiant_soul_esthetics/">
              <FaInstagram className="instagram" />
            </a>
            <a href="tel:3605509603" style={{ margin: "0 10px" }}>
              <FiPhone className="phone" />
            </a>
            <a href="mailto:info@rsesthetics.com">
              <MdOutlineMail className="email" />
            </a>
          </Flex>
        </Flex>
        <Box color="#fff" textAlign="center" p={4}>
          <Box className="map-container" display="flex" justifyContent="center" alignItems="center" m={4}>
            <iframe
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12271.839778994503!2d-105.1057049!3d39.7405506!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b878bf0851eb5%3A0x97aed49b20619ce3!2sRadiant%20Soul%20Esthetics!5e0!3m2!1sen!2sus!4v1715101516504!5m2!1sen!2sus"
              width="350"
              height="200"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Box>
      </Grid>
    </Flex>
  );
}

export default Footer;