let songLi_s = document.querySelector(".songList").getElementsByTagName("li");
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

let isDragging = false;
let wasPlayingBeforeDrag = false;

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

// part of drag seek functionality:
function handleDrag(e) {
    // Get seekBar reference
    const seekBar = document.querySelector(".seekBar");
    const seekBarRect = seekBar.getBoundingClientRect();

    // 1. Calculate position using clientX (mouse/touch position on screen)
    // relative to seekBar's left edge
    const mouseX = e.touches ? e.touches[0].clientX : e.clientX;
    let position = (mouseX - seekBarRect.left) / seekBarRect.width;

    // 2. multiplying by 100 to get the percentage(0-100)
    let percentage = position * 100;

    // 3. clamping the percentage in edge cases: when percentage becomes negative or more than 100%
    percentage = Math.max(0, Math.min(100, percentage));

    // 4. updating the circle position:
    document.querySelector(".circle").style.left = `${percentage}%`;

    // 5. updating the song's current time:
    currentSong.currentTime = (currentSong.duration * percentage) / 100;

    // 6. display the current time
    document.querySelector('.songCurrentTime').innerHTML = formatTime(currentSong.currentTime);
}

// part of drag seek functionality:
function stopDrag(e) {
    isDragging = false;
    if (wasPlayingBeforeDrag) {
        currentSong.play();
    }
    document.querySelector('.circle').classList.remove('dragging');

    // REMOVE event listeners (inside mouseup)
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
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

function songTextColorToggle(item) {
    // 1. When you click an li or press next or previous button, first go to ALL <li>s 
    // and remove the 'playing' tag (the sticky note).
    // This ensures no other song stays green.
    Array.from(songLi_s).forEach(li => li.classList.remove('playing'));

    // 2. Now, add the 'playing' tag ONLY to the one you just clicked, or to whatever the song is playing by your next or previous button action.
    item.classList.add('playing');
}

// Helper function for next and previous buttons to check the currentSong to be highlighted (green):
function highlightCurrentSong() {
    let currentSongName = decodeURI(currentSong.src.split('/').slice(-1)[0]).replace(".mp3", "");
    Array.from(songLi_s).forEach(li => {
        if (li.lastElementChild.innerHTML === currentSongName) {
            songTextColorToggle(li);
        }
    });
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
    Array.from(songLi_s).forEach(item => {
        item.addEventListener("click", (element) => {
            // Changing the color of song text when clicking on it:
            songTextColorToggle(item);

            if (viewportWidth <= 992) {
                leftPanelSlide();
            }
            if (element.target.tagName === 'IMG' && element.target.parentElement.classList.contains("playNow")) {
                playMusic((item.lastElementChild.innerHTML), true);
            }
            else {
                playMusic(item.lastElementChild.innerHTML);
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
                highlightCurrentSong();
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
        // Hightlighting the current song's text by green.
        highlightCurrentSong();
    }
    )

    // Adding event listener to nextPB(nextButton) of playBar.
    nextPB.addEventListener("click", (e) => {
        playNextSong();
        // Hightlighting the current song's text by green.
        highlightCurrentSong();
    }
    )

    // Displaying Song's CurrentTime and duration:
    currentSong.addEventListener("timeupdate", (e) => {
        // console.log(currentSong.currentTime, currentSong.duration);

        // for current Time:
        document.querySelector(".songCurrentTime").innerHTML = `${formatTime(currentSong.currentTime)}`;

        // for total time:
        document.querySelector(".songTotalTime").innerHTML = `${formatTime(currentSong.duration)}`;

        // Moving the circle of the seekBar according to the currentTime: (new: if user is NOT dragging the circle)
        if (!isDragging) {
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }

        if (currentSong.currentTime > 0 && currentSong.currentTime >= currentSong.duration) {
            playNextSong();
            highlightCurrentSong(); // hightlighting the next song
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

    // NEW: EVENT Listeners for the drag seek functionality:
    // 1. mousedown event to seekbar itself
    document.querySelector('.seekBar').addEventListener("mousedown", (e) => {
        isDragging = true;
        wasPlayingBeforeDrag = !currentSong.paused;        
        currentSong.pause();
        document.querySelector('.circle').classList.add('dragging');

        // 2. Handling the drag 
        document.addEventListener("mousemove", handleDrag);
        // 3. Behavior after drag stops
        document.addEventListener("mouseup", stopDrag);
    });

    // touchdown event for mobile devices
    document.querySelector('seekBar').addEventListener("touchstart", (e) => {
      isDragging = true;
      wasPlayingBeforeDrag = !currentSong.paused;
      currentSong.pause();
      document.querySelector('.circle').classList.add('dragging');

      // Handling the drag
      document.addEventListener("touchmove", handleDrag);
      // Behaviour after drag stops
      document.addEventListener("touchend", stopDrag);
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