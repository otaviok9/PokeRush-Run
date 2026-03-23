let des = document.getElementById('des').getContext('2d')

// Jogador
let player = new Player(100, 300, 110, 110, './img/player.png')

// Inimigos (pedras)
let inimigo1 = new Inimigo(1300, 100, 90, 90, './img/pedra1.png')
let inimigo2 = new Inimigo(1500, 300, 90, 90, './img/pedra2.png')
let inimigo3 = new Inimigo(1700, 500, 90, 90, './img/pedra3.png')
let inimigo4 = new Inimigo(1900, 200, 90, 90, './img/pedra4.png')
let inimigo5 = new Inimigo(2100, 400, 90, 90, './img/pedra5.png')

// Pokémons coletáveis
let item1 = new Item(1400, 150, 100, 110, './img/pikachu.png')
let item2 = new Item(1700, 350, 110, 100, './img/greninja.png')
let item3 = new Item(2000, 500, 110, 100, './img/charizard.png')

// Fundo
let fundo = new Fundo(0, 0, 1200, 700, './img/fundo_fase1.png')

// Textos e telas
let fase_txt = new Text()
let telas = new Telas()

// Sons
let fundo_som = new Audio('./img/musica_fundo.mp3')
let coletar = new Audio('./img/musica_coletar.mp3')
let batida = new Audio('./img/musica_batida.mp3')
fundo_som.volume = 0.5
fundo_som.loop = true
coletar.volume = 1.0
batida.volume = 0.5

// Estados do jogo
let tela = 'menu'
let fase = 1

// Click nos botões das telas
document.getElementById('des').addEventListener('click', (e) => {
    let rect = document.getElementById('des').getBoundingClientRect()
    let cx = e.clientX - rect.left
    let cy = e.clientY - rect.top

    function clicou(bx, by) {
        return cx > bx - 200 && cx < bx + 200 && cy > by - 40 && cy < by + 40
    }

    if (tela === 'menu') {
        if (clicou(600, 320)) iniciar_jogo()
        if (clicou(600, 420)) tela = 'manual'
        if (clicou(600, 520)) tela = 'sobre'
    } else if (tela === 'manual' || tela === 'sobre') {
        if (clicou(600, 670) || clicou(600, 620)) tela = 'menu'
    } else if (tela === 'vitoria' || tela === 'derrota') {
        if (clicou(600, 480) || clicou(600, 500)) iniciar_jogo()
        if (clicou(600, 570) || clicou(600, 590)) tela = 'menu'
    }
})

// Inicia ou reinicia o jogo
function iniciar_jogo() {
    player.vida = 5
    player.pontos = 0
    player.x = 100
    player.y = 300
    player.dir = 0
    fase = 1
    fundo.a = './img/fundo_fase1.png'

    ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => {
        i.vel = 2
        i.recomeca()
    })
    ;[item1, item2, item3].forEach(i => i.recomeca())

    tela = 'jogando'
    fundo_som.play()
}

// Controles do jogador
document.addEventListener('keydown', (e) => {
    if (tela === 'jogando') {
        fundo_som.play()
        if (e.key === 'w' || e.key === 'ArrowUp') player.dir -= 10
        if (e.key === 's' || e.key === 'ArrowDown') player.dir += 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') player.dir = 0
    if (e.key === 's' || e.key === 'ArrowDown') player.dir = 0
})

// Verifica colisões com pedras e itens
function colisao() {
    let pedras = [inimigo1, inimigo2, inimigo3, inimigo4, inimigo5]
    pedras.forEach(obj => {
        if (player.colid(obj)) {
            batida.play()
            obj.recomeca()
            player.vida -= 1
            telas.ativar_flash()
        }
    })
    let itens = [item1, item2, item3]
    itens.forEach(item => {
        if (player.colid(item)) {
            coletar.play()
            player.pontos += 10
            player.vida = Math.min(player.vida + 1, 5)
            item.recomeca()
        }
    })
}

// Soma pontos ao passar das pedras
function pontuacao() {
    let pedras = [inimigo1, inimigo2, inimigo3, inimigo4, inimigo5]
    pedras.forEach(obj => {
        if (player.point(obj)) {
            player.pontos += 5
            obj.recomeca()
        }
    })
}

// Verifica troca de fase
function ver_fase() {
    if (player.pontos > 300 && fase === 1) {
        fase = 2
        fundo.a = './img/fundo_fase2.png'
        ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => i.vel = 4)
    } else if (player.pontos > 600 && fase === 2) {
        fase = 3
        fundo.a = './img/fundo_fase3.png'
        ;[inimigo1, inimigo2, inimigo3, inimigo4, inimigo5].forEach(i => i.vel = 6)
    }
}

// Verifica condição de vitória
function ver_vitoria() {
    if (fase === 3 && player.pontos > 1000 && player.vida > 0) {
        tela = 'vitoria'
        fundo_som.pause()
    }
}

// Verifica condição de derrota
function game_over() {
    if (player.vida <= 0) {
        tela = 'derrota'
        fundo_som.pause()
    }
}

// Desenha a tela atual
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
        telas.desenha_derrota(player.pontos, fase)
    } else if (tela === 'jogando') {
        fundo.des_imagem()
        player.des_imagem()
        inimigo1.des_imagem()
        inimigo2.des_imagem()
        inimigo3.des_imagem()
        inimigo4.des_imagem()
        inimigo5.des_imagem()
        item1.des_imagem()
        item2.des_imagem()
        item3.des_imagem()
        telas.desenha_flash()
        telas.desenha_hud(player.pontos, player.vida, fase)
    }
}

// Atualiza os elementos do jogo
function atualiza() {
    telas.atualiza()
    if (tela === 'jogando') {
        player.mov_player()
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

// Loop principal do jogo
function main() {
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()