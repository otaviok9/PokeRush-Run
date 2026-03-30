let des = document.getElementById('des').getContext('2d')

// Jogador 1
let player = new Player(100, 200, 120, 120, 'img/player_frame1.png')

// Jogador 2
let player2 = new Player(100, 450, 120, 120, 'img/player2_frame1.png')

// Inimigos (pedras)
let inimigo1 = new Inimigo(1300, 100, 90, 90, 'img/pedra1.png')
let inimigo2 = new Inimigo(1500, 300, 90, 90, 'img/pedra2.png')
let inimigo3 = new Inimigo(1700, 500, 90, 90, 'img/pedra3.png')
let inimigo4 = new Inimigo(1900, 200, 90, 90, 'img/pedra4.png')
let inimigo5 = new Inimigo(2100, 400, 90, 90, 'img/pedra5.png')

// Pokémons coletáveis
let item1 = new Item(1400, 150, 90, 90, 'img/pichu.png')
let item2 = new Item(1700, 350, 90, 90, 'img/froakie.png')
let item3 = new Item(2000, 500, 90, 90, 'img/charmander.png')

let fundo = new Fundo(0, 0, 1200, 700, 'img/fundo_fase1.png')

let fase_txt = new Text()
let telas = new Telas()

let fundo_som = new Audio('img/musica_fundo.mp3')
let coletar = new Audio('img/musica_coletar.mp3')
let batida = new Audio('img/musica_batida.mp3')
fundo_som.volume = 0.5
fundo_som.loop = true
coletar.volume = 1.0
batida.volume = 0.5
coletar.load()
batida.load()

let tela = 'menu'
let fase = 1
let modo = 1

// Click nos botões
document.getElementById('des').addEventListener('click', (e) => {
    let rect = document.getElementById('des').getBoundingClientRect()
    let cx = e.clientX - rect.left
    let cy = e.clientY - rect.top

    function clicou(bx, by) {
        return cx > bx - 200 && cx < bx + 200 && cy > by - 40 && cy < by + 40
    }

    if (tela === 'menu') {
        if (clicou(600, 300)) { modo = 1; iniciar_jogo() }
        if (clicou(600, 390)) { modo = 2; iniciar_jogo() }
        if (clicou(600, 480)) tela = 'manual'
        if (clicou(600, 570)) tela = 'sobre'
    } else if (tela === 'manual' || tela === 'sobre') {
        if (clicou(600, 670) || clicou(600, 620)) tela = 'menu'
    } else if (tela === 'vitoria' || tela === 'derrota') {
        if (clicou(600, 520) || clicou(600, 480)) iniciar_jogo() // Ajustado para bater com o visual
        if (clicou(600, 610) || clicou(600, 570)) tela = 'menu'
    }
})

// Inicia ou reinicia o jogo
function iniciar_jogo() {
    player.vida = 5
    player.pontos = 0
    player.x = 100
    player.y = 200
    player.dir = 0
    fase = 1
    fundo.a = 'img/fundo_fase1.png'
    item1.a = 'img/pichu.png'
    item2.a = 'img/froakie.png'
    item3.a = 'img/charmander.png'

    if (modo === 2) {
        player2.vida = 5
        player2.pontos = 0
        player2.x = 100
        player2.y = 450
        player2.dir = 0
    }

    ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => {
        i.vel = 4
        i.recomeca()
    })
    ;[item1, item2, item3].forEach(i => i.recomeca())

    tela = 'jogando'
    fundo_som.currentTime = 0
    fundo_som.play()
}

// Controles
document.addEventListener('keydown', (e) => {
    if (tela === 'jogando') {
        fundo_som.play()
        if (e.key === 'w') player.dir = -10
        if (e.key === 's') player.dir = 10
        if (modo === 2) {
            if (e.key === 'ArrowUp') player2.dir = -10
            if (e.key === 'ArrowDown') player2.dir = 10
        }
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') player.dir = 0
    if (e.key === 's') player.dir = 0
    if (modo === 2) {
        if (e.key === 'ArrowUp') player2.dir = 0
        if (e.key === 'ArrowDown') player2.dir = 0
    }
})

// Colisões
function colisao() {
    let pedras = [inimigo1, inimigo2, inimigo3, inimigo4, inimigo5]
    let itens = [item1, item2, item3]

    pedras.forEach(obj => {
        if (player.colid(obj)) {
            batida.currentTime = 0
            batida.play()
            obj.recomeca()
            player.vida -= 1
            telas.ativar_flash()
        }
    })
    itens.forEach(item => {
        if (player.colid(item)) {
            coletar.currentTime = 0
            coletar.play()
            player.pontos += 10
            player.vida = Math.min(player.vida + 1, 5)
            item.recomeca()
        }
    })

    if (modo === 2) {
        pedras.forEach(obj => {
            if (player2.colid(obj)) {
                batida.currentTime = 0
                batida.play()
                obj.recomeca()
                player2.vida -= 1
                telas.ativar_flash()
            }
        })
        itens.forEach(item => {
            if (player2.colid(item)) {
                coletar.currentTime = 0
                coletar.play()
                player2.pontos += 10
                player2.vida = Math.min(player2.vida + 1, 5)
                item.recomeca()
            }
        })
    }
}

// Pontuação
function pontuacao() {
    let pedras = [inimigo1, inimigo2, inimigo3, inimigo4, inimigo5]
    pedras.forEach(obj => {
        if (obj.x < player.x && !obj.ganhouPontoP1) {
            player.pontos += 5
            obj.ganhouPontoP1 = true
        }
        if (modo === 2 && obj.x < player2.x && !obj.ganhouPontoP2) {
            player2.pontos += 5
            obj.ganhouPontoP2 = true
        }
    })
}

// Troca de fase
function ver_fase() {
    let pts = modo === 2 ? Math.max(player.pontos, player2.pontos) : player.pontos
    if (pts > 300 && fase === 1) {
        fase = 2
        fundo.a = 'img/fundo_fase2.png'
        item1.a = 'img/pikachu.png'
        item2.a = 'img/frogadier.png'
        item3.a = 'img/charmeleon.png'
        ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => i.vel = 9)
    } else if (pts > 600 && fase === 2) {
        fase = 3
        fundo.a = 'img/fundo_fase3.png'
        item1.a = 'img/raichu.png'
        item2.a = 'img/greninja.png'
        item3.a = 'img/charizard.png'
        ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => i.vel = 11)
    }
}

// Vitória
function ver_vitoria() {
    let pts = modo === 2 ? Math.max(player.pontos, player2.pontos) : player.pontos
    let vidas = modo === 2 ? player.vida > 0 || player2.vida > 0 : player.vida > 0
    if (fase === 3 && pts >= 1000 && vidas) {
        tela = 'vitoria'
        fundo_som.pause()
    }
}

// Game over
function game_over() {
    if (modo === 1 && player.vida <= 0) {
        tela = 'derrota'
        fundo_som.pause()
        fundo_som.currentTime = 0
    }
    if (modo === 2 && (player.vida <= 0 || player2.vida <= 0)) {
        tela = 'derrota'
        fundo_som.pause()
        fundo_som.currentTime = 0
    }
}

// Desenha
function desenha() {
    des.clearRect(0, 0, 1200, 700)
    if (tela === 'menu') {
        telas.desenha_menu()
    } else if (tela === 'manual') {
        telas.desenha_manual()
    } else if (tela === 'sobre') {
        telas.desenha_sobre()
    } else if (tela === 'vitoria') {
        telas.desenha_vitoria(player.pontos, player.vida)
    } else if (tela === 'derrota') {
        telas.desenha_derrota(player.pontos, fase, modo === 2 ? player2 : null)
    } else if (tela === 'jogando') {
        fundo.des_imagem()
        player.des_imagem()
        if (modo === 2) player2.des_imagem()
        inimigo1.des_imagem()
        inimigo2.des_imagem()
        inimigo3.des_imagem()
        inimigo4.des_imagem()
        inimigo5.des_imagem()
        item1.des_imagem()
        item2.des_imagem()
        item3.des_imagem()
        telas.desenha_flash()
        telas.desenha_hud(player.pontos, player.vida, fase, modo === 2 ? player2 : null)
    }
}

// Atualiza
function atualiza() {
    telas.atualiza()
    if (tela === 'jogando') {
        player.mov_player()
        player.anim('player')
        if (modo === 2) {
            player2.mov_player()
            player2.anim('player2')
        }
        inimigo1.mov_inimigo()
        inimigo2.mov_inimigo()
        inimigo3.mov_inimigo()
        inimigo4.mov_inimigo()
        inimigo5.mov_inimigo()
        item1.mov_item()
        item2.mov_item()
        item3.mov_item()
        colisao()
        pontuacao()
        ver_fase()
        ver_vitoria()
        game_over()
    }
}

// Loop principal
function main() {
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()