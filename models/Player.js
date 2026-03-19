class Obj{
    constructor(x,y,w,h,a){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.a = a
    }
    
    des_imagem(){
    let img = new Image()
    img.src = this.a
    des.drawImage(img, this.x, this.y, this.w, this.h)
    }
    
    des_quad(){
    des.fillStyle = this.a
    des.fillRect(this.x, this.y, this.w, this.h)
    }
    }
    
    class Player extends Obj{
    dir = 0
    vida = 5
    pontos = 0
    frame = 1
    tempo = 0
    
    mov_player(){
    this.y += this.dir
    if(this.y < 50) this.y = 50
    if(this.y > 600) this.y = 600
    }
    
    colid(objeto){
    return (this.x < objeto.x + objeto.w) &&
    (this.x + this.w > objeto.x) &&
    (this.y < objeto.y + objeto.h) &&
    (this.y + this.h > objeto.y)
    }
    
    point(objeto){
    return objeto.x <= -100
    }
    
    anim(nome){
    this.tempo += 1
    if(this.tempo > 12){
    this.tempo = 0
    this.frame +=1
    }
    if(this.frame>4) this.frame=1
    this.a = "./img/"+nome+this.frame+".png"
    }
    }
    
    class Inimigo extends Obj{
    vel = 2
    
    recomeca(){
    this.x = 1300
    this.y = Math.floor(Math.random() * (600 - 50) + 50)
    }
    
    mov_inimigo(){
    this.x -= this.vel
    if(this.x <= -200){
    this.recomeca()
    }
    }
    }
    
    class Item extends Obj{
    vel = 3
    
    recomeca(){
    this.x = 1300
    this.y = Math.floor(Math.random() * (600 - 50) + 50)
    }
    
    mov_item(){
    this.x -= this.vel
    if(this.x <= -100){
    this.recomeca()
    }
    }
    }
    
    class Fundo extends Obj{
    mov_fundo(){
    this.x -= 6
    if(this.x < -60){
    this.x = 1300
    }
    }
    }
    
    class Text{
    des_text(text,x,y,cor,font){
    des.fillStyle = cor
    des.lineWidth = '5'
    des.font = font
    des.fillText(text,x,y)
    }
    }    