
const imePrezime = document.getElementById('imeiprezime');
const telefon = document.getElementById('telefon');
const dugmeDodaj = document.getElementById('akcijaBtn');
const imenik = document.getElementById('imenik');

const localStorageKontakti = JSON.parse(localStorage.getItem('kontakti'));

let kontakti = localStorage.getItem('kontakti') !== null ? localStorageKontakti : [];
 

function obrada(){
    if(imePrezime.value.trim()==="" || telefon.value.trim()===""){
        alert('Morate uneti sve podatke');     
    }else{
        let kontakt={};
        kontakt.imePrezime=imePrezime.value;
        kontakt.telefon=telefon.value;
        kontakt.id=randomID();
       
        kontakti.push(kontakt);
        
    if(izmeniKontakt !== null && izmeniKontakt.length==1 && izmeniKontakt !==undefined){
        noviKontakt(kontakt);
    }
        ubaciKontaktiLS();
        ubaciDOM(kontakt);
        ispisi();
       
        imePrezime.value = "";
        telefon.value = "";
        dugmeDodaj.textContent="Dodaj";
    }     
}

function noviKontakt(kontakt){
    
    for(let i in kontakti){
            if(kontakti[i].id==izmeniKontakt[0].id){
             stariKontakt =  kontakti.splice(i,1); 
            return kontakt;        
              }
     }    
 }

function randomID(){
    return Math.floor(Math.random()*100000000000);
}

function ubaciDOM(kontakt){
    const redTabele= document.createElement("tr");

    redTabele.innerHTML = `   
    <td>${kontakt.imePrezime}</td>
    <td>${kontakt.telefon}</td>
    <td><button class="btn btn-danger" onclick="izbrisiBtn(${kontakt.id})">Izbrisi</button></td>
    <td><button class="btn btn-warning" onclick="izmeniBtn(${kontakt.id})">Izmeni</button></td>       
  `
imenik.appendChild(redTabele); 
}

function izbrisiBtn(id){
kontakti = kontakti.filter(kontakt => kontakt.id !== id);

ubaciKontaktiLS();
ispisi();
}

let izmeniKontakt=[];
let stariKontakt;

function izmeniBtn(id){
izmeniKontakt = kontakti.filter(kontakt => kontakt.id == id);

imePrezime.value=izmeniKontakt[0].imePrezime;
telefon.value=izmeniKontakt[0].telefon;
dugmeDodaj.textContent='Izmeni';
     
}


function ubaciKontaktiLS(){
    localStorage.setItem('kontakti',JSON.stringify(kontakti));
}  

function ispisi(){
    imenik.innerHTML=``;

    kontakti.forEach(ubaciDOM);
}

ispisi();






