import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo, IRootState } from '../../redux/redux';
import style from './cards.module.css'

export default function Card() {
    const todos = useSelector((state: IRootState) => state.todo.todos);
    const filter = useSelector((state: IRootState) => state.todo.filterBy);
    const dispatch = useDispatch();

    const filteredTodo = () => {
        if(filter === 'COMPLETED') {
          return todos.filter(todo => todo.completed);
        }
        if(filter === 'NOT_COMPLETED') {
          return todos.filter(todo => !todo.completed)
        }
        return todos;
      }
      
    return (
        <div className={style.container}>
            {filteredTodo().map((todo) => (
              <div key={todo.id}>
                <div>{todo.text}</div>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>Remove</button>
                <input checked={todo.completed} type='checkbox' onChange={() => dispatch(toggleTodo(todo))}/>
              </div>
            ))}
        </div>
    )
}