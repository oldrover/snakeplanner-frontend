import { useState } from "react";


export const LoginForm = (props) => {

    const login = {
        'email': '',
        'password': ''
    }      
    
    let jwt = '';

    const [loginData, setLoginData] = useState(login);
    const [showSignUp, setShowSignUp] = useState(false);

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'               
         },
        body: JSON.stringify(loginData)
    };    

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleShowClick = (e) => {
        e.target.value === 'login' ? setShowSignUp(false) : setShowSignUp(true);
    }

    const loginRequest = () => {
        fetch(`/api/users/login`, requestOptions)  
            .then(response => {                  
                jwt = response.headers.get('Authentication');              
                return response.json();  
            })    
            .then(data => {                
                props.setUser({
                    id: data.id,
                    name: data.email,
                    snakes: [],
                    image: '',
                    jwt:jwt  
                })
                props.handleLogin();
            })                                      
            .catch(error => alert('Credential Error please try again'));
    }

    const signUpRequest = () => {
        fetch(`/api/users`, requestOptions)  
            .then(response => { 
                return response.json();  
            })    
            .then(data => {
                alert(data);
                setShowSignUp(false);
            })                                     
            .catch(error => alert('SignUp Error please try again'));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        showSignUp ? signUpRequest() : loginRequest();
    }

    return (
        <div className='LoginForm'>            
            <div className='LoginFormHeader'>
                <div className='LoginFormHeaderButtons'>
                    <button
                        value='login'
                        onClick={handleShowClick}
                        className={(!showSignUp && 'ActiveButton') || ''}
                    >
                    Einloggen
                    </button>
                        
                    <button
                        value='signup'
                        onClick={handleShowClick}
                        className={(showSignUp && 'ActiveButton') || ''}
                    >
                    Anmelden
                    </button>
                </div>
            </div>
            <div className='LoginFormBody'>
                <form className='LoginFormForm' onSubmit={handleSubmit}>
                    
                    <input 
                        className='Login'
                        id='email'
                        name='email' 
                        size='50'
                        autoFocus
                        placeholder='Email-Adresse'
                        value={loginData.email}
                        onChange={handleChange}
                        
                    />  
                    <br />                  
                    <input
                        className=' Login'
                        type='password' 
                        id='password' 
                        name='password'
                        size='50'
                        placeholder='Passwort'
                        value={loginData.password}
                        onChange={handleChange}

                    />
                    <br />
                    { showSignUp && (                    
                    
                    <input 
                        className='Login'
                        type='password' 
                        id='confirm' 
                        name='confirm'
                        size='50'
                        placeholder='Passwort wiederholen' 
                    />)}
                    <div className='ButtonContainer'>
                        <button type="submit" className='Login'>
                            {(showSignUp && 'Anmelden') || 'Einloggen'}                        
                        </button> 
                    </div> 
                </form>
            </div>            
        </div>
    )

}