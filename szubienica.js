let pulapHasel = [
    "chomik w kółku", "bananowa pizza", "słońce w kapeluszu", "kangurzy kubek", "piesek na rowerze", "ślimak w garniturze", "żaba w kapeluszu", "królik w okularach", "radosny rożek", "wesołe wiewiórki", 
    "sarenka na nartach", "krówka w śniegu","besz", "szczęśliwe truskawki", "kaczka w kapeluszu", "krowa na wrotkach",
     "niedźwiedź na rowerze", "kiełbasa na spacerze","rudy", "kogut w goglach", "pingwin w marynarce", "motylek w kurtce", "śledzik w okularach", "tucznik w koszuli", "myszka w baloniku", "delfin w czapce",
      "zając w śniegu", "chomik w kasku", "nietoperz na deskorolce", "jeż na hulajnodze", "żółw w kapeluszu", "krab w muszli"
];

let haslo = losujHaslo();
haslo = haslo.toUpperCase();
let dlugosc = haslo.length;
let ile_skuch = 0;
const yes = new Audio("sound/yes.wav");
const no = new Audio("sound/no.wav");
let haslo1 = "";

for (let i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) == " ")
        haslo1 = haslo1 + " ";
    else
        haslo1 = haslo1 + "-";
}

function wypisz_haslo() {
    document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

let litery = new Array(35);
litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function start() {
    let tresc_diva = "";
    for (let i = 0; i <= 34; i++) {
        const element = "lit" + i;
        tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz(' + i + ')" id="' + element + '">' + litery[i] + '</div>';
        if ((i + 1) % 7 == 0)
            tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
    }
    document.getElementById("alfabet").innerHTML = tresc_diva;
    wypisz_haslo();
}

String.prototype.ustawZnak = function (miejsce, znak) {
    if (miejsce > this.length - 1)
        return this.toString();
    else
        return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
};

function losujHaslo() {
    const losowyIndex = Math.floor(Math.random() * pulapHasel.length);
    return pulapHasel[losowyIndex];
}

function sprawdz(nr) {
    let trafiona = false;
    for (let i = 0; i < dlugosc; i++) {
        if (haslo.charAt(i) == litery[nr]) {
            haslo1 = haslo1.ustawZnak(i, litery[nr]);
            trafiona = true;
        }
    }
    if (trafiona == true) {
        yes.play();
        const element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        wypisz_haslo();
    } else {
        no.play();
        const element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        //skucha
        ile_skuch++;
        const obraz = "img/s" + ile_skuch + ".png";
        document.getElementById("szubienica").innerHTML = '<img src="' + obraz + '" alt="" />';
    }
    //wygrana
    if (haslo == haslo1)
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + haslo + '<br /><br /><span class="reset" onclick="nowaGra()">Jeszcze raz?</span>';
    //przegrana
    if (ile_skuch >= 9)
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: " + haslo + '<br /><br /><span class="reset" onclick="nowaGra()">Jeszcze raz?</span>';
}

function nowaGra() {
    haslo = losujHaslo();
    haslo = haslo.toUpperCase();
    dlugosc = haslo.length;
    ile_skuch = 0;
    haslo1 = "";
    for (let i = 0; i < dlugosc; i++) {
        if (haslo.charAt(i) == " ")
            haslo1 = haslo1 + " ";
        else
            haslo1 = haslo1 + "-";
    }
    document.getElementById("szubienica").innerHTML = "";
    start();
}
