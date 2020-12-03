import React, {Fragment} from 'react';

const Button =(props)=>{
    return(
        <Fragment>
            <button onClick={props.action} className={props.style}>{props.name}</button>
        </Fragment>
    );
}
export default Button;