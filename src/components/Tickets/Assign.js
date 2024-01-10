import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';




function Assign() {

    const [apiData, setApiData] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    function getData() {
        apiCall.get('api/admin/users')
            .then((response) => {
                setApiData(response.data);
                console.log(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        getData();
    }, [])

    function handleAssign(email)
    {
        apiCall.put(`api/ticket/assign/${id}/${email}`)
        .then(() => {
            navigate('/TicketHome');
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <><h1>Welcome</h1>

            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">

                    {apiData.map((item) => {
                        return (

                            <div>
                                <a className='btn btn-primary' onClick={() => handleAssign(item.email)}>{item.email}</a>
                            </div>

                        )
                    }
                    )
                    }

                </div>
            </div>
            <div className='mb-2 mt-2'>


                <Link to='/TicketHome'>
                    <button className='btn btn-primary'>Back</button>
                </Link>
               

            </div></>
    )

}
export default Assign;