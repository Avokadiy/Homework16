import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, doneTodo, IRootState } from '../../redux/redux';
import style from './card.module.css'

export default function Card() {
    const todos = useSelector((state: IRootState) => state.todo.todos);
    const dispatch = useDispatch();
    
    return (
        <div className={style.container}>
            {todos && todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>Remove</button>
                    <input type="checkbox" onClick={() => dispatch(doneTodo(todo.id))}/>
                </div>
            ))}
        </div>
    )
}