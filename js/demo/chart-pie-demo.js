// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

let types = []
let rent = []
let materiel = []
let expendSalary = null;
let expendTypes = document.querySelectorAll('.expendTypes')
let wageBill = 0
let expendMateriel

  IStmt.find({ type: { $exists: true } }, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    docs.forEach((el) => {
      
      types.push(el.type)
    })
    
    
    
  });
  expendTypes[0].innerHTML = '<i class="fas fa-circle text-info mr-2"></i>' + 'Contrat'
  expendTypes[1].innerHTML = '<i class="fas fa-circle text-danger mr-2"></i>' + 'Masse salarial'
  expendTypes[2].innerHTML = '<i class="fas fa-circle text-warning mr-2"></i>' + 'Matériel'
  Empl.find({}, function (err, docs) {
  
    docs.forEach(el => {
      if(parseInt(el.gross_salary) > 0){
        wageBill += parseInt(el.gross_salary)
        return wageBill
      }
    })
    console.log(wageBill)
    generateGraphPie()
  })
  
  IStmt.find({ type: "Contrat" }, function (err, docs) {
    
    docs.forEach( (el) => {
       rent.push(el.amount)
      return rent
    })

    expendSalary = rent.reduce(function(a, b) {
      return parseInt(a) + parseInt(b);
    });
    
    generateGraphPie()
  });

  IStmt.find({ type: "Matériel" }, function (err, docs) {
    
    docs.forEach( (el) => {
       materiel.push(el.amount)
      return materiel
    })

    expendMateriel = materiel.reduce(function(a, b) {
      return parseInt(a) + parseInt(b);
    });
    
    generateGraphPie()
  });

  
  
  // expendSalary = rent.reduce(reducer)
function generateGraphPie(){
  
  var ctx = document.getElementById("myPieChart");
  console.log("the rent", expendSalary)
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Loyer", "Masse Salarial", "50"],
      datasets: [{
        data: [expendSalary, wageBill, expendMateriel],
        backgroundColor: ['#4e73df', '#e02d1b', '#f6c23e'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}
// Pie Chart Example
