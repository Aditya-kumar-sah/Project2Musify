let img = document.querySelector('.image');
let brand = document.querySelector('.t');
let image1 = document.querySelector('.t2');
img.addEventListener('click',()=>{
      brand.classList.toggle('brand');
      image1.classList.toggle('image');
})
let songIndex = 0;
let audioElement = new Audio('../Images/Hosanna.mp3');
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let m = document.getElementById('m');
let songItem= Array.from(document.getElementsByClassName('songItem'));
let songs = [
      {songName : "Hosana - A.R. Rahman" , filePtah: "../Images/Hosanna.mp3" , coverpath:"../Images/hosana.jpg"},
      {songName : "Let Me Love You - Justin Beiber" , filePtah: "../Images/let me love you.opus" , coverpath:"../Images/let me.jpg"},
      {songName : "Closer - Chainsmoker" , filePtah: "../Images/closer.opus" , coverpath:"../Images/closer.png"},
      {songName : "Zara Sa - K.K." , filePtah: "../Images/zara sa.opus" , coverpath:"../Images/zara sa.jpg"},
      {songName : "Phli Nazar Mei - Atif Aslam " , filePtah: "../Images/phli nazar mei.opus" , coverpath:"../Images/phli nazar.jpg"}
]
//Handle Play/Pause Click
masterPlay.addEventListener('click',()=>{
      if(audioElement.paused || audioElement.currentTime <=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            m.style.opacity = 1;
            
      }
      
      else{
            audioElement.pause();
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
            m.style.opacity = 0;
      }
      
})  
//Listens to Event
audioElement.addEventListener('timeupdate',()=>{
      console.log('timeupdate');
      progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
      console.log(progress);
      myprogressbar.value = progress;
});

myprogressbar.addEventListener('change',()=>{
      audioElement.currentTime = ((myprogressbar.value)/100)*audioElement.duration;
})

songItem.forEach((element,i) => {
      element.getElementsByTagName('img')[0].src = songs[i].coverpath;
      element.getElementsByTagName('span')[0].innerText = songs[i].songName;
});
const makeAllPlay = () =>{
      Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
      })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
            element.addEventListener('click',(e)=>{
                makeAllPlay();
                index = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = songs[i].filePtah;
                songIndex = i;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                m.style.opacity = 1;
                document.querySelector('#m').innerHTML = songs[i].songName;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            })
})

document.getElementById('next').addEventListener('click',()=>{
      if(songIndex >= 4){
            songIndex = 0;
      }
      else{
          songIndex += 1;  
      }
      
      audioElement.src = songs[songIndex].filePtah;
      audioElement.currentTime = 0;
      audioElement.play();
      document.querySelector('#m').innerHTML = songs[songIndex].songName;
})
document.getElementById('previous').addEventListener('click',()=>{
      if(songIndex <= 0){
            songIndex = 4;
      }
      else{
          songIndex -= 1;   
      }
     
      audioElement.src = songs[songIndex].filePtah;
      audioElement.currentTime = 0;
      audioElement.play();
      document.querySelector('#m').innerHTML = songs[songIndex].songName;
})