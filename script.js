/*====settings object*/
const MODES = ["pomodoro", "shortBreak", "longBreak"]
const localSettings = JSON.parse(localStorage.getItem('settings'))
let settings;
if (!localSettings) {

  settings = {
    color: "#ea4831",
    pomodoro: 25,
    shortBreak: 1,
    longBreak: 15,
    selected: 0
  }

  localStorage.setItem('settings', JSON.stringify(settings))
}
else {
  settings = localSettings

}
let currentTimerValue, timerInSec, progress, intervalFn, running = false;

/*Selectors*/

/*Nav Selectors */
const clickedMode = document.querySelector('.mode-lst')

/*Timer selectors*/
time = document.querySelector('.time')
start = document.querySelector('.pause-btn')
/*Modal Selectors*/
const icons = document.querySelectorAll('.icon')
const modal = document.querySelector('.modal')
//color selector
colors = document.querySelector('.colors')

//times
pomoTime = document.querySelector('.pomodoro-time')
shortTime = document.querySelector('.short-break')
longTime = document.querySelector('.long-break')

//timeProgressBar 
timeProgressBar = document.querySelector('.sec-circle')
/*=======LOGIC=======*/
if (document) {
  pomoTime.value = settings["pomodoro"]
  shortTime.value = settings["shortBreak"]
  longTime.value = settings["longBreak"]
  time.innerText = settings["pomodoro"] + ":00"
  document.documentElement.style.setProperty("--sc", settings["color"])

  resetTime()
}
/*Timer*/

const setTime = (mode, sec = "00") => {
  time.innerText = settings[mode] + ":" + sec
}

function resetTime() {
  timerInSec = 60 * Number(settings[MODES[settings["selected"]]])
  currentTimerValue = timerInSec;
  progress = 0;
  timeProgressBar.style.strokeDasharray = `calc(${progress}*754/100),754px`

}
function changeTime() {
  if (currentTimerValue == 0) {
    const audio = new Audio('alarm.wav');
    audio.play();
    clearInterval(intervalFn)
    resetTime()
    running = false;
    start.innerHTML = "Wow Great work,<br> start Again?"
    return
  }
  currentTimerValue--;

  min = String(Math.floor(currentTimerValue / 60));
  sec = String(currentTimerValue % 60);
  if (min.length == 1) {
    min = "0" + min
  }
  if (sec.length == 1) {
    sec = "0" + sec
  }
  time.innerText = `${min}:${sec}`

}
const timerInterval = () => {
  intervalFn = setInterval(changeTime, 1000);
}

const updateLoadingbar =
  setInterval(() => {
    progress = Math.ceil((timerInSec - currentTimerValue) / timerInSec * 100)
    timeProgressBar.style.strokeDasharray = `calc(${progress}*754/100),754px`

  }, 5000)



start.addEventListener('click', () => {
  if (running) {
    clearInterval(intervalFn)
    start.innerText = "s t a r t"
  }
  else if (!running) {

    timerInterval();
    start.innerText = "p a u s e"

  }
  running = !running
})


/* toggle active mode */
clickedMode.addEventListener('click',
  (e) => {
    //select active mode 
    const modeActive = document.querySelector('.active')
    if (e.target != colors) {
      //remove active class
      modeActive.classList.remove('active')
      //add active class to clicked mode 
      e.target.classList.add('active');
      if (e.target.innerText[0] == 'p')
        settings["selected"] = 0;
      else if (e.target.innerText[0] == 's')
        settings["selected"] = 1;
      else
        settings["selected"] = 2;

      localStorage.setItem('settings', JSON.stringify(settings))
      setTime(MODES[settings["selected"]])
      resetTime()
      running = false;
      start.innerText = "s t a r t"

      clearInterval(intervalFn)
    }
  }
)

/*Modal show and hide*/
let showModal = false;
icons.forEach((i) =>
  i.addEventListener('click', toggleModel)
)

/*toggle model*/
function toggleModel() {
  showModal ? modal.style.display = "none" : modal.style.display = "block";
  showModal = !showModal;
}


const handleApply = () => {
  settings["pomodoro"] = Number(pomoTime.value)
  settings["shortBreak"] = Number(shortTime.value)
  settings["longBreak"] = Number(longTime.value)
  setTime(MODES[settings["selected"]])

  localStorage.setItem('settings', JSON.stringify(settings))
  resetTime()
  toggleModel()
}

document.querySelector('.apply').addEventListener('click', handleApply)
/*Change color */
colors.addEventListener('click',
  (e) => {
    const activeColor = document.querySelector('.active-color')

    if (e.target != colors) {
      //select active mode 
      //remove active class
      activeColor.classList.remove('active-color')
      //add active class to clicked mode 

      e.target.classList.add('active-color');
      settings["color"] = getComputedStyle(e.target).backgroundColor
      document.documentElement.style.setProperty("--sc", settings["color"])

      localStorage.setItem('settings', JSON.stringify(settings))
    }
  }
)
