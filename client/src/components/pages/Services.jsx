import { Box, Image, Grid, GridItem, Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
// import serviceInfo from "../../serviceInfo";
import { facial } from "../../assets/index";
import "./pages.css";

import { useQuery, useMutation } from "@apollo/client";
import {GETSERVICES} from '../../utils/queries'
import { REMOVESERVICE } from "../../utils/mutations";
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



const ServicesPage = (props) =>  {

  const [removeService] = useMutation(REMOVESERVICE)
  const {loading,data}=  useQuery(GETSERVICES);
  console.log(data);
  const { isAuthenticated, user } = useAuth();
  const AdminTools =(serviceInfo) =>{
  // const { loading, data, error } = useQuery(GETSERVICES);
    if(isAuthenticated && user.isAdmin){
      return (
        <>
        <Link to={{ pathname: `/update/${serviceInfo._id}`}} >
        <Button size='xs' bg="gray" variant='ghost' m={5} b={0}>Update</Button>
        </Link>
        <button onClick={()=>handleDeletion(serviceInfo)}>Remove</button>
      </>

      )
    }
    return null;
  }

  
  async function handleDeletion(serviceInfo){
    console.log(serviceInfo._id);
  if(confirm(`You almost deleted ${serviceInfo.title}, Are you sure you want to do that?.`)){
    const {data} =  await removeService(
       {variables: {
        "deleteServiceId": serviceInfo._id
      }}
    );
    if (!data) {
      throw new Error('something went wrong!');
    }
    if(alert('Service Deleted!')){}
    else{ window.location.reload()};
  }
  }

  if (loading) return <Spinner size="xl" />;
  //if (error) return <Text color="red.500">Error: {error.message}</Text>;

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
          <Image src={facial} alt="Deidre giving a facial" width="80%" ml={5} display="flex" alignItems="center" justifyContent="center" />
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

