import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../securityAuth/AuthContext';
import { apiCall } from '../securityAuth/jwtAuthprovider';



function TicketHome() {

    const [apiData, setApiData] = useState([])

    const navigate = useNavigate();

    const AuthContext = useAuth();
    function getData() {
        apiCall.get('/api/ticket/all')
            .then((response) => {
                setApiData(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }


    function readTicket(id) {
        navigate(`/status/${id}`);
    }

    function deleteTicket(id) {
        navigate(`/delete/${id}`);
    }
    function assignTicket(id) {
        navigate(`/assign/${id}`);
    }
    function handlePriority(id, priority) {

        apiCall.put(`api/ticket/priority/${id}/${priority}`)
            .then(() => {
                navigate('/TicketHome');
            }).catch((err) => {
                console.log(err)
            });
    }


    useEffect(() => {
        getData();
    }, [])


    return (

        <div className='row'>
            <div className='col-md-12'>
                <div className='mb-2 mt-2'>
                <h1>Tickets</h1>
                    {AuthContext.role_admin() && <Link to='/CreateTicket'>
                        <button className='btn btn-primary'>Create New tickets</button>
                    </Link>}
                </div>

                <table className='table table-bordered'>
                    
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>DATEOFOPENED</th>
                            <th>ASSIGNED TO</th>
                            <th>STAGE</th>
                            <th>PRIORITY</th>
                            <th>STATUS</th>
                            {(AuthContext.role_admin() || AuthContext.role_lead()) && <th>DELETE</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((item) => {
                                return (

                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.dateOpened}</td>
                                        <td>{item.assigned_to}&nbsp;

                                            {(AuthContext.role_admin() || AuthContext.role_lead()) && <a className='btn btn-primary' onClick={() => assignTicket(item.id)}>Assign</a>}

                                        </td>
                                        <td>{item.stage}</td>
                                        <td>{item.priority}&nbsp;
                                            <div className="dropdown">
                                                {(AuthContext.role_admin() || AuthContext.role_lead()) && <button className="dropbtn"  >{item.priority}</button>}
                                                <div className="dropdown-content">
                                                    <a onClick={() => handlePriority(item.id, 'High')}>High</a>
                                                    <a onClick={() => handlePriority(item.id, 'Medium')}>Medium</a>
                                                    <a onClick={() => handlePriority(item.id, 'Low')}>Low</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>

                                            <a className='btn btn-info' onClick={() => readTicket(item.id)}>WorkNote</a>

                                        </td>
                                        <td>
                                            {(AuthContext.role_admin() || AuthContext.role_lead()) && <a className='btn btn-danger' onClick={() => deleteTicket(item.id)}>Delete</a>}
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}




export default TicketHome;