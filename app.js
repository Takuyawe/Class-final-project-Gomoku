const grid = document.querySelector('.grid')
const displayWinner = document.querySelector('.display')
const width = 15
const squares = []

let currentPlayer = 0

function createBoard () {
    for (let i = 0; i < width * width - 1; i++) {
        const div = document.createElement('div')
        div.classList.add('square')
        grid.appendChild(div)
        squares.push(div)      
    }

    for(let i = 0; i < squares.length; i++) {
        squares[i].setAttribute('data-id', i);
    }
}

document.addEventListener('click', e => {
    id = Number(e.target.dataset.id)
    if(currentPlayer === 0) {
        blackTurn(id)
    } else if (currentPlayer === 1) {
        whiteTurn(id)
    }
})

function blackTurn(id) {
    if(squares[id].firstChild) {
        if(!squares[id].firstChild.classList.contains('black') && !squares[id].firstChild.classList.contains('white'))  
        alert('Already taken!')

    } else putBlack(id)
}

function putBlack(id) {
    const div = document.createElement('div')
    div.classList.add('black')
    squares[id].appendChild(div)
    currentPlayer = 1
    checkForWin(id)
}

function whiteTurn(id) {
    if(squares[id].firstChild) {
        if(!squares[id].firstChild.classList.contains('black') && !squares[id].firstChild.classList.contains('white')) 
        alert('Already taken!')

    } else putWhite(id)
}

function putWhite(id) {
    const div = document.createElement('div')
    div.classList.add('white')
    squares[id].appendChild(div)
    currentPlayer = 0
    checkForWin(id)
}


//check for win
function checkForWin (id) {
    const winCombinations = [
        [id, id + 1, id + 2, id + 3, id + 4],
        [id, id - 1, id - 2, id - 3, id - 4],
        [id, id + 16, id + 32, id + 48, id + 64],
        [id, id - 16, id - 32, id - 48, id - 64],
        [id, id - 15, id - 30, id - 45, id - 60],
        [id, id - 17, id - 34, id - 51, id - 68],
        [id, id + 15, id + 30, id + 45, id + 60],
        [id, id + 17, id + 34, id + 51, id + 68]       
    ]
    winCombinations.forEach(comb => {
        const squareList = []
        const childList = []
        for(let i = 0; i < comb.length; i++) {
            squareList.push(squares[comb[i]])
        }
        squareList.forEach(square => {
            if(square.firstChild) {
                const children = square.firstChild
                childList.push(children)
            }
        })
        if(childList.length >= 5) {
            let win = childList.every(child => {
            return child.classList.contains('black')
            })
            if(win) {
                displayWinner.innerText = 'Black won !'
            }
        } 
        if(childList.length >= 5) {
            let win = childList.every(child => {
            return child.classList.contains('white')
            })
            if(win) {
                displayWinner.innerText = 'White won !'
            }
        } 
    })
}

document.addEventListener('DOMContentLoaded', createBoard) 