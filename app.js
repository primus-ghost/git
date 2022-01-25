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

    function randomValue() {
        let val = Math.floor(Math.random() * 100);
        return val > 85 ? 4 : 2;
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
                value: randomValue(),
                px: 0,
                py: 0
            }
            game[i] = tile;
            tilePostion(game)
            addTile(game[i]);
        } else createTile();
    }

    function tilePostion(game) {
        for (let i = 0; i < game.length; i++) {
            if (game[i]) {
                let x = i % size;
                let y = Math.floor(i / size);
                game[i].px = x;
                game[i].py = y;
            }
        }
    }

    function updateTilePosition(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                let tile = document.getElementsByClassName(`tile_${arr[i].id}`);
                tile[0].style.left = `${arr[i].px * tileSize}px`;
                tile[0].style.top = `${arr[i].py * tileSize}px`;
            }
        }
    }

    function addTile(tile) {
        let tileElement = document.createElement("div");
        tileElement.className = `tile tile_${tile.id} color_tile_${tile.value}`;
        tileElement.style.width = `${gameWidth / size}px`;
        tileElement.style.height = `${gameWidth / size}px`;
        tileElement.style.left = `${tile.px * tileSize}px`;
        tileElement.style.top = `${tile.py * tileSize}px`;
        tileElement.innerHTML = tile.value;
        setTimeout(() => {
            tileElement.style.animationName = "createTile";
            tileElement.style.animationDuration = '0.3s';
            gameBorad.appendChild(tileElement);
        }, 100);
    }

    function removeTile() {

    };

    function moveToRight() {
        let movedArr = [];
        for (let i = 0; i < game.length; i++) {
            if (i % size == 0) {
                let allRows = game.slice(i, i + size);
                let filterd = allRows.filter(item => item);
                let moved = new Array(allRows.length - filterd.length).fill(null);
                moved.push(...filterd);
                movedArr = [...movedArr, ...moved];
            }
        }

        game = movedArr;
        tilePostion(game);
        updateTilePosition(game);
        createTile();
    }



    function moveToLeft() {
        let movedArr = [];
        for (let i = 0; i < game.length; i++) {
            if (i % size == 0) {
                let allRows = game.slice(i, i + size);
                let filterd = allRows.filter(item => item);
                let moved = new Array(allRows.length - filterd.length).fill(null);
                console.log();

                moved.unshift(...filterd);
                movedArr = [...movedArr, ...moved]
            }
        }
        game = movedArr;
        tilePostion(game);
        updateTilePosition(game);
    }

    function mergeRow(rows) {
        
    }

    function mergeColumn() {

    }

    function handleKey(e) {
        const { keyCode } = e;
        switch (keyCode) {
            case 37:
                moveToLeft();
                createTile();
                break;
            case 39:
                moveToRight();
                break;
            default:
                return null;
        }
    }

    clickBoard[0].addEventListener('click', (e) => {
        createTile();
    });

    document.addEventListener('keyup', handleKey);
    createTile();
}

window.onload = function () {
    initGame();
};
