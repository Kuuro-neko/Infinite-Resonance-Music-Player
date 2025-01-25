let sounds = [];
let totalSounds = 12;
let loadedSounds = 0;
let volume = 0.5;
let looped = false;
let shuffling = false;
let stylesToPlay;

function randomsizeStyles() {
    stylesToPlay = [];
    for (let i = 0; i < 4; i++) {
        stylesToPlay.push(Math.floor(Math.random() * 3));
    }
}
randomsizeStyles();

const Styles = {
    MED: 0,
    MO: 1,
    SF: 2
};

const Layers = {
    MEL_1: 0,
    MEL_2: 1,
    PERC: 2,
    ACC: 3
};

function pauseSounds() {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].pause();
    }
}

function playSounds() {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].play();
    }
}

function stopSounds() {
    console.log("Stopping sounds");
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].stop();
    }
}

function loopSounds() {
    looped = !looped;
    let btn = document.getElementById('loop');
    if (looped) {
        btn.classList.add('btn-activated');
    } else {
        btn.classList.remove('btn-activated');
        document.getElementById('shuffle').classList.remove('btn-activated');
    }
}

function shuffleSounds() {
    if (looped) {
        shuffling = !shuffling;
        let btn = document.getElementById('shuffle');
        if (shuffling) {
            btn.classList.add('btn-activated');
        } else {
            btn.classList.remove('btn-activated');
        }
    } else {
        randomsizeStyles();
        enableStyles(stylesToPlay);
    }
}

function getSoundIndex(style, layer) {
    return style * 4 + layer;
}

function enableStyles(stylesToPlay) {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].volume(0);
    }
    for (let i = 0; i < stylesToPlay.length; i++) {
        sounds[getSoundIndex(stylesToPlay[i], i)].volume(volume);
    }
    console.log("Styles enabled: " + stylesToPlay);
}

function updateLoader() {
    let loader = document.getElementById('loader');
    let percentage = Math.round((loadedSounds / totalSounds) * 100);
    loader.childNodes[0].innerText = `Loading... ${percentage}%`;
    if (loadedSounds === totalSounds) {
        loader.childNodes[0].innerText = 'Loading complete!';
        loader.classList.add('fade-out');
        enableStyles(stylesToPlay);
    }
}

function onLoad() {
    loadedSounds++;
    updateLoader();
}

function onLoadError() {
    loadedSounds++;
    updateLoader();
}

sounds.push(new Howl({
    src: ['audio/melo_med_1.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/melo_med_2.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/perc_med.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/acc_med.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));

sounds.push(new Howl({
    src: ['audio/melo_mo_1.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/melo_mo_2.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/perc_mo.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/acc_mo.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));

sounds.push(new Howl({
    src: ['audio/melo_sf_1.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/melo_sf_2.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/perc_sf.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));
sounds.push(new Howl({
    src: ['audio/acc_sf.ogg'],
    onload: onLoad,
    onloaderror: onLoadError
}));

sounds[0].on('end', function () {
    if (shuffling) {
        randomsizeStyles();
        enableStyles(stylesToPlay);
    }
    if (looped) {
        playSounds();
    }
});