const playPB = document.getElementById("playPB");
const prevPB = document.getElementById("prevPB");
const nextPB = document.getElementById("nextPB");
let volumeBar = document.querySelector(".volume").
    getElementsByTagName("input")[0];
const HiVolume = document.querySelector(".volume>img");
let songs;
const currentSong = new Audio;
currentSong.volume = 0.5;
let currFolder;
let previousVolume;
const viewportWidth = window.innerWidth;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }
    return `${minutes}:${secs}`;
}

function leftPanelSlide() {
    // to slide the left panel whenever the hamburger or any playlist is clicked:
    const leftPanel = document.querySelector(".left");
    if (leftPanel.style.left == "0%") {
        leftPanel.style.left = "-120%";
        leftPanel.style.backgroundColor = "";
    } else {
        leftPanel.style.left = "0%";
        leftPanel.style.backgroundColor = "#1a1a1a";
    }
}

function playNextSong() {
    let index = songs.indexOf(decodeURI(currentSong.src.split('/').slice(-1)[0]));
    console.log(index);
    if ((index + 1) < songs.length) {
        playMusic((songs[index + 1]), true);
    }
}

const playMusic = (track, toPlay = false) => {
    currentSong.src = `./${currFolder}/` + track.replace(".mp3", "") + ".mp3";
    // console.log(currentSong.src);
    if (toPlay) {
        currentSong.play();
        playPB.src = "Assets/pause.svg";
    } else {
        playPB.src = "Assets/play.svg";
    }

    document.querySelector(".circle").style.opacity = "1";
    document.querySelector(".playBar").style.opacity = "1";
}

async function getSongs(folder) {
    currFolder = folder;

    let res = await fetch(`./${currFolder}/songs.json`);
    let songs = await res.json();

    return songs;
}

function showSongList(songs) {
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
    
                        <div class="playNow">
                            <img src="Assets/play.svg" alt="">
                        </div>
                        <div class="songImg">
                            <img src="Assets/songImage.jpg" alt="">
                        </div>
                        <div>${song.replace(".mp3", "")}</div>
         </li>`;
    }

    // Adding event listener to each songList's li(song)
    let songLi_s = document.querySelector(".songList").getElementsByTagName("li");
    Array.from(songLi_s).forEach(e => {
        e.addEventListener("click", (element) => {
            // console.log(songLi_s);
            // console.log(e);
            // console.log(e.lastElementChild.innerHTML);
            // console.log(element.target, element.target.tagName);
            // console.log(element.target.parentElement.classList.contains("playNow"));
            if (viewportWidth <= 992) {
                leftPanelSlide();
            }
            if (element.target.tagName === 'IMG' && element.target.parentElement.classList.contains("playNow")) {
                playMusic((e.lastElementChild.innerHTML), true);
            }
            else {
                playMusic(e.lastElementChild.innerHTML);
            }
        })
    });
}

async function displayAlbums() {
    let res = await fetch(`./Songs/playlists.json`);
    let folders = await res.json();

    for (let folderName of folders) {
        let infoRes = await fetch(`./Songs/${folderName}/info.json`);
        let response = await infoRes.json();

        let cardContainer = document.querySelector(".cardContainer");

        cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folderName}" class="card">
            <div class="songImage">
                <img src="./Songs/${folderName}/cover.jpg" alt="">
            </div>
            <div class="playButton">
                <img src="Assets/play.svg" alt="">
            </div>
            <h3>${response.title}</h3>
            <p>${response.description}</p>
        </div>`;
    }

    // Show the respective songList whenever any card(playlist) is clicked.
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async (item) => {
            if (viewportWidth <= 992) {
                leftPanelSlide();
            }
            songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
            showSongList(songs);

            if (item.target.tagName === 'IMG' && item.target.parentElement.classList.contains('playButton')) {
                playMusic((songs[0]), true);
            }
        });
    });
}

async function main() {
    // Get the list of the songs:
    songs = await getSongs("Songs/Arijit");

    // Show the songList in the library 
    showSongList(songs);

    // Creating Dynamic Albums on the CardContainer Section
    displayAlbums();

    // Setting default song when refreshing the website:
    // playMusic(songs[0], true);

    // Adding event listener to playPB(playButton) of playBar.
    playPB.addEventListener("click", (e) => {
        if (currentSong.paused) {
            currentSong.play();
            playPB.src = "Assets/pause.svg";
        }
        else {
            currentSong.pause();
            playPB.src = "Assets/play.svg";
        }
    }
    )

    // Adding event listener to prevPB(previousButton) of playBar.
    prevPB.addEventListener("click", (e) => {
        // console.log(songs);
        // console.log(currentSong, currentSong.src);
        // console.log(decodeURI(currentSong.src.split('/').slice(-1)[0]));
        let index = songs.indexOf(decodeURI(currentSong.src.split('/').slice(-1)[0])); // use of [0] here? and why we used slice and why split('/')[-1] didn't work?
        // console.log(index);
        if ((index - 1) >= 0) {
            playMusic((songs[index - 1]), true);
        }
    }
    )

    // Adding event listener to nextPB(nextButton) of playBar.
    nextPB.addEventListener("click", (e) => {
        playNextSong();
    }
    )

    // Displaying Song's CurrentTime and duration:
    currentSong.addEventListener("timeupdate", (e) => {
        // console.log(currentSong.currentTime, currentSong.duration);

        // for current Time:
        document.querySelector(".songCurrentTime").innerHTML = `${formatTime(currentSong.currentTime)}`;

        // for total time:
        document.querySelector(".songTotalTime").innerHTML = `${formatTime(currentSong.duration)}`;

        // Moving the circle of the seekBar according to the currentTime:
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

        if (currentSong.currentTime === currentSong.duration) {
            playNextSong();
        }
    });

    // Adding an event listener to seekBar to seek it:
    document.querySelector(".seekBar").addEventListener("click", (e) => {
        // console.log(e, e.offsetX, e.target.getBoundingClientRect());

        // Calculate percent as a number (0-100):
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        // Moving the seek Circle to the clicked place 
        document.querySelector(".circle").style.left = percent + "%";

        // Updating the time according to the circle place.
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    }
    )

    // Adding an event listener to volume bar
    volumeBar.addEventListener("change", (e) => {
        // console.log(e,e.target, e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100;
        if (e.target.value === '0') {
            HiVolume.src = "Assets/mute.svg";
        } else {
            HiVolume.src = "Assets/HiVolume.svg";
        }

    }
    )

    // Adding an event listener to mute the song
    HiVolume.addEventListener("click", (e) => {
        if (e.target.src.includes("HiVolume.svg")) {
            // Saving the currentVolume: 
            previousVolume = currentSong.volume;

            e.target.src = e.target.src.replace("HiVolume.svg", "mute.svg");
            // Setting the currVolume and bar to zero 
            currentSong.volume = 0;
            volumeBar.value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "HiVolume.svg");

            // Restoring the previousVolume and bar:
            currentSong.volume = previousVolume;
            volumeBar.value = previousVolume * 100;
        }
    }
    )

    // Adding an event listener to the hamBurger
    document.querySelector(".hamBurger").addEventListener("click", leftPanelSlide);
}

main();
