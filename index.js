const songs = [
    {
        id: 1,
        fullName: 'Cazzette - Beam Me Up',
        title: 'Beam Me Up',
        artist: 'Cazzette'
    },
    {
        id: 2,
        fullName: 'Laszlo - Law Of The Jungle',
        title: 'Law Of The Jungle',
        artist: 'Laszlo'
    },
    {
        id: 3,
        fullName: 'TeZATalks - Find Me',
        title: 'Find Me',
        artist: 'TeZATalks'
    }
];

let songId = 1;

const songsList = document.querySelector('.songs-list');

const playPause = document.getElementById('play-pause');
const prev = document.querySelector('.fas.fa-backward');
const next = document.querySelector('.fas.fa-forward');

const cover = document.querySelector('.cover');
const artist = document.getElementById('artist');
const title = document.getElementById('title');

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const audio = document.querySelector('audio');

// Listing songs in songsList element
const listSongs = () => {
    songs.forEach(song => {
        if (song.id === songId)
            songsList.innerHTML += `
            <div class="song current-song">
                <img class="cover-sm" src="img/${song.fullName}.jpg">
                <div>
                    <span class="song-artist">${song.artist}</span>
                    <span> - </span>
                    <span class="song-title">${song.title}</span>
                </div>
            </div>
            `;
        else
            songsList.innerHTML += `
            <div class="song">
                <img class="cover-sm" src="img/${song.fullName}.jpg">
                <div>
                    <span class="song-artist">${song.artist}</span>
                    <span> - </span>
                    <span class="song-title">${song.title}</span>
                </div>
            </div>
            `;
    });
}

listSongs();

const songsFromList = document.querySelectorAll('.song');

// If song was clicked
songsFromList.forEach((song, index) => {
    song.addEventListener('click', () => {
        songId = index + 1;
        checkSong();
    })
});

// Play / Pause
playPause.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-play')) {
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audio.play();
    }

    else if (e.target.classList.contains('fa-pause')) {
        e.target.classList.remove('fa-pause');
        e.target.classList.add('fa-play');
        audio.pause();
    }
});

// Previous song
prev.addEventListener('click', () => {
    if (songId > 1)
        songId--;
    else songId = 3;
    checkSong();
});

// Next song
next.addEventListener('click', () => {
    if (songId < 3)
        songId++;
    else songId = 1;
    checkSong();
});

// Progress updite in time
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.target;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
    setTimer();

    if (duration === currentTime) {
        if (songId < 3)
            songId++;
        else songId = 1;
        checkSong();
    }
});

// Progress and songs current time update on click
progressContainer.addEventListener('click', (e) => {
    const containerWidth = progressContainer.clientWidth;
    audio.currentTime = (e.offsetX / containerWidth) * audio.duration;
    const percent = (e.offsetX / containerWidth) * 100;
    progress.style.width = `${percent}%`;
    setTimer();

});

// Checking song (which song should be played)
const checkSong = () => {
    songs.forEach((song, index) => {
        if (song.id === songId) {
            playPause.classList.remove('fa-play');
            playPause.classList.add('fa-pause');

            audio.src = `./audio/${song.fullName}.mp3`;
            cover.src = `./img/${song.fullName}.jpg`;
            audio.play();

            artist.innerHTML = song.artist;
            title.innerHTML = song.title;

            document.querySelectorAll('.song').forEach(i => {
                i.classList.remove('current-song');
            });
            document.querySelectorAll('.song')[index].classList.add('current-song');
        }
    });
}

// Setting timer
const setTimer = () => {
    const min = Math.floor(audio.currentTime / 60);
    const sec = Math.floor(audio.currentTime) % 60;
    if (min < 10) minutes.innerText = `0${min}`;
    else minutes.innerText = min;
    if (sec < 10) seconds.innerText = `0${sec}`;
    else seconds.innerText = sec;
}