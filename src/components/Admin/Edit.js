import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';
import { useAuth } from '../securityAuth/AuthContext';
import Read from './Read';

function Edit() {

    const [id, setId] = useState(0);
    const [firstname, setfirstName] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRoles] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const AuthContext = useAuth();

    useEffect(() => {
      setId(localStorage.getItem('id'));
      setfirstName(localStorage.getItem('firstname'));
      setlastname(localStorage.getItem('lastname'));
      setRoles(localStorage.getItem('roles'));
      setEmail(localStorage.getItem('email'));
      setUsername(localStorage.getItem('username'));
    }, [])
    
    const handleUpdate = (e) => {
        e.preventDefault();
        apiCall.put(`/api/admin/update/${id}`,{
             firstame: firstname,
            lastname: lastname,
            email: email,
            role:role,
            username:username
        }).then(() => {
            navigate('/Read');
        }).catch((err) => {
            console.log(err)
        });
    }

  return (
    <>
    <div className='row'>
        <div className='col-md-4'>
            <div className='mb-2 mt-2'>
                <Link to='/'>
                    <button className='btn btn-primary'>Read Data</button>
                </Link>
            </div>
            <div className='bg-primary p-4 text-center'>
                <h1>Update Data</h1>
            </div>
            {AuthContext.role_admin && <form onSubmit={handleUpdate}>
                <div className='form-group'>
                    <label>Enter firstname: </label>
                    <input type='text' value={firstname} onChange={(e) => setfirstName(e.target.value)} placeholder='firstname' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Enter lastname: </label>
                    <input type='text' value={lastname} onChange={(e) => setlastname(e.target.value)} placeholder='lastname' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Enter Email: </label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className='form-control' />
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
                    <label>Enter Username: </label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='form-control' />
                </div>
                <br />
                <div className='d-grid'>
                    <input type='submit' value='Update' className='btn btn-primary' />
                </div>
            </form>}
        </div>
    </div>
</>
  )
}

export default Edit;