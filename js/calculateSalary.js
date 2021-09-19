require('./db/database')
const company = require('./model/company')
const Empl = require('./model/employees')
var moment = require('moment');

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d === undefined ? "." : d,
            t = t === undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "€1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }; // Source: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
   
  function ElementReader() {
    this.InputCheckbox = function (idInput) {
      var input = document.getElementById(idInput);
      if (input === null) {
        return undefined;
      }
      return input.checked;
    };
    this.InputInt = function (idInput) {
      var input = document.getElementById(idInput);
      if (input === null) {
        return undefined;
      }
      return parseInt(input.value);
    };
    this.Select = function (idSelect) {
      var select = document.getElementById(idSelect);
      if (select === null) {
        return undefined;
      }
      var idx = select.selectedIndex;
      return select.options[idx].value;
    };
  }
   
  function ElementWriter() {
    this.Tag = function (idTag, value) {
      var tag = document.getElementById(idTag);
      if (tag !== null) {
        tag.innerHTML = value;
      }
    };
    this.TagCurrency = function (idTag, value) {
      this.Tag(idTag, value.formatMoney(2, ',', '&nbsp;') + '€');
    };
  }
   
  function salaryCalculator() {
    var incomeTaxRate = 0.18;
    var employmentInsuranceRate = 0.07;
    var additionBonusValue = 100;
    var additionAllowanceValue = 150;
    this.grossSalary;
    this.additionBonus;
    this.additionAllowance;
    this.gender;
    this.dependents;
    this.getAdditions = function () {
      var additions = 0;
      if (this.additionBonus === true) {
        additions += additionBonusValue;
      }
      if (this.additionAllowance === true) {
        additions += additionAllowanceValue;
      }
      return additions;
    };
   
    this.getEmploymentInsurance = function () {
      return this.grossSalary * employmentInsuranceRate;
    };
    this.getFinalSalary = function () {
      return this.grossSalary - this.getEmploymentInsurance() - this.getIncomeTax() + this.getAdditions();
    };
    this.getIncomeTax = function () {
      var relevantIncomeTaxRate = incomeTaxRate;
      if (this.gender === 'F') {
        relevantIncomeTaxRate -= 0.02;
      }
      if (this.dependents === 3) {
        relevantIncomeTaxRate -= 0.01;
      } else if (this.dependents > 3) {
        relevantIncomeTaxRate -= 0.02;
      }
      return this.grossSalary * relevantIncomeTaxRate;
    };
  }
   
  function computeSalary() {
    var reader = new ElementReader();
    var writer = new ElementWriter();
    var salCalc = new salaryCalculator();
    salCalc.grossSalary = reader.InputInt('grossSalary');
    salCalc.additionBonus = reader.InputCheckbox('additionBonus');
    salCalc.additionAllowance = reader.InputCheckbox('additionAllowance');
    salCalc.gender = reader.Select('gender');
    salCalc.dependents = reader.InputInt('dependents');
    writer.TagCurrency('incomeTaxResult', salCalc.getIncomeTax());
    writer.TagCurrency('employmentInsuranceResult', salCalc.getEmploymentInsurance());
    writer.TagCurrency('additionsResult', salCalc.getAdditions());
    writer.TagCurrency('finalSalaryResult', salCalc.getFinalSalary());
  }
   
  function resetAll() {
    var writer = new ElementWriter();
    var results = ['incomeTaxResult', 'employmentInsuranceResult', 'additionsResult', 'finalSalaryResult'];
    for (var i = 0; i < results.length; i++) {
      writer.Tag(results[i], '');
    }
  }

var salCalc = new salaryCalculator();


let rate;
let payedHolidaysTaked = document.getElementById('payedHolidaysTaked')
let takedValuePaidHoliday = document.getElementById('takedValuePaidHoliday')
let openPayslipModalBtn = document.getElementById('openPaySlid')
let totalPaidHolidays = document.getElementById('totalPaidHolidays')
let restePaidHolidays = document.getElementById('restePaidHolidays')


const startOfMonth = moment().startOf('month').format('DD/MM/YYYY');
const endOfMonth   = moment().endOf('month').format('DD/MM/YYYY');

let firstNameEmploye = ''
let lastNameEmploye = ''

Empl.find({}, function (err, docs) {
  
  docs.forEach((el, i) => {
    
    
    var opt = document.createElement('option');
      
    opt.value = i;
      opt.innerHTML = el.civility + ' ' + el.lastname + ' ' + el.firstname + ' (' + el.occupation + ')';
      
      selectEmployee.appendChild(opt);
     
      firstNameEmploye = el.firstname
      lastNameEmploye = el.lastname

      
      
    
     
  })
 
})


let grossSalary = document.getElementById('grossSalary')
let grossTotal = document.getElementById('gross-total')
let salaryNet = document.getElementById('salaryNet')
let salaryNetTable = document.getElementById('salaryNetTable')
let incomeTaxResult = document.getElementById('incomeTaxResult')
let amountTax = document.getElementById('amountTax')
let rateValue = document.getElementById('rate')
let finalSalaryResult = document.getElementById('finalSalaryResult')
let grossSalaryClass = document.querySelectorAll('.gross-salary')
let endDateTd = document.getElementById('endDate');



let selectEmployee = document.getElementById('selectEmployee')

openPayslipModalBtn.addEventListener('click', async function(e){

  let replaceString = finalSalaryResult.innerHTML.replace(/[a-zA-Z ]/g, '')
  let replaceSpecialCharOne = replaceString.replace(/[^0-9\,]/g, '')
  let replaceComma = replaceSpecialCharOne.replace(',', '.')
  endDateTd.innerHTML = endOfMonth
  rate = parseInt(replaceComma) / 151.67
  rateRounded = Math.round((rate + Number.EPSILON) * 100) / 100
  amountTax.innerHTML = incomeTaxResult.innerHTML
  salaryNet.innerHTML = finalSalaryResult.innerHTML
  salaryNetTable.innerHTML = finalSalaryResult.innerHTML
  grossTotal.innerHTML = grossSalary.value
  rateValue.innerHTML = rateRounded

  
  takedValuePaidHoliday.innerHTML = payedHolidaysTaked.value !== '' ? payedHolidaysTaked.value : '0' 

  let nowDateFr = moment().format('DD/MM/YYYY')
  
  
    let doc = await Empl.findOne({ firstname: firstNameEmploye, lastname: lastNameEmploye })
    if(nowDateFr > startOfMonth && nowDateFr < endOfMonth){
      
      if(doc.paid_holidays < 30){
        console.log(doc.paid_holidays)
        await Empl.updateOne({_id: doc._id}, 
        { 
          paid_holidays: doc.paid_holidays += 2.5
            
        });
        console.log('Valeur des jours de congés pris', payedHolidaysTaked.value)
        if(payedHolidaysTaked.value !== ''){
          await Empl.updateOne({_id: doc._id}, 
          { 
              paid_holidays_rest: doc.paid_holidays_rest - parseInt(payedHolidaysTaked.value)
              
          });

        }

      }

      if(payedHolidaysTaked.value !== ''){
        await Empl.updateOne({_id: doc._id}, 
        { 
            paid_holidays_rest: doc.paid_holidays_rest - parseInt(payedHolidaysTaked.value)
            
        });
        restePaidHolidays.innerHTML = doc.paid_holidays_rest - parseInt(payedHolidaysTaked.value)
      }else{
        restePaidHolidays.innerHTML = doc.paid_holidays_rest
      }
      totalPaidHolidays.innerHTML = doc.paid_holidays
    }
  
 

  for(let i = 0; i < grossSalaryClass.length; i++){
      grossSalaryClass[i].innerHTML = grossSalary.value
  }
})





let optionVal;
let paySlidDate = document.getElementById('paySlipDate')
let libelleEmpl = document.getElementById('modalLabelBlockRight');
let addressLabel = document.getElementById('addressLabel');
let addressNumberLabel = document.getElementById('addressNumberLabel');
let socialLabel = document.getElementById('socialLabel');
let qualificationLabel = document.getElementById('qualificationLabel');
let registrationLabel = document.getElementById('registrationLabel');
let job = document.getElementById('job');
let entryDate = document.getElementById('entryDate');

paySlidDate.innerHTML = startOfMonth + ' au : ' + endOfMonth

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}



  
  

$('#selectEmployee').on('change', function (e) {
  let optionSelected = $("option:selected", this);
  let slicedOpts = optionSelected[0].innerHTML.split(' ')
  
 
  if(slicedOpts.length > 0){

    Empl.find( { firstname: slicedOpts[2], lastname: slicedOpts[1] }).exec(function (err, docs) {
      if(err){
        console.log("Error", err)
      }
      
      libelleEmpl.innerHTML = docs[0]._doc.civility + ' ' + docs[0]._doc.lastname + ' ' + docs[0]._doc.firstname
      addressLabel.innerHTML = docs[0]._doc.address_number + ' ' + docs[0]._doc.address
      addressNumberLabel.innerHTML = docs[0]._doc.postal_code + ' ' +docs[0]._doc.city
      
      socialLabel.innerHTML = docs[0]._doc.social_number
      qualificationLabel.innerHTML = docs[0]._doc.qualification
      registrationLabel.innerHTML = docs[0]._doc.registration_number
      job.innerHTML = docs[0]._doc.occupation
      entryDate.innerHTML = convertDate(docs[0]._doc.entry_date)
      $('#grossSalary').val(docs[0]._doc.gross_salary)
      

      
    });
  }
});



$(()=> {

    const exportPdf = document.getElementById('exportPdf')
    exportPdf.addEventListener('click', () => {
        ipc.send('exportPdf')
    })
 
});
