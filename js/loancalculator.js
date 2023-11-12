$("#calcBtn").on("click", function(){
    document.getElementById("aTable").style.visibility = "visible";
});
$("#calcBtn").on("click", function(){
    document.getElementById("pResult").style.visibility = "visible";
});
$("#calcBtn").on("click", function() {
    //collects user input and assigns it to variables
    var displayOption = $("#display").val();
    var amount = parseFloat($("#loanAmnt").val());
    var interest = parseFloat($("#intRate").val()) / 100;
    var termInYears = parseInt($("#loanTerm").val());
    var sMonth = parseInt($("#startMonth").val());
    var sYear = parseInt($("#startYear").val());
    //console.log(amount, interest, termInYears, sMonth, sYear);

    //calculates monthly interest
    var monInt = interest / 12;
    //console.log(monInt);

    //calculates monthly payment and displays on the page
    var termInMonths = termInYears * 12;
    var monPay = ((amount * monInt) / (1 - Math.pow((1 + monInt), -termInMonths))).toFixed(2);
    //console.log(monPay);
    $("#monPayment").text("$" + monPay);

    //creates variables for the table and clears the table
    var newBal = amount;
    var aTable = $("#aTable tbody");
    aTable.empty();

    //calculates loan payment schedule for month if user selects monthly option
    if (displayOption === "0") {
        for (var i = sYear; i < sYear + termInYears; i++) {
            for (var j = (i === sYear ? sMonth : 1); j <= 12; j++) {
                var paidInt = (newBal * monInt).toFixed(2);
                var paidPrin = (monPay - paidInt).toFixed(2);
                newBal -= paidPrin;

                var row = "<tr><td>$" + (j < 10 ? "0" + j : j) + "-" + i + "</td><td>$" + paidInt + "</td><td>$" + paidPrin + "</td><td>$" + newBal.toFixed(2) + "</td></tr>";
                aTable.append(row);
            }
        }
    //calculates loan payment schedule for year if user selects yearly option
    } else if (displayOption === "1") {
        for (var i = sYear; i < sYear + termInYears; i++) {
            var paidIntYearly = 0;
            var paidPrinYearly = 0;
            for (var j = (i === sYear ? sMonth : 1); j <= 12; j++) {
                var paidInt = (newBal * monInt).toFixed(2);
                var paidPrin = (monPay - paidInt).toFixed(2);
                newBal -= paidPrin;

                paidIntYearly = (parseFloat(paidIntYearly) + parseFloat(paidInt)).toFixed(2);
                paidPrinYearly = (parseFloat(paidPrinYearly) + parseFloat(paidPrin)).toFixed(2);
            }
            var row = "<tr><td>" + i + "</td><td>$" + paidIntYearly + "</td><td>$" + paidPrinYearly + "</td><td>$" + newBal.toFixed(2) + "</td></tr>";
            aTable.append(row);
        }
    }
});

//adds style to table
var input1 = document.getElementById("loanAmnt");

input1.addEventListener('input', event => {
    if(input1.value === ''){
        input1.style.backgroundColor ='#FFFFFF';
    }else{
        input1.style.backgroundColor ='#F1F8C8';
    }
})

var input2 = document.getElementById("intRate");
input2.addEventListener('input', event => {
    if(input2.value === ''){
        input2.style.backgroundColor ='#FFFFFF';
    }else{
        input2.style.backgroundColor ='#F1F8C8';
    }
})

var input3 = document.getElementById("loanTerm");
input3.addEventListener('input', event => {
    if(input3.value === ''){
        input3.style.backgroundColor ='#FFFFFF';
    }else{
        input3.style.backgroundColor ='#F1F8C8';
    }
})

//shows calculator when clicked
$("#item3").on("click", function() {
    var calculatorElement = document.getElementById("calculator");
    var results=document.getElementById("aTable");
    var monthlyPayment=document.getElementById("pResult");
    
    calculatorElement.style.visibility = "visible";

    if(results.style.visibility === "visible"){
        results.style.visibility = "hidden";
    }
    if(monthlyPayment.style.visibility === "visible"){
        monthlyPayment.style.visibility = "hidden";
    }
});
