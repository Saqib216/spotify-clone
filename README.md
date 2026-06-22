# Spotify Clone

A fully functional web-based music streaming application that replicates Spotify's core features. Built with vanilla HTML, CSS, and JavaScript using dynamic JSON-based playlist management.

## 🎵 Live Demo

Visit: [saqib-spotify.netlify.app](https://saqib-spotify.netlify.app)

## 📋 Project Overview

This is a single-page music player that mimics Spotify's interface and functionality. Users can browse playlists, select songs, and control playback with a sleek dark-themed UI. All playlist and song data is dynamically loaded from JSON files, making it easy to add new content without modifying the HTML.

## ✨ Key Features

### Core Playback
- **Play/Pause/Next/Previous Controls** — Full playback control from the playbar
- **Seek Bar with Time Display** — Click anywhere on the seek bar to jump to that timestamp
- **Current Time & Duration** — Real-time display of song progress and total duration
- **Song Queue Navigation** — Next button plays the next song in the current playlist
- **Auto Play Next** — When a song finishes, it automatically plays the next track

### Playlist Management
- **Dynamic Playlist Loading** — Playlists are loaded from `playlists.json`
- **Playlist Cards** — Visual cards with cover images, titles, and descriptions
- **Click-to-Play** — Click the play icon on any playlist card to start playing
- **Song List Display** — Left sidebar shows all songs in the currently selected playlist

### Audio Controls
- **Volume Control** — Adjustable volume slider (0-100%)
- **Mute/Unmute** — Click the volume icon to toggle mute; previous volume is restored
- **Visual Feedback** — Volume icon changes based on volume level (HiVolume/mute SVGs)

### User Interface
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Hamburger Menu** — Mobile navigation that toggles the left sidebar
- **Active Song Highlighting** — Currently playing song is highlighted in green
- **Search Bar** — Styled search interface (ready for future enhancement)
- **Navbar with Actions** — Premium, Support, Download, Install App, Sign up, Log in buttons

### Technical Features
- **Time Formatting** — Automatically converts seconds to MM:SS format
- **JSON-Based Content Management** — No hardcoded data; all content from JSON files
- **Smooth Animations** — CSS transitions on hover and interactions
- **Custom Scrollbar** — Styled scrollbar matching the dark theme
- **Auto-Play on Card Click** — Optional: play icon on playlist cards triggers playback

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Poppins font, custom CSS variables
- **Data Management:** JSON files for playlists and songs
- **Audio:** HTML5 Audio API
- **Icons:** Custom SVGs
- **Hosting:** Netlify

---

## 📁 Project Structure

```
spotify-clone/
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
    ├── Arijit/            # Playlist folder (example)
    │   ├── cover.jpg      # Playlist cover image
    │   ├── info.json      # {"title": "...", "description": "..."}
    │   ├── songs.json     # List of all songs in this playlist
    │   ├── Song1.mp3
    │   ├── Song2.mp3
    │   └── ...
    │
    ├── BestHits/       # Another playlist
    │   ├── cover.jpg
    │   ├── info.json
    │   ├── songs.json
    │   └── *.mp3
    │
    └── ... (more playlists)
```

---

## 📂 JSON File Structure

### `Songs/playlists.json`
```json
["Arijit", "BestHits", "Faheem Abdullah", "Soulful Nasheeds"]
```
Simple array of playlist folder names.

### `Songs/{PlaylistName}/info.json`
```json
{
  "title": "Arijit Singh - Best Hits",
  "description": "Collection of Arijit Singh's most popular songs"
}
```

### `Songs/{PlaylistName}/songs.json`
```json
[
  "Afsos.mp3",
  "Mann Mera.mp3",
  "Sajde.mp3"
]
```
Array of song filenames (with .mp3 extension).

---

## 🎯 Core Functionality Breakdown

### 1. **Playlist Loading** (`displayAlbums()`)
- Fetches `playlists.json` to get all playlist folder names
- For each playlist, fetches `info.json` to get title and description
- Creates dynamic card elements with cover image, title, and description
- Adds click listeners to each card

### 2. **Song List Display** (`showSongList()`)
- When a playlist card is clicked, fetches `songs.json` for that playlist
- Dynamically creates `<li>` elements for each song
- Each song has: thumbnail, play icon, and song name
- Clicking a song plays it (or plays immediately if play icon is clicked)

### 3. **Playback Control**
- **Play/Pause:** Toggle button updates icon and audio element state
- **Next:** Finds current song index and plays the next one
- **Previous:** Finds current song index and plays the previous one
- **Auto-Next:** When song ends, automatically plays the next track

### 4. **Seek Bar**
- Tracks song progress in real-time
- Click to seek to a specific time
- Displays current time and total duration

### 5. **Volume Control**
- Slider from 0-100 (mapped to 0.0-1.0 for audio API)
- Mute button saves previous volume and restores it when unmuted
- Icon changes based on volume level

---

## 🚀 How to Add New Playlists

1. **Create a new folder** in the `Songs/` directory:
   ```
   Songs/YourPlaylistName/
   ```

2. **Add `info.json`:**
   ```json
   {
     "title": "Your Playlist Title",
     "description": "A short description of the playlist"
   }
   ```

3. **Add `songs.json`:**
   ```json
   [
     "Song1.mp3",
     "Song2.mp3",
     "Song3.mp3"
   ]
   ```

4. **Add media files:**
   - Place all MP3 files (matching names in `songs.json`)
   - Add `cover.jpg` (playlist cover image)

5. **Update `Songs/playlists.json`:**
   ```json
   ["Arijit", "ArijitSingh", "YourPlaylistName"]
   ```

6. **Refresh the app** — new playlist appears instantly!

---

## 📱 Responsive Breakpoints

| Breakpoint | Device | Changes |
|---|---|---|
| 1200px | Desktop XL | Logo repositioning, search box width adjustment |
| 992px | Tablet/Desktop | Hamburger menu appears, left sidebar slides on mobile, reduced button sizes |
| 700px | Tablet | Search bar simplified, buttons further reduced |
| 535px | Mobile | Full mobile layout, hamburger-only navigation, stacked playbar |

**Mobile Features:**
- Hamburger menu toggles left sidebar slide
- Reduced font sizes and button sizes
- Optimized layout for small screens
- Playbar buttons stacked vertically on ultra-small screens

---

## 🎨 Design Highlights

- **Color Scheme:** Black background (`#000000`), dark grey components (`#1f1f1f`, `#2a2a2a`)
- **Accent Color:** Spotify green (`#1DB954`) for play buttons and highlights
- **Typography:** Poppins font for a clean, modern look
- **Hover Effects:** Smooth scale transforms and color transitions
- **Animations:** CSS transitions on all interactive elements
- **Custom Scrollbar:** Dark theme-consistent scrollbar styling
- **Icons:** SVG-based icons for crisp rendering at all sizes

---

## 💡 How It Works — JavaScript Flow

```
1. main() function executes on page load
   ├─ Calls getSongs("Songs/Arijit") → loads default playlist
   ├─ Calls showSongList(songs) → displays songs in left sidebar
   ├─ Calls displayAlbums() → creates playlist cards dynamically
   └─ Adds event listeners to all controls

2. User clicks a playlist card
   ├─ getSongs() fetches songs.json for that playlist
   ├─ showSongList() populates the sidebar with songs
   └─ Optional: playMusic() starts playing if play icon clicked

3. User clicks a song
   ├─ playMusic() loads the MP3 file to audio element
   ├─ songTextColorToggle() highlights the song in green
   └─ On mobile: hamburger menu closes automatically

4. User clicks play/pause/next/previous
   ├─ Audio element pauses/plays
   ├─ Playbar updates with icons
   ├─ Time updates in real-time (timeupdate event)
   └─ highlightCurrentSong() keeps the green highlight updated

5. Song finishes
   ├─ timeupdate event detects end (currentTime === duration)
   ├─ playNextSong() automatically plays next track
   └─ Green highlight moves to the next song
```

---

## ⚙️ Key JavaScript Functions

| Function | Purpose |
|---|---|
| `main()` | Initializes app, loads default playlist, adds all listeners |
| `displayAlbums()` | Fetches and creates playlist cards dynamically |
| `getSongs(folder)` | Fetches songs.json for a specific playlist folder |
| `showSongList(songs)` | Populates left sidebar with song list |
| `playMusic(track, toPlay)` | Loads a song and optionally plays it |
| `playNextSong()` | Plays the next song in queue |
| `highlightCurrentSong()` | Green-highlights the currently playing song |
| `songTextColorToggle(item)` | Toggles 'playing' class for green text |
| `formatTime(seconds)` | Converts seconds to MM:SS format |
| `leftPanelSlide()` | Toggles hamburger menu on mobile |

---

## 🔊 Audio API Integration

```javascript
// HTML5 Audio Element
const currentSong = new Audio;
currentSong.src = `./Songs/Playlist/Song.mp3`;
currentSong.volume = 0.5;  // 0 to 1
currentSong.play();        // Play
currentSong.pause();       // Pause
currentSong.currentTime = 30;  // Seek to 30 seconds

// Events
currentSong.addEventListener("timeupdate", () => {
  // Fired continuously while playing
  console.log(currentSong.currentTime, currentSong.duration);
});
```

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saqib216/spotify-clone.git
   cd spotify-clone
   ```

2. **Open `index.html` in your browser:**
   - Use VS Code Live Server
   - Or double-click `index.html`
   - Or run a local server: `python -m http.server 8000`

3. **Ensure folder structure is correct:**
   - `Songs/` folder with playlists
   - `Assets/` folder with SVG icons
   - All JSON files in place

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|---|---|
| Songs not loading | Check `Songs/` folder structure and ensure all `songs.json` files exist |
| Playlist cards don't appear | Verify `Songs/playlists.json` has correct folder names |
| Audio plays but no time updates | Check browser console for fetch errors; confirm `.mp3` files exist |
| Seek bar not working | Verify `currentSong.duration` is loading (may need to wait for audio metadata) |
| Mobile menu doesn't work | Check viewport width detection; test in DevTools mobile mode |

---

## 📈 Future Enhancements

- [ ] Search functionality to filter songs/playlists
- [ ] Favorites/liked songs with localStorage
- [ ] Shuffle and repeat modes
- [ ] Playlist creation and custom playlists
- [ ] Song duration display in playlist view
- [ ] Keyboard shortcuts (Space to play, Arrow keys to next/prev)
- [ ] Dark/Light theme toggle
- [ ] Backend integration for dynamic song uploads
- [ ] User authentication

---

## 📧 Contact

- **GitHub:** [github.com/Saqib216](https://github.com/Saqib216)
- **Portfolio:** [saqib-portfo.netlify.app](https://saqib-portfo.netlify.app)
- **Instagram:** [@itx.saqib.hussnain](https://instagram.com/itx.saqib.hussnain)
- **LinkedIn:** [saqib-hussnain](https://linkedin.com/in/saqib-hussnain)
---

## 📝 License

This project is open source and available for educational and personal use.

---

**Made with ❤️ by Saqib Hussnain**

*A project to master vanilla JavaScript, HTML5 Audio API, and responsive web design.*