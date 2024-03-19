const imagem = document.getElementById('cover'),
    titulo = document.getElementById('musica-titulo'),
    artista = document.getElementById('musica-artista'),
    currentTimeEl = document.getElementById('tempo-atual'),
    duracaoEl = document.getElementById('duracao'),
    progresso = document.getElementById('progresso'),
    playerProgresso = document.getElementById('player-progresso'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const musica = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Silent Debugging Sessions',
        cover: 'assets/1.jpeg',
        artist: 'Music for Coding',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Looping Dreams of Code',
        cover: 'assets/2.jpeg',
        artist: 'Music for Coding',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Midnight Algorithm Melodies',
        cover: 'assets/3.jpeg',
        artist: 'Music for Coding',
    }
];

let musicaIndex = 0;
let estaTocando = false;

function alternarPlay() {
    if (estaTocando) {
        pauseMusica();
    } else {
        playMusica();
    }
}

function playMusica() {
    estaTocando = true;
    
    playBtn.classList.replace('fa-play', 'fa-pause');
    
    playBtn.setAttribute('ttile', 'Pause');
    musica.play();
}

function pauseMusica() {
    estaTocando = false;
    
    playBtn.classList.replace('fa-pause', 'fa-play');
    
    playBtn.setAttribute('title', 'Play');
    musica.pause();
}

function carregaMusica(song) {
    musica.src = song.path;
    titulo.textContent = song.displayName;
    artista.textContent = song.artist;
    imagem.src = song.cover;
    background.src = song.cover;
}

function mudarMusica(direction) {
    musicaIndex = (musicaIndex + direction + songs.length) % songs.length;
    carregaMusica(songs[musicaIndex]);
    playMusica();
}

function atualizaProgresso() {
    const { duration, currentTime } = musica;
    const progressoPercent = (currentTime / duration) * 100;
    progresso.style.width = `${progressoPercent}%`;

    const formatoTempo = (time) => String(Math.floor(time)).padStart(2, '0');
    duracaoEl.textContent = `${formatoTempo(duration / 60)}:${formatoTempo(duration % 60)}`;
    currentTimeEl.textContent = `${formatoTempo(currentTime / 60)}:${formatoTempo(currentTime % 60)}`;
}

function setProgresso(e) {
    const width = playerProgresso.clientWidth;
    const clickX = e.offsetX;
    musica.currentTime = (clickX / width) * musica.duration;
}

playBtn.addEventListener('click', alternarPlay);
prevBtn.addEventListener('click', () => mudarMusica(-1));
nextBtn.addEventListener('click', () => mudarMusica(1));
musica.addEventListener('ended', () => mudarMusica(1));
musica.addEventListener('timeupdate', atualizaProgresso);
playerProgresso.addEventListener('click', setProgresso);

carregaMusica(songs[musicaIndex]);