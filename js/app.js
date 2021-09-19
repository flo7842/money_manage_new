const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
var moment = require('moment');

const reduceBtn = document.getElementById('reduceBtn')
const sizeBtn = document.getElementById('sizeBtn')
const closeBtn = document.getElementById('closeBtn')

const navbarLeft = document.querySelectorAll('.navbar-nav')
let dashbordRow = document.querySelector('.dashbord-row')
let btnDarkTheme = document.querySelector('.btn-darktheme')

const sidebarToggle = document.getElementById('sidebarToggle')

sidebarToggle.addEventListener('click', () => {
    console.log()
    for(let nav of navbarLeft){
        
        if(nav.classList.contains('toggled')){
            dashbordRow.style.flexDirection = 'column-reverse'
            dashbordRow.style.alignItems = 'center'
            btnDarkTheme.style.marginRight = '0'
            btnDarkTheme.style.marginTop = '1rem'
        }else{
            dashbordRow.style.flexDirection = ''
            dashbordRow.style.alignItems = 'baseline'
            btnDarkTheme.style.marginRight = '2rem'
            btnDarkTheme.style.marginTop = ''
        }
    }
})



// Handling darkTheme
const checkbox = document.getElementById('checkbox')



const btnNavbar = document.querySelectorAll('.topMenuBtn')
const navbarElement = document.querySelector('.navbar')

const content = document.getElementById('content-wrapper')
const cards = document.querySelectorAll('.card')
const cardsHeader = document.querySelectorAll('.card-header')
const txtCards = document.querySelectorAll('.txt-cards')
const footerSticky = document.querySelectorAll('.sticky-footer')


// Elem of Calculator
const titlesOne = document.querySelectorAll('h1')
const paragraphs = document.querySelectorAll('p')
const labels = document.querySelectorAll('label')
const btnCalcul = document.querySelector('.btn-calcul')
// Elem of table
const headerTables = document.querySelectorAll('th')
const allSpan = document.querySelectorAll('span')
const allInput = document.querySelectorAll('input')
const allSelect = document.querySelectorAll('select')


checkbox.addEventListener('change', () => {

    const allCells = document.querySelectorAll('td')
    // Change the theme of the application
    content.classList.toggle('dark')
    navbarElement.classList.add('dark')
    if(btnCalcul !== null){
        btnCalcul.style.background ='#073857'
    }

    if(checkbox.checked == false){
        sessionStorage.removeItem('background')
        sessionStorage.removeItem('checkboxChecked')
    }

    
    for(const nav of navbarLeft)
        nav.classList.toggle('navbar-left-dark')
    for(const btn of btnNavbar)
        btn.classList.toggle('btn-dark')
    for(const title of titlesOne)
        title.classList.toggle('whiteFont')
    for(const paragraph of paragraphs)
        paragraph.classList.toggle('whiteFont')
    for(const select of allSelect)
        select.classList.toggle('input-dark')
    for(const input of allInput)
        input.classList.toggle('input-dark')
    for(const label of labels)
        label.classList.toggle('whiteFont')
    for(const header of headerTables)
        header.classList.toggle('whiteFont')
    for(const cellLine of allCells)
        cellLine.classList.toggle('td-border')
    for(const span of allSpan)
        span.classList.toggle('whiteFont')
    for(const card of cards)
        card.classList.toggle('cards-dark')
    for(const card of cardsHeader)
        card.classList.toggle('cards-dark')
    for(const txtCard of txtCards)
        txtCard.classList.toggle('whiteFont')
    for(const footer of footerSticky)
        footer.classList.toggle('footer-dark')

    if (content.classList.contains("dark")) {
        //if class was added to body
        //content.setAttribute('checked')
        sessionStorage.setItem("checkboxChecked", "checked = true");
        sessionStorage.setItem("background", "dark");
        //save information in "background" localStorage variable, use dark-mode class name
    } else {
        localStorage.setItem("background", "");
        //if class was removed set background" localStorage variable to null
    }
        

})

document.addEventListener("DOMContentLoaded", function(event) {
    //when loading document
    var background = sessionStorage.getItem("background");
    var checkedBoxSession = sessionStorage.getItem("checkboxChecked");
    const allCells = document.querySelectorAll('td')
    
    // get localStorage var background
    if (background) {
        // if its not null and empty
        content.className = background;
        checkbox.setAttribute('checked', checkedBoxSession)

        navbarElement.classList.add('dark')
        if(btnCalcul !== null){
            btnCalcul.style.background ='#073857'
        }
       

        for(const nav of navbarLeft)
            nav.classList.toggle('navbar-left-dark')
        for(const btn of btnNavbar)
            btn.classList.toggle('btn-dark')
        for(const card of cards)
            card.classList.toggle('cards-dark')
        for(const card of cardsHeader)
            card.classList.toggle('cards-dark')
        for(const title of titlesOne)
            title.classList.toggle('whiteFont')
        for(const paragraph of paragraphs)
            paragraph.classList.toggle('whiteFont')
        for(const select of allSelect)
            select.classList.toggle('input-dark')
        for(const input of allInput)
            input.classList.toggle('input-dark')
        for(const label of labels)
            label.classList.toggle('whiteFont')
        for(const header of headerTables)
            header.classList.toggle('whiteFont')
        for(const cellLine of allCells)
            cellLine.classList.toggle('td-border')
        for(const span of allSpan)
            span.classList.toggle('whiteFont')
        for(const txtCard of txtCards)
            txtCard.classList.toggle('whiteFont')
        for(const footer of footerSticky)
            footer.classList.toggle('footer-dark')
    }
});


// Handling menu resizing
const SIDEBAR_WIDTH = 'SidebarWidth'

/**
 * Transform the element into a resizer handler
 * @param {HTMLElement} el
 * @param {Function} cb Callback called on resize with the offsetX
 */
function resizer(el, cb){
    el.addEventListener('mousedown', onMouseDown);

    /**
     * @param {PointerEvent} e 
     */
    function onMouseDown(e) {
        e.preventDefault();
        document.addEventListener("mousemove", onMouseMove);
        
        document.addEventListener("mouseup", onMouseUp, { once: true });
    }

    /**
     * @param {PointerEvent} e 
     */
    function onMouseUp(e) {
        e.preventDefault();
        document.removeEventListener("mousemove", onMouseMove);
    }

    /**
     * @param {PointerEvent} e 
     */
    function onMouseMove(e) {
        e.preventDefault();
        
        cb(e.pageX)
    }
}

let resizeSideBar = document.querySelector('.resizer')
let sidebar = document.querySelector('.sidebar')

resizer(resizeSideBar, function (x){
    const sidebarWidth = x + 'px'
    sessionStorage.setItem(SIDEBAR_WIDTH, sidebarWidth)
    document.body.style.setProperty("--sidebar", sidebarWidth);
})

const sidebarWidth = sessionStorage.getItem(SIDEBAR_WIDTH);

if(sidebarWidth !== null){
    document.body.style.setProperty("--sidebar", sidebarWidth);
}

// Allow to use btns reduce, resize and close
reduceBtn.addEventListener('click', () => {
    ipc.send('reduceApp')
})

sizeBtn.addEventListener('click', () => {
    ipc.send('sizeApp')
})

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})

// Handle add entry in register
const btnAddEntry = document.getElementById('saveEntryBtn')

if(btnAddEntry != null){
    btnAddEntry.addEventListener('click', () => {
        // All input from modals
        const dateValue = document.getElementById('dateLine')
        const amountValue = document.getElementById('amountLine')
        const infoValue = document.getElementById('infoLine')
        const typeValue = document.getElementById('typeLine')
       
        let selectedVal = document.getElementById('identifiantDeMonSelect')
        let typeCost;

        if(selectedVal.value == 1){
            typeCost = "-" + amountValue.value
        }else{
            typeCost = amountValue.value
        }

        let _record = {
            date: dateValue.value,
            amount: typeCost,
            info: infoValue.value,
            type: typeValue.value
        }
        ipc.send('addLineToDb', _record)
        $('#addLineModal').modal('hide');
    })
}

let civilityOption = 'Mme';
let qualificationOption;

//For define Civility of employee
$('#civilityLabel').on('change', function (e) {
    
    let valOption = $(this).val()

    if(valOption == 1){
        civilityOption = 'Mme'
    }else{
        civilityOption = 'Mr'
    }

})

$('#qualification').on('change', function (e) {
    
    let valOption = $(this).val()

    qualificationOption = valOption

})

const endOfThisMonth = moment().endOf('month').format('YYYY-MM-DD');

const btnAddEmployee = document.getElementById('btnAddEmployee')

/**
 * Allow you to calcul numbers of month between two dates
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns 
 */
const monthsBtwnDates = (startDate, endDate) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return Math.max(
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            endDate.getMonth() -
            startDate.getMonth(),
            0
        
)};

if(btnAddEmployee != null){
    btnAddEmployee.addEventListener('click', () => {
        // All input from modals
        const civility = document.getElementById('civility')
        const firstName = document.getElementById('firstNameLine')
        const lastName = document.getElementById('lastNameLine')
        const entryDate = document.getElementById('entry_date')
        
        let selectedCivility = document.getElementById('civilityLabel')
        let selectedValNbExp = document.getElementById('nbExp')
       
        let selectedValoccupation = document.getElementById('occupedPost')
        let amountGrossSalary
        let lb_occupation = ''

        
      
           
        // For WebMaster
        if(selectedValNbExp.value == 1 && selectedValoccupation.value == 1){
            amountGrossSalary = 2000
        }else if(selectedValNbExp.value == 2 && selectedValoccupation.value == 1){
            amountGrossSalary = 2400
        }else if(selectedValNbExp.value > 2 && selectedValoccupation.value == 1){
            amountGrossSalary = 5000
        }
        // For Developer
        if(selectedValNbExp.value == 1 && selectedValoccupation.value == 2){
            amountGrossSalary = 2000
        }else if(selectedValNbExp.value == 2 && selectedValoccupation.value == 2){
            amountGrossSalary = 2400
        }else if(selectedValNbExp.value > 2 && selectedValoccupation.value == 2){
            amountGrossSalary = 5000
        }
        // For Commercial
        if(selectedValNbExp.value == 1 && selectedValoccupation.value == 3){
            amountGrossSalary = 2000
        }else if(selectedValNbExp.value == 2 && selectedValoccupation.value == 3){
            amountGrossSalary = 2400
        }else if(selectedValNbExp.value > 2 && selectedValoccupation.value == 3){
            amountGrossSalary = 5000
        }
        
        if(selectedValoccupation.value == 1){
            lb_occupation = 'WebMaster'
        }else if(selectedValoccupation.value == 2){
            lb_occupation = 'Développeur'
        }else{
            lb_occupation = 'Commercial'
        }

        let addressLabel = document.getElementById('addressLabel')
        let adressNumber = document.getElementById('addressNumber')
        let postalCode = document.getElementById('postalCode')
        let city = document.getElementById('cityLabel')
        let socialNumber = document.getElementById('socialNumber')
        let registrationNumber = document.getElementById('registrationNumber')
        let qualification = document.getElementById('qualification')

        // Allows you to add a new employee in the collection
        let _records = {
            civility: civilityOption,
            firstname: firstName.value,
            lastname: lastName.value.toUpperCase(),
            address: addressLabel.value,
            address_number: adressNumber.value,
            postal_code: postalCode.value,
            city: city.value,
            social_number: socialNumber.value,
            registration_number: registrationNumber.value,
            qualification: qualification.value,
            gross_salary: amountGrossSalary,
            occupation: lb_occupation,
            entry_date: entryDate.value,
            paid_holidays: monthsBtwnDates(entryDate.value, endOfThisMonth) * 2.5,
            paid_holidays_rest: 0
        }

        ipc.send('addEmployeeToDb', _records)
        $('#addEmployeeModal').modal('hide');
    })
}

const editBtn = document.getElementById('')

ipc.on('new-task-created', (e, args) => {
    const newIstmt = JSON.parse(args)
    
})

ipc.send('get-tasks')

ipc.on('get-tasks', (e, args) => {
    const task = JSON.parse(args)
    console.log(task)
})

ipc.on('get-company', (e, args) => {
    const company = JSON.parse(args)
    console.log(company)
})

