class Telas {

    constructor() {
        this.brilho = 0
        this.brilhoDir = 1
        this.flashVermelho = 0
    }

    // Atualiza animações
    atualiza() {
        // Animação do brilho do título
        this.brilho += 0.02 * this.brilhoDir
        if (this.brilho >= 1) this.brilhoDir = -1
        if (this.brilho <= 0) this.brilhoDir = 1

        // Flash vermelho diminui
        if (this.flashVermelho > 0) this.flashVermelho -= 0.05
    }

    // Ativa flash vermelho ao perder vida
    ativar_flash() {
        this.flashVermelho = 1
    }

    // Desenha fundo gradiente estilo Pokémon
    desenha_fundo_menu() {
        let grad = des.createLinearGradient(0, 0, 0, 700)
        grad.addColorStop(0, '#0d0221')
        grad.addColorStop(0.5, '#1a0845')
        grad.addColorStop(1, '#0d0221')
        des.fillStyle = grad
        des.fillRect(0, 0, 1200, 700)

        // Estrelas animadas
        des.fillStyle = 'rgba(255,255,255,0.6)'
        let estrelas = [
            [100,80],[250,40],[400,90],[600,30],[800,70],[1000,50],[1100,90],
            [150,200],[350,150],[550,180],[750,120],[950,160],[1050,200],
            [200,350],[450,300],[700,320],[900,280],[1150,340],
            [80,500],[300,480],[500,520],[700,460],[900,500],[1100,480],
            [60,150],[180,320],[420,210],[680,440],[820,180],[970,390],[1080,260],
            [330,560],[570,620],[740,580],[890,640],[1020,550]
        ]
        estrelas.forEach(([x, y], i) => {
            let alpha = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 1000 + i * 0.5))
            des.globalAlpha = alpha
            des.beginPath()
            des.arc(x, y, 2, 0, Math.PI * 2)
            des.fill()
        })
        des.globalAlpha = 1

        // Pokébola decorativa sutil
        des.globalAlpha = 0.03
        des.beginPath()
        des.arc(600, 350, 300, 0, Math.PI * 2)
        des.fillStyle = 'white'
        des.fill()
        des.globalAlpha = 1
    }

    // Desenha botão estilo pixel
    desenha_botao(texto, x, y, cor) {
        des.fillStyle = this.escurece(cor)
        des.fillRect(x - 200, y - 35, 400, 60)
        des.fillStyle = cor
        des.fillRect(x - 200, y - 40, 400, 60)
        des.fillStyle = 'rgba(255,255,255,0.2)'
        des.fillRect(x - 200, y - 40, 400, 10)
        des.fillStyle = '#0d0221'
        des.font = '16px "Press Start 2P"'
        des.textAlign = 'center'
        des.textBaseline = 'middle'
        des.fillText(texto, x, y - 10)
        des.textBaseline = 'alphabetic'
    }

    // Escurece cor para sombra do botão
    escurece(cor) {
        let map = {
            '#FFD700': '#b39700',
            '#4fc3f7': '#2196f3',
            '#81c784': '#4caf50',
            '#e53935': '#b71c1c',
        }
        return map[cor] || '#333'
    }

    // Desenha HUD do jogo (vidas em corações + barra semitransparente)
    desenha_hud(pontos, vidas, fase) {
        // Barra semitransparente no topo
        des.fillStyle = 'rgba(0,0,0,0.5)'
        des.fillRect(0, 0, 1200, 55)

        // Corações de vida
        for (let i = 0; i < 5; i++) {
            des.font = '24px Arial'
            des.textBaseline = 'middle'
            des.fillStyle = i < vidas ? '#e53935' : 'rgba(255,255,255,0.2)'
            des.fillText('❤️', 20 + i * 35, 27)
        }
        des.textBaseline = 'alphabetic'

        // Fase
        des.fillStyle = 'white'
        des.font = '16px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('FASE ' + fase, 600, 35)

        // Pontos
        des.fillStyle = '#FFD700'
        des.font = '16px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText('PTS: ' + pontos, 1180, 35)

        des.textAlign = 'left'
    }

    // Flash vermelho ao perder vida
    desenha_flash() {
        if (this.flashVermelho > 0) {
            des.fillStyle = 'rgba(229,57,53,' + this.flashVermelho * 0.4 + ')'
            des.fillRect(0, 0, 1200, 700)
        }
    }

    // Tela do menu inicial
    desenha_menu() {
        this.desenha_fundo_menu()

        // Brilho animado atrás do título
        let alpha = 0.05 + 0.05 * Math.abs(Math.sin(Date.now() / 800))
        des.fillStyle = 'rgba(255,215,0,' + alpha + ')'
        des.beginPath()
        des.arc(600, 150, 250, 0, Math.PI * 2)
        des.fill()

        // Título com brilho animado
        let brilhoAlpha = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800))
        des.fillStyle = '#b39700'
        des.font = 'bold 52px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('PokéRush Run', 603, 153)
        des.fillStyle = `rgba(255, 215, 0, ${brilhoAlpha})`
        des.fillText('PokéRush Run', 600, 150)

        // Subtítulo
        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Desvie das pedras e capture os Pokémons!', 600, 210)

        // Botões
        this.desenha_botao('▶ JOGAR', 600, 320, '#FFD700')
        this.desenha_botao('📖 MANUAL', 600, 420, '#4fc3f7')
        this.desenha_botao('ℹ️ SOBRE', 600, 520, '#81c784')

        des.textAlign = 'left'
    }

    // Tela do manual de instruções
    desenha_manual() {
        this.desenha_fundo_menu()

        des.fillStyle = '#FFD700'
        des.font = '22px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('📖 MANUAL', 600, 55)

        let linhas = [
            { texto: '🎮 CONTROLES', cor: '#4fc3f7', tamanho: '14px' },
            { texto: 'W / Seta cima  >>  Mover para cima', cor: 'white', tamanho: '11px' },
            { texto: 'S / Seta baixo  >>  Mover para baixo', cor: 'white', tamanho: '11px' },
            { texto: '', cor: 'white', tamanho: '11px' },
            { texto: '❤️ VIDAS', cor: '#4fc3f7', tamanho: '14px' },
            { texto: 'Voce comeca com 5 vidas', cor: 'white', tamanho: '11px' },
            { texto: 'Pedra = -1 vida', cor: '#e53935', tamanho: '11px' },
            { texto: '', cor: 'white', tamanho: '11px' },
            { texto: '⭐ PONTUACAO', cor: '#4fc3f7', tamanho: '14px' },
            { texto: 'Capturar Pokemon = +10 pts e +1 vida', cor: 'white', tamanho: '11px' },
            { texto: 'Pedra que passa = +5 pts', cor: 'white', tamanho: '11px' },
            { texto: '', cor: 'white', tamanho: '11px' },
            { texto: '🗺️ FASES', cor: '#4fc3f7', tamanho: '14px' },
            { texto: 'Fase 1: 0pts  Fase 2: 300pts  Fase 3: 600pts. O jogo acaba quando o usuário chegar a 1000 pontos 👑', cor: 'white', tamanho: '10px' },
        ]

        linhas.forEach((linha, i) => {
            des.fillStyle = linha.cor
            des.font = linha.tamanho + ' "Press Start 2P"'
            des.fillText(linha.texto, 600, 105 + i * 36)
        })

        this.desenha_botao('VOLTAR', 600, 670, '#FFD700')
        des.textAlign = 'left'
    }

    // Tela sobre
    desenha_sobre() {
        this.desenha_fundo_menu()

        des.fillStyle = '#FFD700'
        des.font = '22px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('ℹ️ SOBRE', 600, 100)

        // Card desenvolvedor com borda
        des.strokeStyle = '#4fc3f7'
        des.lineWidth = 2
        des.strokeRect(300, 160, 600, 120)
        des.fillStyle = 'rgba(79,195,247,0.08)'
        des.fillRect(300, 160, 600, 120)
        des.fillStyle = '#4fc3f7'
        des.font = '11px "Press Start 2P"'
        des.fillText('👨‍💻 DESENVOLVEDOR', 600, 195)
        des.fillStyle = 'white'
        des.font = '18px "Press Start 2P"'
        des.fillText('Paulo Otavio', 600, 245)

        // Card professor com borda
        des.strokeStyle = '#81c784'
        des.lineWidth = 2
        des.strokeRect(300, 310, 600, 120)
        des.fillStyle = 'rgba(129,199,132,0.08)'
        des.fillRect(300, 310, 600, 120)
        des.fillStyle = '#81c784'
        des.font = '11px "Press Start 2P"'
        des.fillText('🎓 PROFESSOR ORIENTADOR', 600, 345)
        des.fillStyle = 'white'
        des.font = '18px "Press Start 2P"'
        des.fillText('Prof. Carlos', 600, 395)

        // Disciplina
        des.fillStyle = 'rgba(255,255,255,0.5)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Programacao Orientada a Objetos', 600, 490)

        this.desenha_botao('VOLTAR', 600, 620, '#FFD700')
        des.textAlign = 'left'
    }

    // Tela de vitória
    desenha_vitoria(pontos, vidas) {
        this.desenha_fundo_menu()

        // Brilho atrás do título
        des.fillStyle = 'rgba(255,215,0,0.07)'
        des.beginPath()
        des.arc(600, 200, 200, 0, Math.PI * 2)
        des.fill()

        // Título com sombra
        des.fillStyle = '#b39700'
        des.font = '48px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('🏆 VENCEU!', 603, 193)
        des.fillStyle = '#FFD700'
        des.fillText('🏆 VENCEU!', 600, 190)

        des.fillStyle = 'white'
        des.font = '11px "Press Start 2P"'
        des.fillText('Parabens! Voce completou as 3 fases!', 600, 280)

        des.fillStyle = '#FFD700'
        des.font = '14px "Press Start 2P"'
        des.fillText('PONTOS: ' + pontos, 600, 340)

        // Vidas restantes
        des.fillStyle = 'white'
        des.font = '11px "Press Start 2P"'
        des.fillText('Vidas restantes:', 600, 390)
        for (let i = 0; i < vidas; i++) {
            des.font = '24px Arial'
            des.textAlign = 'center'
            des.fillText('❤️', 490 + i * 40, 420)
        }

        this.desenha_botao('JOGAR NOVAMENTE', 600, 500, '#FFD700')
        this.desenha_botao('MENU', 600, 590, '#81c784')

        des.textAlign = 'left'
    }

    // Tela de derrota
    desenha_derrota(pontos, fase) {
        this.desenha_fundo_menu()

        // Brilho atrás do título
        des.fillStyle = 'rgba(229,57,53,0.07)'
        des.beginPath()
        des.arc(600, 200, 200, 0, Math.PI * 2)
        des.fill()

        // Título com sombra
        des.fillStyle = '#7f0000'
        des.font = '48px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('GAME OVER', 603, 193)
        des.fillStyle = '#e53935'
        des.fillText('GAME OVER', 600, 190)

        des.fillStyle = 'white'
        des.font = '11px "Press Start 2P"'
        des.fillText('Voce perdeu todas as vidas!', 600, 280)

        des.fillStyle = '#4fc3f7'
        des.font = '14px "Press Start 2P"'
        des.fillText('PONTOS: ' + pontos, 600, 340)

        // Fase em que perdeu
        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Voce chegou ate a fase ' + fase, 600, 395)

        this.desenha_botao('JOGAR NOVAMENTE', 600, 480, '#FFD700')
        this.desenha_botao('MENU', 600, 570, '#81c784')

        des.textAlign = 'left'
    }
}