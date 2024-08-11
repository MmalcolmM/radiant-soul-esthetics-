import { Box, Image, Grid, GridItem, Button, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import serviceInfo from "../../serviceInfo";
import { facial } from "../../assets/index";
import "./pages.css";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_SERVICES } from '../../utils/queries';
import { useAuth } from '../../utils/auth';
import { Link } from "react-router-dom";

function ServiceCard({ title, price, description }) {
  return (
    <Box className="serviceCardContainer">
      <Box className="serviceCard" display="block">
        <div className="serviceCardHeader">
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="serviceCardBody">
          <p className="price">{price}</p>
          <p className="description">{description}</p>
        </div>
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  const { loading, error, data } = useQuery(QUERY_ALL_SERVICES);
  const { isAuthenticated, user } = useAuth();

  const AdminTools = () => {
    if (isAuthenticated && user.isAdmin) {
      return (
        <>
          <Link to="/update">
            <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Update</Button>
          </Link>
          <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Remove</Button>
        </>
      )
    }
    return null;
  }

  // Add this to log the data
  console.log('Fetched data:', data);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={2}>
          <Image src={facial} alt="Deidre giving a facial" width="80%" ml={5} display="flex" alignItems="center" justifyContent="center" />
        </GridItem>
        <GridItem colStart={3} colEnd={6} className="service-container">
          {data?.getServices?.map((service, index) => (
            <div key={index}>
              {AdminTools()}
              <ServiceCard
                title={service.title}
                price={service.price}
                description={service.description}
              />
            </div>
          ))}
        </GridItem>
      </Grid>
    </>
  );
}
