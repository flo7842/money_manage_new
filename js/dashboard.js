require('./db/database')
const IStmt = require('./model/income-statement')
const Empl = require('./model/employees')

$(() => {


    let date = new Date();
    let month = [ "01","02","03","04","05","06","07","08","09","10","11","12"];
    let minDate = date.getFullYear() + "-" + month[date.getMonth()] + "-01"; 
    let maxDate = date.getFullYear() + "-" + month[date.getMonth()] + "-31"; 
  
    
  
    const incomeMonth = document.getElementById("incomeMonthly");
    const incomeMonthNb = document.getElementById("incomeMonthNb");
    const incomeYear = document.getElementById("incomeYear");
    const expenseMonth = document.getElementById("expenseMonth");
    const expenseMonthNb = document.getElementById("expenseMonthNb");
    const expenseMonthStyle = document.getElementById("expenseMonthStyle");
    const expenseYear = document.getElementById("expenseYear");
  
    IStmt.find( { }, function (err, docs) {
        let income = 0;
        let expense = 0;
        let incomem = 0;
        let expensem = 0;
        
        docs.forEach(el => {
          
          if(parseInt(el.amount) > 0) { 
            income += parseInt(el.amount);
          } else { 
            expense += parseInt(el.amount);
          }
         
          if(el.date >= minDate && el.date <= maxDate)
          {
            if (parseInt(el.amount) > 0) {
              
              incomem += parseInt(el.amount);
            } else {
             
              expensem += parseInt(el.amount);
            }
          }
        }); 

        incomeYear.innerHTML = income + "€";
        expenseYear.innerHTML = expense + "€";
        incomeMonth.innerHTML = incomem + "€";
  
        
        let pourcentage = (expensem * 100) / incomem;
  
        expenseMonth.innerHTML = expensem;
   
        expenseMonthStyle.style.width = pourcentage + "%";
      }
    );

    IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $gte: 0 }}).exec(function (err, docs) {
      if(err){
        console.log("Error", err)
      }
      let count = docs.length
      incomeMonthNb.innerHTML = count
      console.log("Le count",count)
    });
    IStmt.find({$and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate }}], amount: { $lte: 0 }}).exec(function (err, docs) {
      if(err){
        console.log("Error", err)
      }
      let count = docs.length
      expenseMonthNb.innerHTML = count
     
    });
    
  });
  