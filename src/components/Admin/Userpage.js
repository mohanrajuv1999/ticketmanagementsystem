import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../securityAuth/AuthContext';
import { apiCall } from '../securityAuth/jwtAuthprovider';

function Userpage() {

    const [apiData, setApiData] = useState([]);

    const AuthContext = useAuth();

    function getData() {
        apiCall.get(`api/admin/get/${AuthContext.usernamelog}`)
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


    return (


        <div className="boder1" >
        <div className="row">
            <div className="column1" style={{marginLeft:'10px'}}>
                         <h1>User Details</h1>
                        <th>USER ID : {apiData.id}</th><br></br>
                        <th>NAME : {apiData.firstname+" "+apiData.lastname}</th><br></br>
                        <th>ROLE : {apiData.role}</th><br></br>
                        <th>EMAIL : {apiData.email}</th><br></br>
                        <th>  <Link to='/Password' >
                    <td>PASSWORD RESET</td>
                          </Link></th><br></br>
        </div>
        </div>
                
               
            </div>


    )
}

export default Userpage;