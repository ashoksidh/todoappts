import React, {  useState } from "react";
import {useNavigate,NavLink} from 'react-router-dom'
import axios from "./api/axios";


const REGISTER_URL = '/api/v1/auth/register';

const Register = () => {
   

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    const navigate =useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault('');
       if(pwd === matchPwd){
            alert("Registration Success");
           
        }else if( pwd !== matchPwd){
            alert("Passwords does not match")
        }
        else{
            alert("Registration failed")
        }
          
   
        
        try {
            const response = await axios.post(
                REGISTER_URL,
                { email :user, password:pwd },
                {
                  headers: { "Content-Type": "application/json" },
                 
                }
              );
              localStorage.setItem("token",response.data.token.accessToken);
              navigate('/');

           
            setUser('');
            setPwd('');
            setMatchPwd('');

        } catch (err) {
           console.log(err);
   
        }
    }

    return (
        <>
           
                <section>
                     <div className="top">
       <div><h3>Todos</h3></div>
       </div>
                    <form onSubmit={handleSubmit}>
                    <div className="container">
        <div className="content" >
            <div className="topic">
                <p><strong>Register for free</strong></p>
                <div id="main"  className="divcenter">
                    <input  type="email"
                            id="username"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                             placeholder="Username" />

                    <input type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            placeholder="Password" />

                    <input  type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                             placeholder="Confirm Password" />

                    <div>
                        <button id="butclasston" type="submit"><b>Register</b></button>
                    </div>
                    <div className="direct">
                       <NavLink  to={"/"}>Have an account?Login now </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
                   </form>
                  
                </section>
            
        </>
    )
}

export default Register
