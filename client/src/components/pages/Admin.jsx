import { useState } from 'react';
import "./pages.css";
import {ADDSERVICE} from '../../utils/mutations';
import { useMutation } from '@apollo/client';



function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
 const [addService,{error,data}] = useMutation(ADDSERVICE);



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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      setErrorMessage('please finish filling out the form!');
      return;
    }
    else{
      try{

        const priceAsNumber=parseFloat(price);
        const {data} = await addService( 
          {variables: {title: title, description: description, price: priceAsNumber}},
         );
        console.log(data);
        alert(`${title} added to services!`);
      }
      catch (err){
        console.log(err);
      }
      
    }
   

    setTitle('');
    setDescription('');
    setPrice(0);
    setErrorMessage('');
  };

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Add Service</h1>
      <div>
        <form className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "500px",
            width: "100%",
            margin: "0 auto"
          }} 
          onSubmit={handleFormSubmit}>
          <input
            value={title}
            name="title"
            onChange={handleInputChange}
            type="text"
            placeholder="title"
            className="input form-control"
          />
          <textarea
            value={description}
            name="description"
            onChange={handleInputChange}
            type="text"
            placeholder="description"
            className="input form-control"
          />
          <input
            value={price}
            name="price"
            onChange={handleInputChange}
            type="text"
            placeholder="price"
            className="input form-control"
          />
          <button className="submit" type="submit">Submit</button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text alert alert-danger" role="alert">{errorMessage}</p>
          </div>
        )}

      </div>
    </>
  );
}

export default Admin;
