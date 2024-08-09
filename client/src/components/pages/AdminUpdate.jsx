import { useState } from 'react';
import "./pages.css";
import {QUERY_SERVICE} from '../../utils/queries';
import { useQuery,useMutation } from '@apollo/client';

function AdminUpdate(){

// grabs the service we will update (Query)
// places the grabbed service in the old form (Mapping)
    const {data} =useQuery(QUERY_SERVICE)

//The right form will read its input information (Event Handler)
//the service will update and redirect to services page (Mutation)
    return(
        <>
        <div>
        <h1>Welcome to the Update page</h1>
        <div>Here will be the old title</div>
        <div>Here will be the old price</div>
        <div>Here will be the old description</div>
        </div>

        <form>
        <h1>This is the Updating box</h1>
        <input type="text" name="title" placeholder='Enter the new title for service'></input>
        <input type="number" name="price" placeholder='Enter the new price for service'></input>
        <input type="text" name="description" placeholder='Enter a new description for service'></input>
        <button> Submit </button>
        </form>

        </>
    )
}

export default AdminUpdate;