import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../securityAuth/AuthContext';
import { apiCall } from '../securityAuth/jwtAuthprovider';


function Create() {

    const [firstname, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRoles] = useState('');
    const [password, setpassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const AuthContext = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        apiCall.post('api/admin/createUser', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
            password: password,
            username: username
        }).then((respone) => {
            console.log(respone.data)
            navigate('/read');
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='mb-2 mt-2'>
                        <Link to='/Read'>
                            <button className='btn btn-primary'>Read Data</button>
                        </Link>
                    </div>
                    <div className='bg-primary p-4 text-center'>
                        <h1>Create Data</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='Createruser-form'>
                        <div className='form-group'>
                            <label>Enter firstname: </label>
                            <input type='text' placeholder='firstname' className='form-control' onChange={(e) => setfirstName(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Enter lastname: </label>
                            <input type='text' placeholder='lastname' className='form-control' onChange={(e) => setlastName(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Enter Email: </label><br></br>
                            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Select Role: </label><br></br>
                            <select name='role' value={role} onChange={(e) => setRoles(e.target.value)} >
                                <option  >Select</option>
                                {AuthContext.role_admin() && <option value="ADMIN" >ADMIN</option>}
                                
                                <option value="LEAD" >LEAD</option>
                                <option value="USER" >USER</option>

                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Enter Password: </label><br></br>
                            <input type='password' placeholder='Password' onChange={(e) => setpassword(e.target.value)} className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Enter Username: </label>
                            <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='form-control' />
                        </div>
                        <br />
                        <div className='d-grid'>

                            <input type='submit' value='Submit' className='btn btn-success' />

                        </div>
                    </form>

                    <Link to='/read'>
                        <button className='btnback'>Back</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Create;