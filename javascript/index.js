const musicaDeFundo = new Audio("music/music.mp3");
const musicaGameOver = new Audio("music/gameover.mp3");
const musicaMover = new Audio("music/move.mp3");
const musicaComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x:5 , y: 5}]
var fruta = {
      x: Math.floor(Math.random() * 18),
      y: Math.floor(Math.random() * 18)
}
var pontos = 0;
var ultimaVezAtualizada = 0;
var VELOCIDADE = 5;

function principal (tempoAtual) {
    window.requestAnimationFrame(principal);
    if((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / VELOCIDADE){
        return;
    }
    ultimaVezAtualizada = tempoAtual;
    autualizaGame();

}

function verificaColisao(){
    //VERIFICA COLISÃO COM ELA MESMO
    for(var i = 1; i < cobrinha.length; i++){
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }
    //VERIFICA CLISÃO COM PAREDES
    if(cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0){
        return true;
    }

    return false;
}

function verificaComeuFrutinha(){
     if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
         console.log("ENTROU AQUI")
          musicaComer.play();
          pontos = pontos + 10;
          pontuacao.innerHTML = pontos + "pontos";    
          cobrinha.unshift({ x: cobrinha[0].x + direcao.x,y: cobrinha[0].y + direcao.y}) 
          fruta.x = Math.floor(Math.random() * 18) 
          fruta.y = Math.floor(Math.random() * 18)         
     }  
}

function autualizaGame() {
    var colidiu = verificaColisao();
    if(colidiu == true){
      musicaDeFundo.pause();
      musicaGameOver.play();
      alert("GAME OVERRRR")
      cobrinha = [{ x: 5, y: 5}]
      direcao.x = 0;
      direcao.y = 0;
      pontos = 0;

}
verificaComeuFrutinha();

    for(var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;
    board.innerHTML = "";

    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add("head");
        }else{
            parteCobrinha.classList.add("snake");
        }

        board.appendChild(parteCobrinha);
    }
    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha);

}





function direcionaCobrinha(e) { 
    musicaMover.play();
    switch(e.code){
        case"ArrowUp":
            direcao.x = 0
            direcao.y = -1;
            break;
        case"ArrowDown":
           direcao.x = 0
           direcao.y = 1;
           break;
        case "ArrowRight":
            direcao.x = 1
            direcao.y = 0;
            break;
        case "ArrowLeft":
            direcao.x = -1
            direcao.y = 0;
            break;
        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            musicaDeFundo.play();
    }

}

window.addEventListener("keydown", (e) => direcionaCobrinha(e))



principal();
