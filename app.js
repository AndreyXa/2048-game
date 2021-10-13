document.addEventListener("DOMContentLoaded", function (event) {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let square;
    const width = 4;
    let squares = [];
    let score = 0;


    const createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    };


    const generate = () => {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generate();
    };


    const moveRight = () => {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[1].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filtreRow = row.filter(num => num);
                let missing = 4 - filtreRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filtreRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];

            }
        }
    };

    const moveLeft = () => {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[1].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filtreRow = row.filter(num => num);
                let missing = 4 - filtreRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filtreRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];

            }
        }
    };

    const moveDown = () => {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filterColumn = column.filter(num => num);
            let missing = 4 - filterColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filterColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

        }
    };

    const moveUp = () => {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (width * 2)].innerHTML;
            let totalFour = squares[i + (width * 3)].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filterColumn = column.filter(num => num);
            let missing = 4 - filterColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filterColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

        }
    };

    const combineColumn = () => {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinerTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinerTotal;
                squares[i + width].innerHTML = 0;
                score += combinerTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    };

    const combineRow = () => {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinerTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinerTotal;
                squares[i + 1].innerHTML = 0;
                score += combinerTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    };

    const control = (e) => {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    };

    document.addEventListener('keyup', control);

    const keyRight = () => {
        moveRight();
        combineRow();
        moveRight();
        generate();
    };

    const keyLeft = () => {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    };

    const keyDown = () => {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    };


    const keyUp = () => {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    };

    const checkForWin = () => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You win";
                document.removeEventListener('keyup', control);
            }
        }
    };


    const checkForGameOver = () => {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You Lose!';
            document.removeEventListener('keyup', control);
        }
    };


    createBoard();
});
