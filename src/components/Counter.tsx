import {useState} from "react";
import style from './Counter.module.scss'

export const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)} className={style.button}>
                increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                decrement
            </button>
        </div>
    )
}
