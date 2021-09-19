require('./db/database')
const IStmt = require('./model/income-statement')


$(()=> {

    

    let month = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ]

    let actualDate = new Date()
    
    let dateShowed = document.getElementById('dateShowed')
    dateShowed.innerHTML = month[actualDate.getMonth()] + " " + actualDate.getFullYear()

    //Handle btn months
    let prevMonth = document.getElementById('prevMonth')
    let nextMonth = document.getElementById('nextMonth')

    const exportPdf = document.getElementById('exportPdf')
    exportPdf.addEventListener('click', () => {
        ipc.send('exportPdf')
    })

    //Handle click btns
    prevMonth.addEventListener('click', () => {
        actualDate = new Date(actualDate.setMonth(actualDate.getMonth() - 1))
        dateShowed.innerHTML = month[actualDate.getMonth()] + " " + actualDate.getFullYear()
        loadTablesLines(actualDate)
    })
    nextMonth.addEventListener('click', () => {
        actualDate = new Date(actualDate.setMonth(actualDate.getMonth() + 1))
        dateShowed.innerHTML = month[actualDate.getMonth()] + " " + actualDate.getFullYear()
        loadTablesLines(actualDate)
    })

    loadTablesLines(actualDate)
});

loadTablesLines = function (date) {
    
    let month = ["01","02","03","04","05","06","07","08","09","10","11","12"]
    let minDate = date.getFullYear() + "-" + month[date.getMonth()] + "-01"
    let maxDate = date.getFullYear() + "-" + month[date.getMonth()] + "-31"


    // fetch content of db between two dates
    IStmt.find({ $and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate } }] }, async function (err, docs) {
        console.log('all data', docs)


        

        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
        }

        let registerTable = document.getElementById('registerTable')
        let tableRows = registerTable.querySelectorAll('thead > tr')
       
       
        // Remove all lines in table
        await tableRows.forEach((el, i) => {
            if(i > 0){
                el.parentNode.removeChild(el)
               
            }
        })
        if(docs.length !== 0){
            let emptyRow = document.getElementById('emptyRow')
            emptyRow.innerHTML = ""

            
            
            docs.forEach((el, i) => {

                
                let dateFR = convertDate(el.date)

                
                // Create line
                let row = registerTable.insertRow(1)
    
                // Create cell
                let cell1 = row.insertCell(0)
                let cell2 = row.insertCell(1)
                let cell3 = row.insertCell(2)
                let cell4 = row.insertCell(3)
                let cell5 = row.insertCell(4)
                
                // Inject content
                cell1.innerHTML = dateFR
                cell2.innerHTML = el.amount > 0 ? `<span class="badge bg-success text-white p-2 amount-badge">${el.amount}</span>` : `<span class="badge bg-danger text-white p-2 amount-badge">${el.amount}</span>`
                cell3.innerHTML = el.info
                cell4.innerHTML = el.type !== undefined ? el.type : 'Non définis'
                cell5.innerHTML = '<button id="' + el._id + '" class="btn btn-danger btn-action ml-4"><i class="fa fa-trash"></i></button>'

                cell2.style.fontWeight = 'bold'
                cell4.style.color = cell4.innerHTML != 'Non définis' ? '' : '#b7b9cc'
                exportPdf.style.display = "block"
                
                exportPdf.addEventListener('mouseenter', () => {
                    exportPdf.classList.add('btn-warning')
                })
                exportPdf.addEventListener('mouseleave', () => {
                    exportPdf.classList.remove('btn-warning')
                })
                


                let btnRemove = document.getElementById(el._id)
                btnRemove.addEventListener('click', async () => {
                    if(confirm('êtes vous sur de vouloir supprimer cette ligne ?')){
    
                        
                        await IStmt.remove({ _id: el._id }, {}, function (err, numRemoved) {
                            if(err != null){
                                console.log(err)
                            }
                            console.log(numRemoved)
                            // ipc.send('reload')
                            row.remove()
                          });
                    }else{
                        
                    }
                })
    
            })
        }else{
            emptyRow.innerHTML = "Aucune ligne à afficher ce mois-ci"
            exportPdf.style.display = "none"
        }
        // Construct table with data

        
    })


}