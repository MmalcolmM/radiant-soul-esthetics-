import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import serviceInfo from "../../serviceInfo";
import { facial } from "../../assets/index";
import "./pages.css";

function ServiceCard(serviceInfo) {
  return (
    <Box className="serviceCardContainer">
      <Box className="serviceCard" display="block">
        <div className="serviceCardHeader">
          <h3 className="card-title">{serviceInfo.title}</h3>
        </div>
        <div className="serviceCardBody">
          <p className="price">{serviceInfo.price}</p>
          <p className="description">{serviceInfo.description}</p>
        </div>
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  const [services] = useState(serviceInfo);

  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={2}>
          <Image src={facial} alt="Deidre giving a facial" width="80%" ml={5} display="flex" alignItems="center" justifyContent="center"></Image>
        </GridItem>
        <GridItem colStart={3} colEnd={6} className="service-container">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              description={service.description}
            />
          ))}
        </GridItem>
      </Grid>
    </>
  );
}