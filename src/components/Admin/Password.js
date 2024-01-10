import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';
import { useAuth } from '../securityAuth/AuthContext';


function Password() {
    
  //  const { id } = useParams()

    const [oldPassword, setOldpassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPasswoord, setConfirmPassword] = useState('');
    

    const navigate = useNavigate();
    const AuthContext = useAuth();

    const handleUpdate = (e) => {
        e.preventDefault();
        apiCall.put(`/api/admin/get/updatepassword/${AuthContext.usernamelog}`,{
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPasswoord: confirmPasswoord,
            
        }).then((respone) => {
           if(respone.status==200)
           {
            window.confirm('updated')
            navigate('/profile');
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
                    <label>Enter oldPassword: </label>
                    <input type='password' value={oldPassword} onChange={(e) => setOldpassword(e.target.value)} placeholder='Oldpassword' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Enter NewPassword: </label>
                    <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='NewPassword' className='form-control' />
                </div>
                <div className='form-group'>
                    <label>Enter Confirm Password: </label>
                    <input type='password' value={confirmPasswoord} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='ConfirmPassowrd' className='form-control' />
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

export default Password;