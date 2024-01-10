import { Link, useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../securityAuth/AuthContext';


function EditTicket() {
    
    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitile] = useState('');
    const [description, setlastDescription] = useState('');
    

   
    const AuthContext = useAuth();

    const handleUpdate = (e) => {
        e.preventDefault();
        apiCall.put(`/api/ticket/update/${id}`,{
            title: title,
            description: description
            
        }).then((respone) => {
           if(respone.status==200)
           {
            window.confirm('updated')
            navigate('/TicketHome');
           }
           else
           {
            window.confirm('not updated')
           }
        }).catch((err) => {
            console.log(err)
        });
    }

  return (
    <>
    <div className='row'>
        <div className='col-md-4'>
            <div className='mb-2 mt-2'>
               
            </div>
            <div className='bg-primary p-4 text-center'>
                <h1>Update Password</h1>
            </div>
            <form onSubmit={handleUpdate}>
                <div className='form-group'>
                    <label>Enter Titile: </label>
                    <input type='text' value={title} onChange={(e) => setTitile(e.target.value)} placeholder='Enter Titile' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Enter Decription: </label>
                    <input type='text' value={description} onChange={(e) => setlastDescription(e.target.value)} placeholder='Enter Decription' className='form-control' />
                </div>
                <br />
                <div className='d-grid'>
                    <input type='submit' value='Update' className='btn btn-primary' />
                </div>
                <br></br>
                <Link to='/profile'>
                    <button className='btn btn-primary'>Home</button>
                </Link>
            </form>
        </div>
    </div>
</>
  )
}

export default EditTicket;