import { useDispatch, useSelector } from 'react-redux';
import { deleteSnake, resetSnakes } from '../../app/features/snakes/snakeSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { Inactive } from '../Inactive';

export const Details = (props) => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const snake = props.snake;  
    let imgSrc = snake.image || 'images/snake_S.jpg';

    
    const handleClick = async(action) => {         
        action === 'delete' && await dispatch(deleteSnake({snake: snake, jwt: user.jwt}));
        dispatch(resetSnakes());  
    }
    
    
    return (
            <div className='details'>                
                <div className='details_row'>
                    <div className='fact'>
                        <div className='fact_title'>Name:</div> {snake.name}
                    </div>
                    <div  className='fact'>
                    <div className='fact_title'>Spezies:</div> {snake.species}
                    </div>
                    <div  className='fact'>
                    <div className='fact_title'>Geschlecht:</div> {snake.sex}
                    </div>
                </div><div  className='details_row'>
                    <div  className='fact'>
                    <div className='fact_title'>Geburtsjahr:</div> {snake.birthYear}
                    </div>
                    <div  className='fact'>
                    <div className='fact_title'>aktuelles Gewicht:</div> {snake.weight}g
                    </div>
                    <div  className='fact last'>
                    <div className='fact_title'>aktuelle Größe:</div> {snake.size}cm
                    </div>
                </div>
                <div className='fact_image'>
                    <img src={imgSrc} alt='snake' />                
                </div>
                <div className='details_buttons'>
                    <button 
                        className='btn_del_edit' 
                        onClick={() => handleClick('edit')}
                    >
                            <FontAwesomeIcon icon={faPen}/>
                    </button>
                    <button 
                        className='btn_del_edit' 
                        onClick={() => handleClick('delete')}                        
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>  
                {
                snake.id === '' && (
                    <Inactive />
                )
            }                  
            </div>
        );    
}


