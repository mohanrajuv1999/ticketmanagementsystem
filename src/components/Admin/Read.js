import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../securityAuth/AuthContext';
import { apiCall } from '../securityAuth/jwtAuthprovider';

function Read() {

    const [apiData, setApiData] = useState([]);

    const AuthContext = useAuth();

    function getData() {
        apiCall.get('api/admin/users')
            .then((response) => {
                setApiData(response.data);
                console.log(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }

    function handleDelete(id) {
        apiCall.delete(`/api/admin/delete/${id}`)
            .then(() => {
                getData();
            }).catch((err) => {
                console.log(err)
            });
    }

    function setDataToStorage(id, firstname, lastname, email) {
        localStorage.setItem('id', id);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('email', email);

    }

    useEffect(() => {
        getData();
    }, [])


    return (


        <><div className="container">
            <h2>Users Details</h2>
           
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>ROLES</th>
                        {!AuthContext.role_lead() &&<th>EDIT</th>}
                        {!AuthContext.role_lead() && <th>DELETE</th>}

                    </tr>
                </thead>
                <tbody>
                    
                    {apiData.map((item) => {
                        return (


                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstname + " " + item.lastname}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>

                                <td>
                                   <Link to='/edit'>
                                        {!AuthContext.role_lead()  &&  <button className='btn btn-primary' onClick={() => setDataToStorage(item.id, item.firstname, item.lastname, item.email, item.roles, item.username)}>Edit</button>}
                                    </Link>
                                </td>
                                <td>
                                {!AuthContext.role_lead() &&<button className='btn btn-danger' onClick={() => { if (window.confirm('Are You Sure To Delete Data ??')) { handleDelete(item.id); } } }>Delete</button>}
                                </td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>


        </div>
        <div>
                
                <Link to='/Create'>
                    <button className='btncreate'>Create New User</button>
                </Link>
            </div></>


    )
}

export default Read;