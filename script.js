
 
var submit = document.getElementById("submit");

var counter = 1;

var vizeOrtalamaArray = [];
let finalOrtalamaArray = [];


let inputData = [];
let basariNotuData = []

 
var vizeOrtalama = 0;
var finalOrtalama = 0;
var basariNotuOrtalama = 0;
 
var counterA = 0;
var counterB = 0;
var counterC = 0;
var counterD = 0;
 
let enYuksekAlanKisiAdi = "";
let enYuksekAlanKisiSoyadi = "";
let enYuksekAlanKisiBasariNotu = 0;

 
let enDusukAlanKisiAdi = "";
let enDusukAlanKisiSoyadi = "";
let enDusukAlanKisiBasariNotu = 101;

submit.addEventListener("click", (e) => {
    e.preventDefault();

    var isim = document.getElementById("isim").value;
    var soyisim = document.getElementById("soyisim").value;
    var vize = document.getElementById("vize").value;
    var final = document.getElementById("final").value;
    var classTable = document.getElementById("classTable");


    var basariNotu = parseFloat((vize * 0.4) + (final * 0.6)).toFixed(2);
    var harfNotu = "";

    if (basariNotu > 75 && basariNotu <= 100) {
        harfNotu = 'A';
        counterA++;
    }
    if (basariNotu > 50 && basariNotu <= 75) {
        harfNotu = 'B';
        counterB++;
    }
    if (basariNotu > 25 && basariNotu <= 50) {
        harfNotu = 'C';
        counterC++;
    }
    if (basariNotu >= 0 && basariNotu <= 25) {
        harfNotu = 'D';
        counterD++;
    }
    console.log(counterA, counterB, counterC, counterD)


    // write to file
    // var txtFile = "C:/Users/omer/Desktop/student.txt";
    // var myfile = new File(txtFile);

    // myfile.open("w"); // open myfile with write access
    // for (let i = 0; i < inputData.length; i++) {

    //     myfile.writeln(isim, " ", soyisim, " ", vize, " ", final, " ", basariNotu);
    //     s.writeline("--------------------");
    // }
    // myfile.close();


    let newCounter = counter++;
    classTable.insertRow(0).innerHTML =
        `
      <tr>
        <th scope="row">${newCounter}</th>
        <td>${isim}</td>
        <td>${soyisim}</td>
        <td>${vize}</td>
        <td>${final}</td>
        <td>${basariNotu}</td>
        <td>${harfNotu}</td>
      </tr> 
    `
 
    inputData.push({
        name: isim,
        surname: soyisim,
        midterm: vize,
        final: final,
        successRate: basariNotu
    });


    console.log(inputData)

    var vizeSum = 0;
    var finalSum = 0;
    var basariNotuSum = 0;
 

    for (let i = 0; i < inputData.length; i++) {
        vizeSum += parseFloat(inputData[i].midterm)
        finalSum += parseFloat(inputData[i].final)
        basariNotuSum += parseFloat(inputData[i].successRate)
        vizeOrtalama = parseFloat(vizeSum / newCounter).toFixed(2);
        finalOrtalama = parseFloat(finalSum / newCounter).toFixed(2);
        basariNotuOrtalama = parseFloat(basariNotuSum / newCounter).toFixed(2);

        if (inputData[i].successRate > enYuksekAlanKisiBasariNotu) {
            enYuksekAlanKisiAdi = inputData[i].name;
            enYuksekAlanKisiSoyadi = inputData[i].surname;
            enYuksekAlanKisiBasariNotu = inputData[i].successRate;
        }

        if (inputData[i].successRate < enDusukAlanKisiBasariNotu) {
            enDusukAlanKisiAdi = inputData[i].name;
            enDusukAlanKisiSoyadi = inputData[i].surname;
            enDusukAlanKisiBasariNotu = inputData[i].successRate;
        }
    }

 
})



document.getElementById("avarage").addEventListener("click", () => {

    avarageTable.insertRow(0).innerHTML =
        `
            <tr>
                <td>${vizeOrtalama}</td>
                <td>${finalOrtalama}</td>
                <td>${basariNotuOrtalama}</td>
            </tr> 
        `

})

document.getElementById("details").addEventListener("click", () => {
    maxPerson.insertRow(0).innerHTML =
        `
        <tr>
            <td>${enYuksekAlanKisiAdi}</td>
            <td>${enYuksekAlanKisiSoyadi}</td>
            <td>${enYuksekAlanKisiBasariNotu}</td>
        </tr> 
    `

    minPerson.insertRow(0).innerHTML =
        `
        <tr >
            <td>${enDusukAlanKisiAdi}</td>
            <td>${enDusukAlanKisiSoyadi}</td>
            <td>${enDusukAlanKisiBasariNotu}</td>
        </tr> 
    `
})

document.getElementById("chart").addEventListener("click", () => {
    var ctx = document.getElementById('myChart');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                label: 'Number of Letter',
                data: [counterA, counterB, counterC, counterD],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

})