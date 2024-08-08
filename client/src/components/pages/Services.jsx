import { Box, Image, Grid, GridItem,Button } from "@chakra-ui/react";
import { useState } from "react";
import serviceInfo from "../../serviceInfo";
import { facial } from "../../assets/index";
import "./pages.css";
import { useQuery } from "@apollo/client";
//import { useMutation } from "@apollo/client";
import {QUERY_ALL_SERVICES} from '../../utils/queries'
import {useAuth} from '../../utils/auth';
import { Link, useNavigate } from "react-router-dom";



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
  const {data}=  useQuery(QUERY_ALL_SERVICES);
  const { isAuthenticated, user } = useAuth();



  const AdminTools =() =>{
    if(isAuthenticated && user.isAdmin){
      return (
        <>
        <Link to="/update">
        <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Update</Button>
        </Link>
        <button>Remove</button>
      </>
      )
      
    }
  }

  const Admin= AdminTools();


  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={2}>
          <Image src={facial} alt="Deidre giving a facial" width="80%" ml={5} display="flex" alignItems="center" justifyContent="center"></Image>
        </GridItem>
        <GridItem colStart={3} colEnd={6} className="service-container">
          {data.getServices.map((service, index) => (
            <>
            <div>{Admin}</div>
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              description={service.description}
            />
            </>
          ))}
        </GridItem>
      </Grid>
    </>
  );
}