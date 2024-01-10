import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';


function CreateTicket() {

    const [title, setTitile] = useState('');
    const [description, setlastDescription] = useState('');


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        apiCall.post('/api/ticket/createTicket', {
            title: title,
            description: description
        }).then(() => {
            navigate('/TicketHome');
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='mb-2 mt-2'>
                        <Link to='/TicketHome'>
                            <button className='btn btn-primary'>View Ticket</button>
                        </Link>
                    </div>
                    <div className='bg-primary p-4 text-center'>
                        <h1>Create a TIcket</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Enter title: </label>
                            <input type='message' placeholder='Titile' className='form-control' onChange={(e) => setTitile(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Enter description: </label>
                            <input type='text' placeholder='Decription' className='form-control' onChange={(e) => setlastDescription(e.target.value)} />
                        </div>
                        <br />
                        <div className='d-grid'>
                            <input type='submit' value='Submit' className='btn btn-primary' />
                        </div>
                    </form>

                    <Link to='/TicketHome'>
                        <button className='btnback'>Back</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CreateTicket;