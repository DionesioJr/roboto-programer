
// definindo variaves globais
var canvas;
var current_status;
var ctx;
var HEIGHT;
var WIDTH;
var frames = 0;


var order_list = {
    count: 0,
    order_exec: [],
    order: function (action, pace) {

        this.order_exec[this.count] = {
            action: action,
            pace: pace
        };

        this.count++;
    }
}


function execute() {

    for (let i = 0; i < order_list.order_exec.length; i++) {
        order_list.order_exec[i].action;

        personagem.position(order_list.order_exec[i].action, order_list.order_exec[i].pace);
        drawing();
    }

    order_list.order_exec = [];
    order_list.count = 0;

    $("#list-comand").html("");
}


// criando lista
function sendPace() {


    let pace = parseInt($("#pace").val(), 10);
    let action = parseInt($("#action").val(), 10);
    let html = "";

    order_list.order(action, pace);

    if (action == 1) {
        html = '<li class="list-group-item d-flex justify-content-between align-items-center">Cima <span class="badge badge-primary badge-pill">' + pace + '</span></li>';
    }

    if (action == 2) {
        html = '<li class="list-group-item d-flex justify-content-between align-items-center">Baixo <span class="badge badge-primary badge-pill">' + pace + '</span></li>';
    }

    if (action == 3) {
        html = '<li class="list-group-item d-flex justify-content-between align-items-center">Direita <span class="badge badge-primary badge-pill">' + pace + '</span></li>';
    }

    if (action == 4) {
        html = '<li class="list-group-item d-flex justify-content-between align-items-center">Esquerda <span class="badge badge-primary badge-pill">' + pace + '</span></li>';
    }

    $("#list-comand").append(html);

}


// definindo mapa
var mapa = {
    parede: "#422",
    caminho: "blue",
    inicio: "#4f4f",
    fim: "red",
    mapa: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
    draw: function () {

        // desenhando o personagem
        let cont = 0;

        for (let y = 0; y < 10; y++) {

            for (let x = 0; x < 10; x++) {

                if ((this.mapa[cont] % 2) == 0) {
                    ctx.fillStyle = this.parede;
                    ctx.fillRect(x, y, 1, 1)
                }

                ctx.fillStyle = this.inicio;
                ctx.fillRect(0, 0, 1, 1)

                ctx.fillStyle = this.fim;
                ctx.fillRect(9, 9, 1, 1)

                cont++;

            }
        }
    }
}


// definindo personagem
var personagem = {
    x: 1,
    y: 1,
    height: 1,
    width: 1,
    velocidade: 1,
    color: "#fff200",
    draw: function () {
        // desenhando o personagem
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.height, this.width)
    },
    update: function () {
        this.velocidade += 8;
        this.y += this.velocidade;
    },
    position: function (action, pace) {

        // direita
        if (action == 3) {
            personagem.x += pace;
        }

        // esquerda
        if (action == 4) {
            personagem.x += -pace;
        }

        // baixo
        if (action == 2) {
            personagem.y += pace;
        }

        // cima
        if (action == 1) {
            personagem.y += -pace;
        }


    }

}

// status do jogo
var game_status = {
    play: 'play',
    runding: 1,
    game_over: 0
}

// chamando função principal
main();

// função principal
function main() {
    // altura da tela
    HEIGHT = window.innerHeight;
    // largura da tela
    WIDTH = window.innerWidth;

    WIDTH = 10;
    HEIGHT = 10;


    // capturando o canvas
    canvas = document.getElementById("game");
    // informando largura 
    canvas.width = WIDTH;
    // informando altura
    canvas.height = HEIGHT;

    // pegando o contexto do canvas
    ctx = canvas.getContext("2d");

    // pegando evendo de clicar mouse
    document.addEventListener("mousedown", control);

    // pegando o evento ao pressionar uma tecla
    document.addEventListener("keypress", control);

    // informando o status atual do jogo
    current_status = game_status.play;

    // iniciando jogo 
    rum();

}

// iniciando o jogo
function rum() {


    // atualizando jogo
    update();

    // animando jogo
    drawing();

    // deixando a função em loop
    window.requestAnimationFrame(rum);

    // animating/drawing code goes here
}

// criando animação do jogo
function drawing() {


    //limpando tela
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // desenhando cor do ceu

    let x = 0;
    let y = 0

    /*
    for (let j = 600; j >= 0; j - 50) {

        for (let i = 600; i >= 0; i- 50) {


            if ((x / 2) == 0) {

                ctx.fillStyle = '#FF3';
                ctx.fillRect(x, y, 50, 50);


                x += 50;
            } else {

                ctx.fillStyle = '#f8f8';
                ctx.fillRect(x, y, 50, 50);
                x += 50;

            }

        }
        x += 50;
        y = 0;

    }


*/

    // desenhando personagem
    personagem.draw();

    // desenhando mapa
    mapa.draw();

}

// atualizando jogo
function update() {
    // atualizando senario
    frames++;

    // atualidando personagem
    // personagem.update();
}

// saltar
function control() {
    if (current_status === game_status.play) {
        current_status = game_status.runding
    } else if (current_status === game_status.game_over) {
        console.log("gameover");
        current_status = game_status.play
        console.log(current_status);
    }

}
