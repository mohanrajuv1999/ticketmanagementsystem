import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "./securityAuth/AuthContext";



function Home(){

    const AuthContext = useAuth();
    return(
            <><h1>Welcome</h1><div className='mb-2 mt-2'>
            <Link to='/Create'>
                {!AuthContext.role_admin() && <button className='btn btn-primary'>Create New User</button>}
                
            </Link>
            <h1>  </h1>
            <Link to='/Read'>
                <button className='btn btn-primary'>View Users</button>
            </Link>
            <h1> </h1>
            <Link to='/TicketHome'>
                <button className='btn btn-primary'>Tickets</button>
            </Link>
        </div></>
    )
    
}
export default Home;