import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, useAuth } from '../securityAuth/AuthContext';


function Headers() {


    const AuthContext = useAuth();
    const isAuthenticated = AuthContext.isAuthenticated
    const role_admin = AuthContext.role_admin();
    const role_lead = AuthContext.role_lead();

    const navigate = useNavigate();

    function logout() {
        AuthContext.logout()
            .then(() => {
                navigate('/TicketHome');
            }).catch((err) => {
                console.log(err)
            });
    }
   
    return (

        <div className="w3-bar w3-green">
            <Link className='w3-bar-item w3-button'>WELCOME</Link>
            {isAuthenticated && <Link to='/TicketHome' className='w3-bar-item w3-button'>TicketHome</Link>}

            {isAuthenticated && (role_admin || role_lead) && <Link to='/Read' className='w3-bar-item w3-button' >Users</Link>}

            {isAuthenticated &&  <a style={{ float: 'right' }} className='w3-bar-item w3-button' onClick={() => logout()}>logout</a>}

            

            {isAuthenticated &&<Link to='/profile' className='w3-bar-item w3-button'  style={{ float: 'right' }}>{AuthContext.usernamelog}</Link>}

        </div>

    )
}

export default Headers