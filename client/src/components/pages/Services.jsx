import { Box, Image, Grid, GridItem,Button } from "@chakra-ui/react";
import { useState } from "react";
//import serviceInfo from "../../serviceInfo";
import { facial } from "../../assets/index";
import "./pages.css";
import { useQuery, useMutation } from "@apollo/client";
//import { useMutation } from "@apollo/client";
import {GETSERVICES} from '../../utils/queries'
import { REMOVESERVICE } from "../../utils/mutations";
//import
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


const ServicesPage = () =>  {
  const [removeService] = useMutation(REMOVESERVICE)
  const {data}=  useQuery(GETSERVICES);
  const { isAuthenticated, user } = useAuth();

  const AdminTools =(serviceInfo) =>{
    if(isAuthenticated && user.isAdmin){
      return (
        <>
        <Link to="/update">
        <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Update</Button>
        </Link>
        <button onClick={()=>handleDeletion(serviceInfo)}>Remove</button>
      </>
      )
      
    }
  }
  
  async function handleDeletion(serviceInfo){
  if(confirm(`Woah there slugger! you almost deleted ${serviceInfo.title}, Are you sure you want to do that?.`)){
    const {data} =  await removeService(
       {variables: {
        "deleteServiceId": serviceInfo.id
      }}
    );
    if (!data) {
      throw new Error('something went wrong!');
    }
    if(alert('Service Deleted!')){}
    else{ window.location.reload()};
  }
}


  if(!data){
    return(
      <div>
        loading....
      </div>
    )
  }
  else {
  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={2}>
          <Image src={facial} alt="Deidre giving a facial" width="80%" ml={5} display="flex" alignItems="center" justifyContent="center"></Image>
        </GridItem>
        <GridItem colStart={3} colEnd={6} className="service-container">
          {data.getServices.map((service, index) => (
            <>
            <div>{AdminTools(service)}</div>
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
}

export default ServicesPage;