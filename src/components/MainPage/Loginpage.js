import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../securityAuth/AuthContext';


function Loginpage() {

    const AuthContext = useAuth();
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (await AuthContext.login(username, password)) {
            navigate('/TicketHome');
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="login-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h3>LOGIN</h3>
                            <p>Please enter your credentials to login.</p>
                        </div>
                    </div>
                   
                        <input type="text" placeholder="username" onChange={(e) => setusername(e.target.value)} />
                        <input type="password" placeholder="password" onChange={(e) => setpassword(e.target.value)} />
                        <button>login</button>
                        
                        <p className="message">Not registered? <a href="#">Create an account</a></p>
                    
                </div>
            </div>
            

        </form>

    )
}
export default Loginpage;

