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

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

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

    // Load the songs from the card
    // Array.from(document.getElementsByClassName('card')).forEach(e => {
    //     e.addEventListener('click', async item => {
    //         songs = await getsongs(`songs/${item.target.dataset.folder}`)

    //     })
    // })


}

const PlayMusic = (song, pause = false) => {
    currentSong.src = `/${currfolder}/` + song
    if (!pause) {
        currentSong.play()
        play.src = 'pause.svg'
    }
    document.querySelector('.songinfo').innerHTML = decodeURI(song)
    document.querySelector('.songtime').innerHTML = '00:00 / 00:00'
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text()
    let div = document.createElement('div')
    div.innerHTML = response
    let anchors = div.getElementsByTagName('a')
    let cardContainer = document.querySelector('.cardContainer')

    let array = Array.from(anchors)


    for (let index = 0; index < array.length; index++) {
        const e = array[index];


        // console.log(e.href);
        if (e.href.includes('/songs/')) {
            // console.log(e.href.split('/').slice(-2)[0])    
            let folder = e.href.split('/').slice(-2)[0]
            // get meta data of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json()
            // console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="black">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpeg" alt="${response.title}">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
        }
    }


    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async (item) => {
            // Use closest() to ensure we get the card element even if a child is clicked
            const card = item.target.closest('.card');
            if (card && card.dataset.folder) {
                await getsongs(`songs/${card.dataset.folder}`);
            }
        })
    })
}


async function main() {
    await getsongs('songs/imrankhan')
    PlayMusic(songs[0], true)
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
        else {
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
        else {
            PlayMusic(songs[0])
        }
    })

    // Listen for time update event
    currentSong.addEventListener('timeupdate', () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%'
    })

    // Add an eventlistener to the seekbar
    document.querySelector('.seekbar').addEventListener('click', (e) => {
        // console.log(e.target.getBoundingClientRect().width, e.offsetX);
        percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector('.circle').style.left = percent + '%' // it will move the circle
        // now also update the time of the song
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

    // Add an event listener to the hamburger
    document.querySelector('.hamburgerContainer').addEventListener('click', () => {
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

    // Display all the albums
    displayAlbums()

    // Add event listener to the volume track
    document.querySelector('.volume>img').addEventListener('clcik', (e) => {
        console.log(e.target);
        if (e.target.src.includes('volume.svg')) {
            e.target.src = e.target.src.replace('volume.svg', 'mute.svg')
            currentSong.volume = 0
            console.log('mute');
            
        }        
        else {
            e.target.src = e.target.src.replace('mute.svg', 'volume.svg')
            currentSong.volume = 10  
            console.log('volume');
            
        }
    })

}

main()
