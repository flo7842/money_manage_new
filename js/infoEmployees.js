require('./db/database')

const Empl = require('./model/employees')

$(() => {


    let date = new Date();
    let month = [ "01","02","03","04","05","06","07","08","09","10","11","12"];
    let minDate = date.getFullYear() + "-" + month[date.getMonth()] + "-01"; 
    let maxDate = date.getFullYear() + "-" + month[date.getMonth()] + "-31"; 
  
    
  
    const countEmplId = document.getElementById("countEmplId");
    const countWmId = document.getElementById("countWmId");
    const countCmId = document.getElementById("countCmId");
    const countDevId = document.getElementById("countDevId");
    const wageBillTotal = document.getElementById("wageBillTotal");
    

    let countWM = 0
    let countDev = 0
    let countCm = 0
    let wageBill = 0
    
    /**
     * Allows you to retrieve the total account of the company's employees
     */
    Empl.find().count().then((count) => {
        
        console.log("Total des employées", count)
        countEmplId.innerHTML = count + ' <i class="fas fa-male"></i>'

    }).catch(err => {
        console.log("Total des employées", err)
    })

    /**
     * Allows you to retrieve the total account of the WebMaster employees
     */
    Empl.find( { occupation: 'WebMaster' }).count().then((count) => {

        console.log("WebMaster", count)
        countWmId.innerHTML = count + ' <i class="fas fa-desktop ml-2"></i>'
       
    }).catch(err => {
        console.log("WebMaster", err)
    })

    /**
     * Allows you to retrieve the total account of the Developer employees
     */
    Empl.find( { occupation: 'Développeur' }).count().then((count) => {

        console.log("Développeur", count)
        countDevId.innerHTML = count + ' <i class="fas fa-laptop-code ml-2"></i>'

    }).catch(err => {
        console.log("Développeur", err)
    })

    /**
     * Allows you to retrieve the total account of the commercial employees
     */
    Empl.find( { occupation: 'Commercial' }).count().then((count) => {
        
        console.log("Commercial", count)
        countCmId.innerHTML = count + ' <i class="fas fa-handshake"></i>'
        
    }).catch(err => {
        console.log("Commercial", err)
    })

    /**
     * Allows you to retrieve the salary of the employees
     */
    Empl.find({}, function (err, docs) {
  
        docs.forEach(el => {
          if(parseInt(el.gross_salary) > 0){
            wageBill += parseInt(el.gross_salary)
            wageBillTotal.innerHTML = wageBill + ' <i class="fa fa-euro-sign"></i>'
          }
        })
       
    })

    // IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $gte: 0 }}).exec(function (err, docs) {
    //   if(err){
    //     console.log("Error", err)
    //   }
    //   let count = docs.length
    //   incomeMonthNb.innerHTML = count
    //   console.log("Le count",count)
    // });
    // IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $lte: 0 }}).exec(function (err, docs) {
    //   if(err){
    //     console.log("Error", err)
    //   }
    //   let count = docs.length
    //   expenseMonthNb.innerHTML = count
     
    // });
    
  });
  