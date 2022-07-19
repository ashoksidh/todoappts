import React ,{useState}  from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
import axios from './api/axios';


const LOGIN_URL = '/api/v1/auth/login';

function Login() {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [userError,setUserError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const navigate =useNavigate();
   

    const handleSubmit = async (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
       if(!user){
           setUserError("Please add your username")
           return;
       } else if (!pwd){
       setPwdError("Please add your password")
       return;
       }
          
   
       try {
        
        const response = await axios.post(
            LOGIN_URL,
            { email :user, password:pwd },
            {
              headers: { "Content-Type": "application/json" },
             
            }
          );
          localStorage.setItem("token",response.data.token.accessToken);
          navigate('/todo');
          
        setUser('');
        setPwd('');
        navigate('/todo')
    } catch (err) { 
        

    }
 }
   

  return (
    
    <div>
     
    <div className="container">
    <div className="top">
       <div><h3>Todos</h3></div>
       </div>
        <div className="content" >
            <div className="topic">
                <p ><strong >Sign in</strong></p>
                <div id="main" className="divcenter">
                    <input type="email"
                            id="username"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                             placeholder="Username"
                             
                             />
                             {userError && (<p>{userError}</p>)}
                    <input  type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                             placeholder="Password" />
                              {pwdError && (<p>{pwdError}</p>)}
                    <div>
                        <button id="butclasston" onClick={handleSubmit}><b>Sign in</b></button>
                    </div>
                    <div className="direct">
                      <NavLink to={"/register"}>New here? Register now</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Login