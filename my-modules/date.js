exports.getWeekData = () =>{
    var week = new Array();
    var day = new Date();
    week.push(getDayObj(day));
    for (var i = 0; i < 5; i++) {
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1 + i);
        week.push(getDayObj(nextDay));
    }
    // console.log(week); // May 01 2000  
    return week;
}

function getDayObj(day) {
    var stringaGiorno = getNomeGiorno(day.getDay());
    var obj = {
        stringa: stringaGiorno,
        giorno: day.getDate(),
        mese: day.getMonth()
    }
    return obj;
}

function getNomeGiorno(giorno) {
    switch (giorno) {
        case 0:
            return "Domenica";
            break;
        case 1:
            return "Lunedi";
            break;
        case 2:
            return "Martedi";
            break;
        case 3:
            return "Mercoledi";
            break;
        case 4:
            return "Giovedi";
            break;
        case 5:
            return "Venerdi";
            break;
        case 6:
            return "Sabato";
            break; 
    }
}