// import "./counter.css"
import React, {useState} from "react";

function Counter() {
    const [value, setValue] = useState(0);
    return (
        <div>
            <button onClick={() => setValue(cur => cur-1)}>-</button>
            {value}
            <button onClick={() => setValue(cur => cur+1)}>+</button>

        </div>
    )
}

export default Counter;