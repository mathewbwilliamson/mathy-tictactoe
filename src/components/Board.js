import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            boardWidth: 6,
            boardHeight: 2,
            playersTurn: 'X',
        }
    }

    componentDidMount() {
        const newSquares = this.state.boardWidth * this.state.boardHeight;
        this.setState({squares: Array(newSquares).fill(null)})
    }

    changePlayer() {
        if (this.state.playersTurn === 'X') {
            this.setState({playersTurn: 'O'})
        } else {
            this.setState({playersTurn: 'X'})
        }
    }

    makeRow( seedForValue ) {
        const locationForSquares = seedForValue * this.state.boardWidth;
        let newRow = [];
        for (let i=0; i < this.state.boardWidth; i++ ) {
            newRow.push(<Square 
                classN={seedForValue} 
                clickSquare={() => this.clickSquareFunction(locationForSquares+i)}
                key={i+this.state.boardWidth}
                value={this.state.squares[locationForSquares+i]}
                 />)
        }
        return newRow;
    }

    makeColumns() {
        let newColumn = [];
        for (let i=0; i < this.state.boardHeight; i++ ) {
            newColumn.push(this.makeRow(i))
        }
        return newColumn;
    }

    makeRowGrid() {
        return { 'gridTemplateColumns': `repeat(${this.state.boardWidth}, 60px)`, }
    }

    clickSquareFunction(squareLocation) {
        const newSquares = [...this.state.squares];
        newSquares[squareLocation] = this.state.playersTurn;

        this.setState({squares: newSquares})
        this.changePlayer();
        console.log(this.state.playersTurn)
    }

    render() {
        const styles = this.makeRowGrid(this.state.boardWidth);
        const sizeOfBoard = this.state.boardHeight * this.state.boardWidth;

        return (
            <div className='board' style={ styles }>
                {this.makeColumns()}
                <button 
                    onClick={e => this.setState({squares: Array(sizeOfBoard).fill(null)})}
                    value='Start Over'>Start Over</button>
            </div>
        )
    }
}

// Square is a component
// When clicked, it adds an X or an O, depending on the player's turn
