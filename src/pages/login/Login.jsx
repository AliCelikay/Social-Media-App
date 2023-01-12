import './login.scss'

const Login = () => {
    return (
        <div className='login' >
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius voluptatum architecto itaque placeat nulla delectus iste fugiat quia consequuntur at minima aliquam qui doloremque odit, laborum a sapiente id! Dolor?
                    </p>
                    <span>Don't have an account?</span>
                    <button>Register</button>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
