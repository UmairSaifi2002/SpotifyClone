console.log('Lets Write Some JavaScript!');

let currentSong = new Audio();
let songs;
let currfolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return '00:00'
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`
}

async function getsongs(folder) {
    currfolder = folder 
    let a = await fetch(`http://127.0.0.1:3000/${currfolder}/`)
    let response = await a.text()
    // console.log(response);    
    let elem = document.createElement('div')
    elem.innerHTML = response;
    let as = elem.getElementsByTagName('a')
    // console.log(as);
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split(`/${currfolder}/`)[1])
        }
    }
    // console.log(songs);
    // return songs
    // this
    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0]
    songUL.innerHTML = ''
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        <li>
                            <img style="width: 40px;" class="invert musicLogo" src="music.svg" alt="current music">
                            <div class="info">
                                <div>${song.replaceAll('%20', ' ')}</div>
                                <div>Umair</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img style="width: 30px;" class="invert" src="play.svg" alt="">
                            </div>
                        </li>`
    }
    // this
    // Attach an event listener to each song
    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e => {
        // console.log(e.querySelector('.info').firstElementChild.innerHTML);
        e.addEventListener('click', element => {
            // console.log(e.querySelector('.info').firstElementChild.innerHTML);
            PlayMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
        })
    })
    
}

const PlayMusic = (song, pause = false) => {
    currentSong.src = `/${currfolder}/` + song
    if (!pause){   
        currentSong.play()
        play.src = 'pause.svg'
    }
    document.querySelector('.songinfo').innerHTML = decodeURI(song)
    document.querySelector('.songtime').innerHTML = '00:00 / 00:00'
}

async function displayAlbums(){
    
}

async function main() {
    await getsongs('songs/imrankhan')
    PlayMusic(songs[0],true)
    // console.log(songs);

    // this
    // let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0]
    // for (const song of songs) {
    //     songUL.innerHTML = songUL.innerHTML + `
    //     <li>
    //                         <img style="width: 40px;" class="invert musicLogo" src="music.svg" alt="current music">
    //                         <div class="info">
    //                             <div>${song.replaceAll('%20', ' ')}</div>
    //                             <div>Umair</div>
    //                         </div>
    //                         <div class="playnow">
    //                             <span>Play Now</span>
    //                             <img style="width: 30px;" class="invert" src="play.svg" alt="">
    //                         </div>
    //                     </li>`
    // }

    // play the first song
    // let audio = new Audio(songs[3]);
    // // audio.play();
    // console.log(songs[3].duration);
    // audio.addEventListener('lodeddata', () => {
    //     let duration = audio.duration;
    //     console.log(duration);        
    // });

    // Attach an event listener to each song
    // Array.from(document.querySelector('songList').getElementsByTagName('li')).forEach(e => {
    //     console.log(e);        
    // })
    // let a = document.querySelector('.songList').getElementsByTagName('li')
    // console.log(a);

    // this
    // Attach an event listener to each song
    // Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e => {
    //     // console.log(e.querySelector('.info').firstElementChild.innerHTML);
    //     e.addEventListener('click', element => {
    //         // console.log(e.querySelector('.info').firstElementChild.innerHTML);
    //         PlayMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
    //     })
    // })

    //Attach an event listener to play
    
    play.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = 'pause.svg'
        }
        else {
            currentSong.pause()
            play.src = 'play.svg'
        }
    })

    // add eventlistener to previous and next
    previous = document.querySelector('#previous')
    previous.addEventListener('click', () => {
        console.log('previous')
        // console.log(currentSong.src);
        // console.log(currentSong.src.split('/').slice(-1)[0]);
        s = currentSong.src.split('/').slice(-1)[0]
        let index = songs.indexOf(s)
        // console.log(index);        
        if ((index - 1) >= 0) {
            PlayMusic(songs[index - 1])
        }
        else{
            PlayMusic(songs[songs.length - 1])
        }
    })

    next = document.querySelector('#next')
    next.addEventListener('click', () => {
        // console.log('next')
        // console.log(currentSong.src.split('/').slice(-1)[0]);
        s = currentSong.src.split('/').slice(-1)[0]
        let index = songs.indexOf(s)
        // console.log(index);
        if ((index + 1) < songs.length) {
            PlayMusic(songs[index + 1])            
        }
        else{
            PlayMusic(songs[0])
        }
    })

    // Listen for time update event
    currentSong.addEventListener('timeupdate', () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector('.circle').style.left = (currentSong.currentTime/ currentSong.duration) * 100 +'%'
    })

    // Add an eventlistener to the seekbar
    document.querySelector('.seekbar').addEventListener('click', (e) => {
        // console.log(e.target.getBoundingClientRect().width, e.offsetX);
        percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 
        document.querySelector('.circle').style.left = percent + '%' // it will move the circle
        // now also update the time of the song
        currentSong.currentTime = (currentSong.duration * percent)/100
    })

    // Add an event listener to the hamburger
    document.querySelector('.hamburgerContainer').addEventListener('click', ()=>{
        document.querySelector('.left').style.left = '0'
    })

    // Add an event listener to the close
    document.querySelector('#close').addEventListener('click', () => {
        document.querySelector('.left').style.left = '-100%'
    })

    // Add an event listener to the volume
    document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
        // console.log(e,e.target, e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100
    })

    // Load the songs from the card
    // Array.from(document.getElementsByClassName('card')).forEach(e => {
    //     e.addEventListener('click', async item => {
    //         songs = await getsongs(`songs/${item.target.dataset.folder}`)
            
    //     })
    // })
    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async (item) => {
            // Use closest() to ensure we get the card element even if a child is clicked
            const card = item.target.closest('.card');
            if (card && card.dataset.folder) {
                await getsongs(`songs/${card.dataset.folder}`);
            }
        })
    })

    // Display all the albums
    displayAlbums()

}

main()
