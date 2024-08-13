import { useState, useContext } from 'react';
import "./pages.css";

import {QUERY_SERVICES} from '../../utils/queries';

import { useQuery,useMutation } from '@apollo/client';
import { UPDATESERVICE } from '../../utils/mutations';
// import {QUERY_SERVICES} from '../../utils/queries';




const AdminUpdate = () => {
    const locate=(window.location.pathname);
     const id= locate.substring(locate.indexOf('/',1)+1);
    const  state  = id;
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [updateService]=useMutation(UPDATESERVICE);

    const {loading,data} =useQuery(QUERY_SERVICES, {
        variables: {"id": state}
    }) 
    console.log(data);

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        if (inputType === 'title') {
          setTitle(inputValue);
        } else if (inputType === 'description') {
          setDescription(inputValue);
        } else {
          setPrice(inputValue);
        }
    };

    async function handleUpdate(){

       
        
    if (!title || !description || !price) {
        alert('please finish filling out the form!');
        return;
      }
      else{
 
        const pricenum=parseFloat(price);

        const {data} = await updateService(
            {variables: {
                "updateServiceId": state,
                "name": title,
                "description": description,
                "price": pricenum
              } }
        )

        if(alert(`${title} Has been updated to services!`)){}
        else{ window.location.reload()};
        
        }
    }

   

    if (!data){
        return (<><div>loading </div></>)
    }

    //The right form will read its input information (Event Handler)
    //the service will update and redirect to services page (Mutation)
    else{
        const service= data.getService;

        return(
            <>
            <h1>Welcome to the Update page</h1>

            <div> 
                <div> To the left is the old information</div>
                <div>{service.title}</div>
                <div>{service.price}</div>
                <div>{service.description}</div>
            </div>
    
            <form>
            <h1>Update new information here</h1>
            <input 
                type="text"  
                value={title} 
                name="title"
                placeholder='Enter the new title for service'
                onChange={handleInputChange}
             />
            <input 
                type="number"
                name="price" 
                value={price}
                onChange={handleInputChange}


                placeholder='Enter the new price for service'
             />
            <input 
            type="text" 
            name="description" 
            placeholder='Enter a new description for service'
            value={description}
            onChange={handleInputChange}
            />
         
            </form>
            <button id='update-button' type="submit" onClick={handleUpdate}> Submit </button>
            </>
        )
    }

}

export default AdminUpdate;