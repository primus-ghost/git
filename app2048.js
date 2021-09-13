
function createGame(grdiDisplay, scoreDisplay, resultDisplay, width, squeres) {
    this.grdiDisplay = grdiDisplay;
    this.scoreDisplay = scoreDisplay;
    this.resultDisplay = resultDisplay;
    this.width = width;
    this.squeres = squeres;
    this.createBoard();
    this.generateNum();
    this.combineRow();
    this.moveRight();
    this.keyRight();
    this.control();
}

//create a girds board 
createGame.prototype.createBoard = function () {
    for (let i = 0; i < this.width * this.width; i++) {
        let squere = document.createElement('div');
        squere.innerHTML = 0;
        this.grdiDisplay.appendChild(squere);

        this.squeres.push(squere)
    }
    this.generateNum();
}

createGame.prototype.generateNum = function () {
    let randomNumber = Math.floor(Math.random() * this.squeres.length)
    if (this.squeres[randomNumber].innerHTML == 0) {
        this.squeres[randomNumber].innerHTML = 2
    } else this.generateNum();
}

//combineRow
createGame.prototype.combineRow = function () {
    for (let i = 0; i < 15; i++) {
        if (this.squeres[i].innerHTML == this.squeres[i + 1].innerHTML) {
            let combined = parseInt(this.squeres[i].innerHTML) + parseInt(this.squeres[i + 1].innerHTML);
            this.squeres[i].innerHTML = combined;
            this.squeres[i + 1].innerHTML = 0;
        }
    }
}



//move to right
createGame.prototype.moveRight = function () {
    if (!this.squeres) return
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let squereOne = this.squeres[i].innerHTML;
            let squereTwo = +this.squeres[i + 1].innerHTML;
            let squereThree = +this.squeres[i + 2].innerHTML;
            let squereFour = +this.squeres[i + 3].innerHTML;
            let rows = [squereOne, squereTwo, squereThree, squereFour];
            let filterd = rows.filter(num => num);
            let missing = 4 - filterd.length
            let zero = Array(missing).fill(0);
            let newRow = zero.concat(filterd);

            this.squeres[i].innerHTML = newRow[0];
            this.squeres[i + 1].innerHTML = newRow[1];
            this.squeres[i + 2].innerHTML = newRow[2];
            this.squeres[i + 3].innerHTML = newRow[3];

        }
    }
    this.keyRight();
}

createGame.prototype.keyRight = function () {
    
}

createGame.prototype.control = function (e){
    console.log(this);
}   

document.addEventListener('keyup', e => createGame.prototype.control(e))

window.onload = function () {
    const grdiDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    const squeres = [];

    new createGame(grdiDisplay, scoreDisplay, resultDisplay, width, squeres);
}
