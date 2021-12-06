import { LoginForm } from "./Forms/LoginForm"

let imgSrc = 'images/snake.jpg';

export const LoginPage = (props) => {    
    
    return (
        <div className='LoginPage'>
            <div className='LoginHeadline'>
                SnakePlanner
            </div>
            <div className='LoginWrapper'>                
                <div className='LoginImg'>
                    <img src={imgSrc} alt='Snake' />
                </div>
                <LoginForm 
                    handleLogin={props.handleLogin} 
                    setUser={props.setUser}

                />  
            </div>
        </div>
        
    )
}