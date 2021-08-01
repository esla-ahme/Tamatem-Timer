/*Selectors*/
/*Nav Selectors */
const clickedMode = document.querySelector('.mode-lst')



/*Modal Selectors*/
const icons = document.querySelectorAll('.icon')
const modal = document.querySelector('.modal')

/*Timer*/



/* toggle active mode */
clickedMode.addEventListener('click',
  (e) => {
    //select active mode 
    const modeActive = document.querySelector('.active')
    //remove active class
    modeActive.classList.remove('active')
    //add active class to clicked mode 
    e.target.classList.add('active');
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