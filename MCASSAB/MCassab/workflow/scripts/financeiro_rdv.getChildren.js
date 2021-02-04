function getChildren(input, ids) {
    var array = [];
    
    ids.forEach(function(i) {
        array.push(value(input + "___" + i));
    })

    return array;
}


function value(field, def) {
    return hAPI.getCardValue(field) && hAPI.getCardValue(field) != '' ? JSON.parse(hAPI.getCardValue(field)) : def ? def : {};
}