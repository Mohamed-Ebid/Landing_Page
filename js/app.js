/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navBar = document.querySelector('.navbar__menu')
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');
const header = document.querySelector('.page__header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavItemHTML(id, name){
    const itemHTML = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return itemHTML;
}
function isInViewport (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    sections.forEach(section => {
        //Create the li elements that contained inside the ul
        const navButton = document.createElement('li');
        //Insert the html text to  the li
        navButton.insertAdjacentHTML("afterbegin",`<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`);
        //Append the li to the ul
        navList.appendChild(navButton);

        //scrollBehavior Function Invoke
        scrollBehavior(navButton, section);
    });
    //Append the ul to the nav
    navBar.appendChild(navList);
}


// Add class 'active' to section when near top of viewport
function setActiveClass(){
    for (let i=0; i < sectionList.length; i++){
        if (isInViewport(sectionList[i])){
            sectionList[i].classList.add("your-active-class");
        }else{
            sectionList[i].classList.remove("your-active-class");
        }
    }
}
// Scroll to anchor ID using scrollTO event
function scrollBehavior(navButton, section){
    navButton.addEventListener('click', function(event){
        event.preventDefault();
        window.scrollTo({
            top: section.offsetTop,
            behavior:"smooth"
        });
    });
}
//Start of the Scroll Event to execute the functions of activeSection and toggleNavBar 
window.addEventListener('scroll',(event)=>{
    activeSection();
    toggleNavBar();
})
//End of the Scroll Event to execute the functions of activeSection and toggleNavBar 
/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('scroll', function(){
    setActiveClass();
});
const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click', function(event){
    scrollToElement(event)
})
// Build menu 
buildNav()
// Scroll to section on link click

// Set sections as active
function activeSection (){
    // Select all anchor using "menu__link" class
    const navActive = document.querySelectorAll(".menu__link")
    sections.forEach((section, i)=>{
        //Get the boundingrect for each section 
        const sectionBond = section.getBoundingClientRect();
        //Check if the section is in viewport or not 
        if (sectionBond.top <= 380 && sectionBond.bottom >= 350){
            //section in viewport accourding to top and bottom boundings
            //add 'your-active-class' class to the specific section
            section.classList.add("your-active-class");
            //add 'active_button' class to the specific nav button according to section ID
            navActive[i].classList.add("active_button");
        } else{
            //Remove both section and navButton active classes when section is off sight
            section.classList.remove("your-active-class");
            navActive[i].classList.remove("active_button");
        }
    })
}

