import React from 'react';

export default function Square(props) {

    return (
        <div 
            className={"square "}
            onClick={() => props.clickSquare()}>
            {props.value}
        </div>
    )
}

// Square is a component
// When clicked, it adds an X or an O, depending on the player's turn
