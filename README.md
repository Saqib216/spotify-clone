# SoundPulse

A web-based music streaming interface built with vanilla HTML, CSS, and JavaScript, using dynamic JSON-based playlist management. Inspired by modern music streaming UIs, built as a learning project to master the HTML5 Audio API and responsive design.

> **Disclaimer:** This is an independent, non-commercial learning project. It is not affiliated with, endorsed by, or connected to Spotify or any other streaming service.

## Live Demo

Visit: [soundpulse-nine.vercel.app](https://soundpulse-nine.vercel.app)

## Project Overview

SoundPulse is a single-page music player with playlist browsing, song selection, and full playback control, wrapped in a dark, cyan-accented UI. All playlist and song data loads dynamically from JSON files, so new content can be added without touching the HTML.

## Key Features

### Core Playback
- Play/Pause/Next/Previous controls from the playbar
- Seek bar with live time display, click anywhere to jump to a timestamp
- Real-time current time and duration display
- Auto-play next track when a song finishes

### Playlist Management
- Playlists load dynamically from `playlists.json`
- Playlist cards with cover images, titles, and descriptions
- Click-to-play from playlist cards
- Left sidebar song list for the selected playlist

### Audio Controls
- Volume slider (0-100%)
- Mute/unmute with previous volume restored on unmute
- Volume icon updates based on level

### User Interface
- Fully responsive layout, tested down to small mobile screens
- Slide-out sidebar on mobile via hamburger menu, closes on outside click
- Currently playing song highlighted in accent color
- Frosted glass navbar with search, install prompt, and auth buttons

### Technical Features
- Time formatting (seconds to MM:SS)
- Fully JSON-driven content, no hardcoded playlist data
- Smooth CSS transitions across hover and interaction states
- Custom scrollbar styling matching the theme

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Font:** Plus Jakarta Sans
- **Data Management:** JSON files for playlists and songs
- **Audio:** HTML5 Audio API
- **Icons:** Custom SVGs
- **Hosting:** Vercel

---

## Project Structure

```
soundpulse/
│
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet (500+ lines)
│   └── utility.css        # Utility classes & scrollbar styling
│
├── js/
│   └── script.js          # All JavaScript functionality
│
├── Assets/                # SVG icons & images
│   ├── favicon.ico
│   ├── play.svg
│   ├── pause.svg
│   ├── next.svg
│   ├── previous.svg
│   ├── mute.svg
│   ├── HiVolume.svg
│   ├── hamburger.svg
│   └── songImage.jpg      # Placeholder song cover
│
└── Songs/                 # Playlist data
    ├── playlists.json     # List of all playlists
    │
    ├── Collection1/            # Playlist folder (example)
    │   ├── cover.jpg      # Playlist cover image
    │   ├── info.json      # {"title": "...", "description": "..."}
    │   ├── songs.json     # List of all songs in this playlist
    │   ├── Song1.mp3
    │   ├── Song2.mp3
    │   └── ...
    │
    ├── Collection2/       # Another playlist
    │   ├── cover.jpg
    │   ├── info.json
    │   ├── songs.json
    │   └── *.mp3
    │
    └── ... (more playlists)
```

---

## JSON File Structure

### `Songs/playlists.json`
```json
["Collection1", "Collection2", "Collection3", "Collection4"]
```
Array of playlist folder names.

### `Songs/{PlaylistName}/info.json`
```json
{
  "title": "Playlist Title",
  "description": "A short description of the playlist"
}
```

### `Songs/{PlaylistName}/songs.json`
```json
[
  "Song1.mp3",
  "Song2.mp3"
]
```
Array of song filenames.

---

## Core Functionality Breakdown

### 1. Playlist Loading (`displayAlbums()`)
Fetches `playlists.json`, then for each playlist fetches `info.json` to build a playlist card with cover, title, and description.

### 2. Song List Display (`showSongList()`)
On playlist card click, fetches `songs.json` and renders the song list in the left sidebar, each with a thumbnail and play icon.

### 3. Playback Control
Play/Pause toggles the audio element and icon state. Next/Previous find the current song's index and move accordingly. Auto-next fires when the current track ends.

### 4. Seek Bar
Tracks progress in real time, click-to-seek, shows current time and total duration.

### 5. Volume Control
Slider mapped from 0-100 to 0.0-1.0 for the Audio API. Mute stores the last volume and restores it on unmute.

### 6. Mobile Sidebar
Hamburger toggles the sidebar slide-in on screens under 992px. Clicking anywhere outside the open sidebar (and not on the hamburger itself) closes it automatically.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| 992px | Sidebar becomes a slide-in panel, hamburger menu appears, secondary nav buttons hidden |
| 600px | Search bar collapses to an icon, playbar stacks vertically, volume control hidden |

---

## Design Highlights

- **Color Scheme:** Deep navy/near-black background, panel surfaces in dark slate
- **Accent Color:** Cyan-to-blue gradient for active states, play buttons, and highlights
- **Typography:** Plus Jakarta Sans
- **Effects:** Backdrop blur on navbar and playbar, soft glow on hover states
- **Icons:** SVG-based for crisp rendering at all sizes

---

## Key JavaScript Functions

| Function | Purpose |
|---|---|
| `main()` | Initializes the app, loads the default playlist, wires up all listeners |
| `displayAlbums()` | Fetches and renders playlist cards |
| `getSongs(folder)` | Fetches `songs.json` for a given playlist |
| `showSongList(songs)` | Populates the sidebar with the song list |
| `playMusic(track, toPlay)` | Loads and optionally plays a track |
| `playNextSong()` | Advances to the next track in queue |
| `highlightCurrentSong()` | Highlights the currently playing song |
| `formatTime(seconds)` | Converts seconds to MM:SS |
| `leftPanelSlide()` | Toggles the mobile sidebar |

---

## Audio API Integration

```javascript
const currentSong = new Audio;
currentSong.src = `./Songs/Playlist/Song.mp3`;
currentSong.volume = 0.5;
currentSong.play();
currentSong.pause();
currentSong.currentTime = 30;

currentSong.addEventListener("timeupdate", () => {
  console.log(currentSong.currentTime, currentSong.duration);
});
```

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Saqib216/soundpulse.git
   cd soundpulse
   ```

2. Open `index.html` in your browser, or run a local server:
   ```bash
   python -m http.server 8000
   ```

3. Make sure the `Songs/` and `Assets/` folders and their JSON files are in place.

---

## Common Issues

| Issue | Solution |
|---|---|
| Songs not loading | Check the `Songs/` folder structure and confirm `songs.json` exists for that playlist |
| Playlist cards don't appear | Verify `Songs/playlists.json` has the correct folder names |
| Seek bar not working | Confirm `currentSong.duration` has loaded before seeking |
| Mobile sidebar doesn't close | Check that the outside-click listener is attached after `main()` runs |

---

## Future Enhancements

- [ ] Search functionality to filter songs and playlists
- [ ] Favorites with localStorage
- [ ] Shuffle and repeat modes
- [ ] Keyboard shortcuts (space to play, arrow keys for next/prev)

---

## Contact

- **GitHub:** [github.com/Saqib216](https://github.com/Saqib216)
- **Portfolio:** [saqib-portfo.netlify.app](https://saqib-hussnain.vercel.app)
- **Instagram:** [@itx.saqib.hussnain](https://instagram.com/itx.saqib.hussnain)
- **LinkedIn:** [saqib-hussnain](https://linkedin.com/in/saqib-hussnain)

---

## License

This project is open source and available for educational and personal use.

---

**Made by Saqib Hussnain**

*A project built to master vanilla JavaScript, the HTML5 Audio API, and responsive web design.*