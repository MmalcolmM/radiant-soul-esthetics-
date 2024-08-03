import { Grid, Box } from "@chakra-ui/react";
import "./pages.css";

export default function Services() {

  return (
    <>
      <Box className="serviceContainer">
        <h2>Services</h2>
        <Box className="services">
          <Box className="service-item">
            <Grid /**templateColumns="auto 1fr" gap={4} alignItems="center"*/>
              <h3>Radiant Soul Facial</h3>
              <p id="price">$100.00 | 1 hr</p>
            </Grid>
            <p>Immerse yourself in the ultimate relaxation with our Radiant Soul Facial, a comprehensive treatment
              designed to cleanse, rejuvenate, and nourish your skin.</p>
          </Box>

          <Box className="service-item">
            <Grid>
              <h3>Deep Cleansing Bacial (Back Facial)</h3>
              <p id="price">$140.00 | 1 hr</p>
            </Grid>
            <p>This specialized service begins with a thorough cleansing to remove impurities, excess oil, and buildup
              from the skin&apos;s surface.</p>

          </Box>

          <Box className="service-item">
            <Grid>
              <h3>Teen Acne Facial</h3>
              <p id="price">$80.00 | 1 hr</p>
            </Grid>
            <p>A specialized treatment designed to target and alleviate teenage skin concerns with care and expertise.
            </p>
          </Box>

          <Box className="service-item">
            <Grid>
              <h3>Anti-Aging Facial</h3>
              <p id="price">$115.00 | 1 hr</p>
            </Grid>
            <p>Indulge in our rejuvenating anti-aging facial, meticulously crafted to breathe new life into your skin
              while addressing signs of aging.</p>

          </Box>

          <Box className="service-item">
            <Grid>
              <h3>Lash Lift and Tint</h3>
              <p id="price">$80.00 | 45 min</p>
            </Grid>
            <p>Gorgeous lashes that require minimal maintenance and look effortlessly glamorous day and night.</p>

          </Box>

          <Box className="service-item">
            <Grid>
              <h3>Microblading</h3>
              <p id="price">$300.00 | 4 hr | $100.00 deposit</p>
            </Grid>
            <p>Achieve the perfect brows with our Permanent Microblading service! Using precise, hair-like strokes,
              we&apos;ll create natural-looking brows tailored to your facial features.</p>
          </Box>
        </Box>
      </Box>
    </>
  );
}