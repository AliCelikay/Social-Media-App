import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import './login.scss'

const Login = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    })
    const [err, setErr] = useState(null);

    //takes in change from the user input in register
    const handleChange = (e) =>{
        setInputs(prev => ({...prev, [e.target.name]:e.target.value}));
    };

    const { login } = useContext(AuthContext);

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            await login(inputs);
        }catch(err){
            setErr(err.response.data);
        }
    }
    
    return (
        <div className='login' >
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius voluptatum architecto itaque placeat nulla delectus iste fugiat quia consequuntur.
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            name="username"
                            onChange={(handleChange)}
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            name="password"
                            onChange={handleChange}
                        />
                        {/* if there is err show it here */}
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
