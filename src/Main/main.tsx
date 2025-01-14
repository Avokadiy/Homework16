import style from './main.module.css'
import Card from './Card/card'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../redux/redux';

export default function Main() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (text) {
            dispatch(addTodo(text));
            setText('');
        }
    }

    return(
        <div className={style.container}>
            <div className={style.textarea}>
                <h1>To-Do List</h1>
                <p>Add a new TODO</p>
                <form onSubmit={handleClick}>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} name="textarea" id="textarea" placeholder='Write your plan'></textarea>
                    <button type='submit'>Add To-Do</button>
                </form>
                <button>Show all</button>
                <button>Show completed</button>
                <button>Show in progress</button>
            </div>
            <Card />
        </div>
    )
}