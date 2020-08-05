const user = {
  name: "Doe",
  firstname: "John",
  email: "john.doe@hello.bk",
  password: "1234", // a ne pas reproduire en production !!!
  isAdmin: true,
};

console.dir(user);

console.log("hello John, i know your password :-)", user.password);

document.querySelector("#name").textContent = user.name;

// const mess = "Hello from app.js";
// console.log(mess);

// const totalCredit = document.querySelector("#totalCredit").innerText.split(" ");
// console.log(Number(totalCredit[0]));
//....

var sTotalWallet = localStorage.getItem('totalWalletS');
var sTotalDebit = localStorage.getItem('totalDebitS');
var sTotalCredit = localStorage.getItem('totalCreditS');
var sTotalPercent = localStorage.getItem('totalPercentS');


let labelDescription = ''; //Le texte de l'intitulé seras stocker ici
let priceDescription = 0; //Le montant seras stocker ici

let selectOperation = "";

let percentDescription = "10"; 

let totalWallet = 421.01;
let totalCredit = 1520;
let totalDebit = 1098.99;

let percentTotal = 0;

let labelCreditArray = [];
let priceCreditArray = [];

let labelDebitArray = [];
let priceDebitArray = [];

let percentArray = [];

//let debitPercentArray = [priceDebitArray, percentArray];

 
    document.getElementById('total').innerHTML = `+ ${sTotalWallet} €`;
    document.getElementById('totalCredit').innerHTML = `${sTotalCredit} €`;
    document.getElementById('totalDebit').innerHTML = `${sTotalDebit} €`;
    document.getElementById('totalDebitPercent').innerHTML = sTotalPercent;
  

btPunch.addEventListener("click", addDetails);

function addDetails() {

  //Ciblage des id pour les mettre dans des variable .
  totalWallet = document.getElementById("total").value;

  labelDescription = document.getElementById("intitule").value;

  selectOperation = document.getElementById("operation").value;

  priceDescription = document.getElementById("montant").value;

  percent = document.getElementById("totalDebitPercent").value;

  if (priceDescription <= 0){
    priceDescription = 0;
  }

  //Condition si l'opérateur est plus ou moins.
  if (selectOperation === '+' && labelDescription != "" && priceDescription != "") {
    detailsCredit();
  } 
  else if (selectOperation === '-' && labelDescription != "" && priceDescription != "") {
   detailsDebit();
  }
 
}


function detailsCredit(){

  //Ciblage de l'id detailsCredit et modification de sont contenue .
  document.getElementById('detailsCredit').innerHTML += `<li class="inFade"> <span class='intitule'> ${labelDescription} </span> <span class='montant txt-color-gazoil'> ${priceDescription} € </span> </li>`;
 
  //Ajout du montant du credi dans la list .
  let tabCreditPrice = priceCreditArray.push(priceDescription);
  console.log(priceCreditArray);

  //Ajout du label du credit dans la list .
  let tabCreditLabel = labelCreditArray.push(labelDescription);
  console.log(labelCreditArray);

  //Récupére la dernière valeur du tableau puis l'additionne au crédit :) .
  let priceCreditAdd = priceCreditArray[priceCreditArray.length - 1];
  totalCredit += parseFloat(priceCreditAdd);

  document.getElementById('totalCredit').innerHTML = totalCredit  + " €";
  
  sTotalCredit = totalCredit;
  localStorage.setItem('totalCreditS',sTotalCredit);
 
  document.getElementById("form").reset();

  //appelle la fonction de calcule de wallet .
  calculWallet();
  //appelle la fonction de calcule de % .
  calculPercent();
}


function detailsDebit(){

  percentDescription = (priceDescription / totalCredit) * 100;
  percentDescription = percentDescription.toFixed(2);

  //Ciblage de l'id detailsDebit et modification de sont contenue .
  document.getElementById('detailsDebit').innerHTML += `<li class="inFade"> <span class='intitule'> ${labelDescription} </span> <span id'newPercent' class='montant txt-color-red'> ${priceDescription} € </span> <span class='percent txt-color-red'> ${percentDescription} % </span></li>`;
  
  //Ajout du montant du debit dans la list .
  let tabDebitPrice = priceDebitArray.push(priceDescription);

  //Ajout du label du debit dans la list .
  let tabDebitLabel = labelDebitArray.push(labelDescription);

 /* //Ajout le % du debit dans la list .
  let tabDebitPercent = debitPercentArray.push(percentDescription);
  console.log(tabDebitPercent);*/

  //Récupére la dernière valeur du tableau puis l'additionne au débit :o .
  let priceDebitAdd = priceDebitArray[priceDebitArray.length - 1];
  totalDebit += parseFloat(priceDebitAdd);
    
  document.getElementById('totalDebit').innerHTML = `${totalDebit} €`;
  
  sTotalDebit = totalDebit;
  localStorage.setItem('totalDebitS',sTotalDebit);

  document.getElementById("form").reset();

  //appelle la fonction de calcule de wallet .
  calculWallet();
  //appelle la fonction de calcule de % .
  calculPercent();
}

function calculWallet(){
    //Calcule le crédit moins le débit pou avoir le reste du portefeuille .
    totalWallet = totalCredit - totalDebit ;
    totalWallet = Number(totalWallet.toFixed(2));

  if(totalWallet > 0){
    document.getElementById('total').innerHTML = `+ ${totalWallet} €`;
    document.getElementById("total").style.color = "white";
    }
  else{
      document.getElementById('total').innerHTML = `${totalWallet} €`;
      document.getElementById("total").style.color = "Red";
    }

    sTotalWallet = totalWallet;
    localStorage.setItem('totalWalletS',sTotalWallet);
}


function calculPercent(){
    //Calcule du pourcentage total.
    percentTotal = (totalDebit / totalCredit) * 100;
    percentTotal = Number(percentTotal.toFixed(2));
    document.getElementById('totalDebitPercent').innerHTML = percentTotal;
    sTotalPercent = percentTotal;
    localStorage.setItem('totalPercentS',sTotalPercent);
}

