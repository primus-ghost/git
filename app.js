function initGame() {
    "use strict";
    let game = null;
    const bestScore = document.getElementById('best_score');
    const gameBorad = document.getElementById('game');
    const clickBoard = document.getElementsByClassName('click');
    const size = 4;
    const nextId = 1;
    const gameWidth = gameBorad.clientWidth;
    let tileSize = Math.round(gameWidth / size);
    let id = 0;

    function randomNum() {
        let num = Math.floor(Math.random() * (size * size));
        return num
    }

    function generateId() {
        let nId = id += nextId;
        return nId;
    }

    function initGame() {
        game = Array(size * size).fill(null);
    } initGame()

    function createGameBoard() {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let backGround = document.createElement("div");
                backGround.className = "backGround"
                backGround.style.width = `${gameWidth / size}px`;
                backGround.style.height = `${gameWidth / size}px`;
                backGround.style.left = `${x * tileSize}px`;
                backGround.style.top = `${y * tileSize}px`;
                gameBorad.appendChild(backGround)
            }
        }
    } createGameBoard()

    function createTile() {
        let tile;
        let i = randomNum();
        if (game[i] == null) {
            tile = {
                id: generateId(),
                value: 2,
                px: 0,
                py: 0
            }
            game[i] = tile;
            tilePostion(game)
        } else createTile();
    }

    function tilePostion(game) {
        for (let i = 0; i < game.length; i++) {
            if (game[i]) {
                let x = i % size;
                let y = Math.floor(i / size);
                game[i].px = x;
                game[i].py = y;
                // console.log(`x is =${x} ----- y is =${y}`);
                addTile(game[i]);
            }
        }
    }

    function addTile(tile) {
        let tileElement = document.createElement("div");
        tileElement.className = "tile";

        tileElement.style.width = `${gameWidth / size - 5}px`;
        tileElement.style.height = `${gameWidth / size - 5}px`;

        tileElement.style.left = `${tile.px * tileSize + 2.5}px`;
        tileElement.style.top = `${tile.py * tileSize + 2.5}px`;

        tileElement.innerHTML = tile.value;
        setTimeout(() => {
            tileElement.style.animationName = "createTile";
            tileElement.style.animationDuration = '0.3s';
            gameBorad.appendChild(tileElement);
        }, 300);
    }

    clickBoard[0].addEventListener('click', (e) => {
        createTile();
        console.log(game);

    })
}



window.onload = function () {
    initGame();
};