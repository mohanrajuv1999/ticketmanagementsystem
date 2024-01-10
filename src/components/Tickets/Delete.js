import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';



 function Delete(){
 
    const { id } = useParams()

    const navigate = useNavigate();

    function handleDelete() {
        apiCall.delete(`/api/ticket/delete/${id}`)
        .then(() => {
            navigate('/TicketHome');
        }).catch((err) => {
            console.log(err)
        });
    }

   
    
    return (
        <><h1>Are confirm delete</h1><div className='mb-2 mt-2'>
       
        <Link to='/TicketHome'>
            <button className='btn btn-primary'>Back</button>
        </Link>
        &nbsp;
        
        <button className='btn btn-danger' onClick={() => { handleDelete()} }>Delete</button>
        
    </div></>
     
    )
    
  
}

export default Delete;