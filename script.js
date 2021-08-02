
/*====settings object*/
const MODES = ["pomodoro", "shortBreak", "longBreak"]
const settings = {
  color: "#ea4831",
  pomodoro: 25,
  shortBreak: 10,
  longBreak: 15,
  selected: 0
}

/*Selectors*/

/*Nav Selectors */
const clickedMode = document.querySelector('.mode-lst')

/*Timer selectors*/
time = document.querySelector('.time')

/*Modal Selectors*/
const icons = document.querySelectorAll('.icon')
const modal = document.querySelector('.modal')
//color selector
colors = document.querySelector('.colors')

//times
pomoTime = document.querySelector('.pomodoro-time')
shortTime = document.querySelector('.short-break')
longTime = document.querySelector('.long-break')


/*=======LOGIC=======*/
if (document) {
  pomoTime.value = settings["pomodoro"]
  shortTime.value = settings["shortBreak"]
  longTime.value = settings["longBreak"]
  time.innerText = settings["pomodoro"] + ":00"

}
/*Timer*/

const setTime = (mode) => {
  time.innerText = settings[mode] + ":00"
}




/* toggle active mode */
clickedMode.addEventListener('click',
  (e) => {
    //select active mode 
    const modeActive = document.querySelector('.active')
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

    setTime(MODES[settings["selected"]])
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
  console.log(longTime.value)
  toggleModel()
}

document.querySelector('.apply').addEventListener('click', handleApply)
/*Change color */
colors.addEventListener('click',
  (e) => {
    //select active mode 
    const activeColor = document.querySelector('.active-color')
    //remove active class
    activeColor.classList.remove('active-color')
    //add active class to clicked mode 
    e.target.classList.add('active-color');
    settings["color"] = getComputedStyle(e.target).backgroundColor
    document.documentElement.style.setProperty("--sc", settings["color"])
  }
)
