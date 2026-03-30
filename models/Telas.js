class Telas {

    constructor() {
        this.brilho = 0
        this.brilhoDir = 1
        this.flashVermelho = 0
    }

    // Atualiza animações
    atualiza() {
        this.brilho += 0.02 * this.brilhoDir
        if (this.brilho >= 1) this.brilhoDir = -1
        if (this.brilho <= 0) this.brilhoDir = 1
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

    // Desenha HUD do jogo
    desenha_hud(pontos, vidas, fase, p2 = null) {
        des.fillStyle = 'rgba(0,0,0,0.5)'
        des.fillRect(0, 0, 1200, 60)

        // Player 1 corações
        for (let i = 0; i < 5; i++) {
            des.font = '22px Arial'
            des.textBaseline = 'middle'
            des.fillStyle = i < vidas ? '#e53935' : 'rgba(255,255,255,0.2)'
            des.fillText('❤️', 10 + i * 28, 18)
        }

        // Player 1 pontos
        if (p2) {
            des.fillStyle = '#FFD700'
            des.font = '13px "Press Start 2P"'
            des.textAlign = 'left'
            des.textBaseline = 'alphabetic'
            des.fillText('P1: ' + pontos, 10, 52)
        }

        // Fase no centro
        des.fillStyle = 'white'
        des.font = '16px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('FASE ' + fase, 600, 35)

        // Player 2
        if (p2) {
            for (let i = 0; i < 5; i++) {
                des.font = '22px Arial'
                des.textBaseline = 'middle'
                des.fillStyle = i < p2.vida ? '#4fc3f7' : 'rgba(255,255,255,0.2)'
                des.fillText('❤️', 1190 - i * 28, 18)
            }
            des.fillStyle = '#4fc3f7'
            des.font = '13px "Press Start 2P"'
            des.textAlign = 'right'
            des.textBaseline = 'alphabetic'
            des.fillText('P2: ' + p2.pontos, 1190, 52)
        } else {
            des.fillStyle = '#FFD700'
            des.font = '16px "Press Start 2P"'
            des.textAlign = 'right'
            des.fillText('PTS: ' + pontos, 1180, 35)
        }

        des.textBaseline = 'alphabetic'
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

        let alpha = 0.05 + 0.05 * Math.abs(Math.sin(Date.now() / 800))
        des.fillStyle = 'rgba(255,215,0,' + alpha + ')'
        des.beginPath()
        des.arc(600, 150, 250, 0, Math.PI * 2)
        des.fill()

        let brilhoAlpha = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800))
        des.fillStyle = '#b39700'
        des.font = 'bold 52px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('PokéRush Run', 603, 153)
        des.fillStyle = `rgba(255, 215, 0, ${brilhoAlpha})`
        des.fillText('PokéRush Run', 600, 150)

        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Desvie das pedras e capture os Pokémons!', 600, 210)

        this.desenha_botao('▶ 1 PLAYER', 600, 300, '#FFD700')
        this.desenha_botao('👥 2 PLAYERS', 600, 390, '#e53935')
        this.desenha_botao('📖 MANUAL', 600, 480, '#4fc3f7')
        this.desenha_botao('ℹ️ SOBRE', 600, 570, '#81c784')

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
            { texto: 'P1: W / S  |  P2: Seta cima / baixo', cor: 'white', tamanho: '11px' },
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
            { texto: 'Fase 1: 0pts  Fase 2: 300pts  Fase 3: 600pts', cor: 'white', tamanho: '10px' },
            { texto: 'O jogo acaba ao chegar a 1000 pontos 👑', cor: 'white', tamanho: '10px' },
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
        des.fillText('ℹ️ SOBRE', 600, 55)

        // Foto do desenvolvedor (círculo)
        des.strokeStyle = '#4fc3f7'
        des.lineWidth = 3
        des.beginPath()
        des.arc(340, 200, 65, 0, Math.PI * 2)
        des.stroke()
        des.fillStyle = 'rgba(79,195,247,0.1)'
        des.fill()

        let foto = new Image()
        foto.src = 'img/foto_paulo.png'
        des.save()
        des.beginPath()
        des.arc(340, 200, 63, 0, Math.PI * 2)
        des.clip()
        des.drawImage(foto, 277, 137, 126, 126)
        des.restore()

        // Card desenvolvedor com borda
        des.strokeStyle = '#4fc3f7'
        des.lineWidth = 2
        des.strokeRect(200, 120, 800, 185)
        des.fillStyle = 'rgba(79,195,247,0.08)'
        des.fillRect(200, 120, 800, 185)
        des.fillStyle = '#4fc3f7'
        des.font = '11px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('👨‍💻 DESENVOLVEDOR', 600, 150)
        des.fillStyle = 'white'
        des.font = '16px "Press Start 2P"'
        des.fillText('Paulo Otavio', 600, 182)
        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Tecnico em Desenvolvimento de Sistemas', 600, 207)
        // Instagram clicável
        des.fillStyle = 'rgba(255,100,200,0.9)'
        des.font = '9px "Press Start 2P"'
        des.fillText('📸 @__paulo.otv  ← clique aqui', 600, 232)
        // GitHub clicável
        des.fillStyle = 'rgba(255,255,255,0.8)'
        des.font = '9px "Press Start 2P"'
        des.fillText('🐙 GitHub: otaviok9  ← clique aqui', 600, 254)
        des.fillStyle = 'rgba(255,255,255,0.4)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Sesi Senai - 2026', 600, 276)

        // Card professor com borda
        des.strokeStyle = '#81c784'
        des.lineWidth = 2
        des.strokeRect(200, 325, 800, 120)
        des.fillStyle = 'rgba(129,199,132,0.08)'
        des.fillRect(200, 325, 800, 120)
        des.fillStyle = '#81c784'
        des.font = '11px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('🎓 PROFESSOR ORIENTADOR (PRODUCT OWNER)', 600, 353)
        des.fillStyle = 'white'
        des.font = '16px "Press Start 2P"'
        des.fillText('Prof. Carlos', 600, 388)
        des.fillStyle = 'rgba(255,255,255,0.4)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Programacao Orientada a Objetos', 600, 418)

        // Tecnologias
        des.strokeStyle = '#FFD700'
        des.lineWidth = 2
        des.strokeRect(200, 463, 800, 75)
        des.fillStyle = 'rgba(255,215,0,0.05)'
        des.fillRect(200, 463, 800, 75)
        des.fillStyle = '#FFD700'
        des.font = '10px "Press Start 2P"'
        des.fillText('🛠️ TECNOLOGIAS: HTML5 | Canvas API | JavaScript ES6+', 600, 492)
        des.fillStyle = 'rgba(255,255,255,0.4)'
        des.font = '9px "Press Start 2P"'
        des.fillText('© 2026 PokéRush Run - Todos os direitos reservados', 600, 520)

        this.desenha_botao('VOLTAR', 600, 620, '#FFD700')
        des.textAlign = 'left'
    }

    // Tela de vitória
    desenha_vitoria(pontos, vidas) {
        this.desenha_fundo_menu()

        des.fillStyle = 'rgba(255,215,0,0.07)'
        des.beginPath()
        des.arc(600, 200, 200, 0, Math.PI * 2)
        des.fill()

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
    desenha_derrota(pontosP1, fase, p2 = null) {
        this.desenha_fundo_menu()

        des.fillStyle = 'rgba(229,57,53,0.07)'
        des.beginPath()
        des.arc(600, 200, 200, 0, Math.PI * 2)
        des.fill()

        des.fillStyle = '#7f0000'
        des.font = '48px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('GAME OVER', 603, 193)
        des.fillStyle = '#e53935'
        des.fillText('GAME OVER', 600, 190)

        des.fillStyle = 'white'
        des.font = '11px "Press Start 2P"'
        des.fillText('Voce perdeu todas as vidas!', 600, 280)

        if (p2) {
            des.fillStyle = '#FFD700'
            des.font = '14px "Press Start 2P"'
            des.fillText('P1 PONTOS: ' + pontosP1, 600, 330)
            des.fillStyle = '#4fc3f7'
            des.fillText('P2 PONTOS: ' + p2.pontos, 600, 370)
        } else {
            des.fillStyle = '#4fc3f7'
            des.font = '14px "Press Start 2P"'
            des.fillText('PONTOS: ' + pontosP1, 600, 340)
        }

        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Voce chegou ate a fase ' + fase, 600, 420)

        this.desenha_botao('JOGAR NOVAMENTE', 600, 510, '#FFD700')
        this.desenha_botao('MENU', 600, 600, '#81c784')

        des.textAlign = 'left'
    }
}