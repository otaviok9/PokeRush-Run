let des = document.getElementById('des').getContext('2d')

// Jogador
let player = new Player(100, 300, 80, 80, './img/player1.png')

// Inimigos
let inimigo1 = new Inimigo(1300, 100, 80, 80, './img/poke1.png')
let inimigo2 = new Inimigo(1500, 300, 80, 80, './img/poke2.png')
let inimigo3 = new Inimigo(1700, 500, 80, 80, './img/poke3.png')

// Itens
let item1 = new Item(1400, 200, 50, 50, './img/poção.png')

// Fundo
let fundo = new Fundo(0,0,1200,700,'./img/fundo.png')

// Textos
let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

// Sons
let fundo_som = new Audio('./img/musica_fundo.mp3')
let coletar = new Audio('./img/coletar.mp3')
let batida = new Audio('./img/batida.mp3')
fundo_som.volume = 0.5
fundo_som.loop = true
coletar.volume = 0.5
batida.volume = 0.5

let jogar = true
let fase = 1

// Controles
document.addEventListener('keydown', (e) => {
fundo_som.play()
if(e.key === 'w' || e.key === 'ArrowUp') player.dir -= 10
if(e.key === 's' || e.key === 'ArrowDown') player.dir += 10
})

document.addEventListener('keyup', (e) => {
if(e.key === 'w' || e.key === 'ArrowUp') player.dir = 0
if(e.key === 's' || e.key === 'ArrowDown') player.dir = 0
})

// Funções principais
function colisao(){
let objetos = [inimigo1, inimigo2, inimigo3]
objetos.forEach(obj => {
if(player.colid(obj)){
batida.play()
obj.recomeca()
player.vida -= 1
}
})
if(player.colid(item1)){
coletar.play()
player.pontos += 10
item1.recomeca()
player.vida = Math.min(player.vida + 1, 5)
}
}

function pontuacao(){
let objetos = [inimigo1, inimigo2, inimigo3]
objetos.forEach(obj => {
if(player.point(obj)){
player.pontos += 5
obj.recomeca()
}
})
}

function ver_fase(){
if(player.pontos > 20 && fase === 1){
fase = 2
[inimigo1,inimigo2,inimigo3].forEach(i=>i.vel=4)
} else if(player.pontos > 40 && fase === 2){
fase = 3
[inimigo1,inimigo2,inimigo3].forEach(i=>i.vel=6)
}
}

function game_over(){
if(player.vida <= 0) jogar = false
}

function desenha(){
des.clearRect(0,0,1200,700)
fundo.des_imagem()
if(jogar){
player.des_imagem()
inimigo1.des_imagem()
inimigo2.des_imagem()
inimigo3.des_imagem()
item1.des_imagem()

t1.des_text('Pontos: ' + player.pontos, 1000, 40, 'yellow', '26px Arial')
t2.des_text('Vidas: ' + player.vida, 40, 40, 'red', '26px Arial')
fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
} else {
t1.des_text('GAME OVER', 450, 350, 'yellow', '60px Arial')
t2.des_text('Pontuação Final: ' + player.pontos, 480, 400, 'white', '25px Arial')
}
}

function atualiza(){
if(jogar){
player.mov_player()
player.anim('player')
inimigo1.mov_inimigo()
inimigo2.mov_inimigo()
inimigo3.mov_inimigo()
item1.mov_item()
colisao()
pontuacao()
ver_fase()
game_over()
}
}

function main(){
desenha()
atualiza()
requestAnimationFrame(main)
}

main()