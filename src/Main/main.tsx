import style from './main.module.css'
import Card from './Card/card'

export default function Main() {
    return(
        <div className={style.container}>
            <Card />
        </div>
    )
}