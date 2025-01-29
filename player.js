let sounds = [];
let totalSounds = 12;
let loadedSounds = 0;
let volume = 0.5;
let looped = false;
let shuffling = false;
let stylesToPlay;

let duration = 64000;
let playing = false;
let progress = 0;
let startTime;
let paused = false;

let styleColors = [
    '#1fb52b', // MED
    '#e823db', // MO
    '#e68b15' // SF
];

function randomsizeStyles() {
    stylesToPlay = [];
    for (let i = 0; i < 4; i++) {
        stylesToPlay.push(Math.floor(Math.random() * 3));
    }
}
randomsizeStyles();

function changeLayerStyle(layer, style) {
    stylesToPlay[layer] = style;
}

function changeStylesFromUserInput() {
    let melo1Select = document.getElementById('melo1').getElementsByTagName('select')[0];
    let melo2Select = document.getElementById('melo2').getElementsByTagName('select')[0];
    let percSelect = document.getElementById('perc').getElementsByTagName('select')[0];
    let accSelect = document.getElementById('acc').getElementsByTagName('select')[0];
    changeLayerStyle(Layers.MEL_1, melo1Select.selectedIndex);
    changeLayerStyle(Layers.MEL_2, melo2Select.selectedIndex);
    changeLayerStyle(Layers.PERC, percSelect.selectedIndex);
    changeLayerStyle(Layers.ACC, accSelect.selectedIndex);
    enableStyles(stylesToPlay);
}

function changeUserInputFromShuffle() {
    let melo1Select = document.getElementById('melo1').getElementsByTagName('select')[0];
    let melo2Select = document.getElementById('melo2').getElementsByTagName('select')[0];
    let percSelect = document.getElementById('perc').getElementsByTagName('select')[0];
    let accSelect = document.getElementById('acc').getElementsByTagName('select')[0];
    melo1Select.selectedIndex = stylesToPlay[Layers.MEL_1];
    melo2Select.selectedIndex = stylesToPlay[Layers.MEL_2];
    percSelect.selectedIndex = stylesToPlay[Layers.PERC];
    accSelect.selectedIndex = stylesToPlay[Layers.ACC];

    let melo1Color = styleColors[stylesToPlay[Layers.MEL_1]];
    let melo2Color = styleColors[stylesToPlay[Layers.MEL_2]];
    let percColor = styleColors[stylesToPlay[Layers.PERC]];
    let accColor = styleColors[stylesToPlay[Layers.ACC]];

    document.getElementById('melo1').style.backgroundColor = melo1Color;
    document.getElementById('melo2').style.backgroundColor = melo2Color;
    document.getElementById('perc').style.backgroundColor = percColor;
    document.getElementById('acc').style.backgroundColor = accColor;
}

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

function changeVolume() {
    volume = document.getElementById('volume').value / 100;
    for (let i = 0; i < stylesToPlay.length; i++) {
        sounds[getSoundIndex(stylesToPlay[i], i)].volume(volume);
    }
}

function pauseSounds() {
    playing = false;
    paused = true;
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].pause();
    }
}

function resumeSounds() {
    playing = true;
    paused = false;
    startTime = new Date().getTime() - progress / 100 * duration;
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].play();
    }
}

function playSounds() {
    if (playing) {
        stopSounds();
    }
    if (paused) {
        resumeSounds();
        return;
    }
    paused = false;
    playing = true;
    progress = 0;
    startTime = new Date().getTime();
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].play();
    }
}

function stopSounds() {
    playing = false;
    console.log("Stopping sounds");
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].stop();
    }
    progress = 0;
    document.getElementById('progress').style.width = `${progress}%`;
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
    changeUserInputFromShuffle();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateLoader() {
    let loader = document.getElementById('loader-text');
    let percentage = Math.round((loadedSounds / totalSounds) * 100);
    loader.innerText = `Loading... ${percentage}%`;
    let charNode = document.getElementById('char');
    charNode.style.marginLeft = `${percentage*0.9}%`;
    if (loadedSounds === totalSounds) {
        enableStyles(stylesToPlay);
        loader.innerText = 'Loading complete!';
        sleep(350).then(() => {
            loader.parentNode.classList.add('fade-out');
        });
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

// run a function every 100ms to update the progress bar
setInterval(function () {
    if (playing) {
        if (progress <= 100) {
            progress = (new Date().getTime() - startTime) / duration * 100;
            document.getElementById('progress').style.width = `${progress}%`;
        }
    }
}, 100);