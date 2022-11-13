// JavaScript source code
var game = null;        // Gameオブジェクト
var gameTimer = null;   // ゲーム用タイマー
var itemTimer = null;   // アイテム生成用タイマー
var board_w = 640;      // ゲーム横幅
var board_h = 960;      // ゲーム高さ
var time_dx = 5000;     // アイテム出現のタイムラグ
var lost_max = 3;      // 取り損なったアイテム最大数

var startScreen = null;
var startScreenTimer = null;
// スタートアニメーション
function moveStartScreen() {
    startScreen.move();
    startScreen.draw();
}

// このページの初期化処理
function initial() {
    game = new Game();
    startScreen = new StartScreen();
}

// ゲームの開始
function start() {
    if (game.flg == false) {
        startScreen.stop();
        game.initial();
        time_dx = 5000;
        gameTimer = setInterval(run, 25);
        itemTimer = setTimeout(makeItem, time_dx);
    }
}
// ゲームの基本処理の呼び出し
function run() {
    game.run();
}
// アイテム作成処理
function makeItem() {
    game.makeItem();
    time_dx -= 100;
    if (time_dx < 1000) {
        time_dx = 1000;
    }
    itemTimer = setTimeout(makeItem, time_dx);
}
// ゲーム終了の処理
function gameOver() {
    clearInterval(gameTimer);
    clearTimeout(itemTimer);
    game.flg = false;
    checkHiScore();
    game.draw();
}

// ハイスコアを保存する関数
function checkHiScore() {
    var hi = localStorage.getItem('NonNonHiScore') * 1;
    if (game.score > hi) {
        var nickname = prompt('ハイスコアなん。お名前をどうぞ:');
        localStorage.setItem('NonNonHiScore', game.score);
        localStorage.setItem('NonNonNickName', nickname);
    }
}

// オブジェクト関係
function Character() {
    this.w = 128;
    this.h = 128;
    this.x = board_w / 2 - this.w / 2; //0;
    this.y = board_h - this.h;
    this.dx = 5;
    this.direct = 'right';
    this.last_direct = 'right';
    this.imageR = new Image();
    this.imageR.src = 'image.png';
    this.imageL = new Image();
    this.imageL.src = 'image2.png';
    // キャラクターの描画
    this.draw = function (context) {
        if (this.direct == 'stop') {
            if (this.last_direct == 'right') {
                context.drawImage(this.imageR, this.x, this.y);
            } else {
                context.drawImage(this.imageL, this.x, this.y);
            }
        }
        if (this.direct == 'right') {
            context.drawImage(this.imageR, this.x, this.y);
        }
        if (this.direct == 'left') {
            context.drawImage(this.imageL, this.x, this.y);
        }
    }
    // キャラクターを動かす
    this.move = function () {
        if (this.direct == 'right') {
            this.last_direct = 'right';
            this.x += this.dx;
        }
        if (this.direct == 'left') {
            this.last_direct = 'left';
            this.x -= this.dx;
        }
    }
}

function Gu() {
    this.w = 128;
    this.h = 128;
    this.x = Math.floor(Math.random() * (board_w - this.w));
    this.y = this.h * -1;
    this.dy = 4 + Math.floor(Math.random() * 12);
    this.image = new Image();
    this.image.src = 'gu.png';
    this.sound = document.querySelector('#gu_get');
    this.timer = null; // タイマー初期値
    // アイテムの描画
    this.draw = function (context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    // アイテムを動かす
    this.move = function () {
        this.y += this.dy;
    }
    // 取得時の処理
    this.get = function () {
        this.sound.play();
        game.char.dx *= 2;
        this.timer = setTimeout(function () {
            game.char.dx /= 2;
        }, 10000);
    }
}

function Item() {
    this.w = 128;
    this.h = 128;
    this.x = Math.floor(Math.random() * (board_w - this.w));
    this.y = this.h * -1;
    this.dy = Math.floor(Math.random() * 5) + 1;
    this.image = new Image();
    this.image.src = 'item' + Math.floor(Math.random() * 3) + '.png';
    this.sound = document.querySelector('#item_get');
    // アイテムの描画
    this.draw = function (context) {
        context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    // アイテムを動かす
    this.move = function () {
        this.y += this.dy;
    }
    // 取得時の処理
    this.get = function () {
        this.sound.play();
    }
}

function Game() {
    this.flg = false;
    this.canvas = document.querySelector('#canvas');
    this.context = canvas.getContext('2d');
    this.char = new Character();
    this.bkImage = new Image();
    this.bkImage.src = 'back.jpg';
    // ゲームオブジェクトの初期化
    this.initial = function () {
        this.flg = true;
        this.score = 0;
        this.missed = 0;
        this.char.x = (board_w - this.char.w) / 2;
        this.items = new Array();
    }
    // マウスを動かしたときのイベント処理
    this.canvas.onmousemove = function (e) {
        this.mouseX = e.clientX - this.offsetLeft; // e.clientX: Webページの左上からマウスポインタのある場所までの距離
        this.mouseY = e.clientY - this.offsetTop;  // sffsetTop: CanvasオブジェクトがWebページの左上からどれだけ離れた場所にあるか
    }
    // ゲーム画面の描画処理
    this.draw = function () {
        this.context.drawImage(this.bkImage, 0, 0);
        this.char.draw(this.context);
        for (var n in this.items) {
            var item = this.items[n];
            item.draw(this.context);
        }
        this.context.font = "24pt 'Monaca'";
        this.context.fillStyle = 'white';
        this.context.textAlign = 'start';
        this.context.fillText('Score: ' + this.score, 10, 30);
        if (this.flg == false) {
            this.context.font = "72pt 'san serif'";
            this.context.textAlign = 'center';
            this.context.fillStyle = 'red';
            this.context.fillText('GAMEOVER', board_w / 2, 200);
            // ハイスコア表示
            var hi = localStorage.getItem('NonNonHiScore');
            var nickname = localStorage.getItem('NonNonNickName');
            this.context.font = "24pt 'san serif'";
            var str = 'Hi-Score: ' + hi + ' (' + nickname + ')';
            this.context.fillText(str, board_w / 2, 250);
        }
    }
    // アイテムの作成
    this.makeItem = function () {
        this.items.push(new Item());
        if (Math.floor(Math.random() * 10) == 0) {
            game.items.push(new Gu());
        }
    }
    // アイテム取得の処理
    this.isCatched = function () {
        for (var n in this.items) {
            var item = this.items[n];
            //if (item.y > this.char.y + 50 && item.y < this.char.y + 150) {
            if (item.y + item.h  >= this.char.y  && item.y <= this.char.y + this.char.h) {
                //if (item.x > this.char.x && item.x + item.w < this.char.x + this.char.w) {
                if (item.x + item.w >= this.char.x && item.x  <= this.char.x + this.char.w) {
                    item.get();
                    this.items.splice(n, 1);
                    this.score += 100 + (item.dy - 1) * 50;
                }
            }
            if (item.y > this.canvas.height) {
                this.items.splice(n, 1);
                this.score -= 10 + item.dy * 10;
                if (this.score < 0) {
                    this.score = 0;
                }
                this.missed++;
                if (this.missed > lost_max) {
                    gameOver();
                }
            }
        }
    }
    // ゲームのメイン処理
    this.run = function () {
        this.char.direct = 'stop';
        if (this.char.x > this.canvas.mouseX) {
            this.char.direct = 'left';
        }
        if (this.char.x + this.char.w < this.canvas.mouseX) {
            this.char.direct = 'right';
        }
        this.char.move();
        for (var n in this.items) {
            var item = this.items[n];
            item.move();
        }
        this.isCatched();
        this.draw();
    }
}

function StartScreen() {
    this.bkImage = new Image();
    this.bkImage.src = 'back.jpg';
    this.charImage = new Image();
    this.charImage.src = 'image.png';
    this.x = -128;
    this.y = board_h - 128;
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    // タイマースタート
    this.bkImage.onload = function () {
        startScreenTimer = setInterval(moveStartScreen, 50);
    }
    // キャラクターの移動
    this.move = function () {
        this.x += 5;
        if (this.x > board_w) {
            this.x = -128;
        }
    }
    // スタート画面の描画
    this.draw = function () {
        // イメージ描画
        this.context.drawImage(this.bkImage, 0, 0);
        this.context.drawImage(this.charImage, this.x, this.y);
        // タイトル描画
        this.context.font = "64pt 'san serif'";
        this.context.textAlign = 'center';
        this.context.fillStyle = 'blue';
        this.context.fillText('にゃんぱするん', board_w / 2, 150);
        // ハイスコアの取得
        var hi = localStorage.getItem('NonNonHiScore');
        var nickname = localStorage.getItem('NonNonNickName');
        // ハイスコアの描画
        this.context.font = "20pt 'san serif'";
        var str = 'Hi-Score: ' + hi + ' (' + nickname + ')';
        this.context.fillText(str, board_w / 2, 250);
    }
    // ストップ
    this.stop = function () {
        clearInterval(startScreenTimer);
    }
}