const app = () => {

    const song = document.querySelector(".song");
    const play = document.querySelector(".playContainer");
    const playImg = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.btn-time')
    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    const playerContainer = document.querySelector('.player-container');

    outline.style.strokeDasharray = outlineLength;

    console.log(play);
    //pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    play.addEventListener("click", () => {
        checkPlaying(song);
        song.ontimeupdate();
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            console.log(this.getAttribute('data-time'));
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            playImg.src = "./svg/pause.svg";
        } else if (song.played) {
            song.pause()
            video.pause();
            playImg.src = "./svg/play.svg";
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // console.log(currentTime);
        // console.log(elapsed);
        //animate the bar the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
console.log(seconds);
        //animate the text
if(minutes<10){
    minutes="0"+minutes;
}
 if(seconds<10){
   
    seconds="0"+seconds;
    console.log("test seonds")
}

        timeDisplay.textContent = `${minutes}:${seconds}`
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }
};

app();