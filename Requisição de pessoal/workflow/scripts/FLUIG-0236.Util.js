function getIndexes(fieldReference)
{
    var regex = new RegExp(fieldReference+'___');
    var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
    var iterator = map.keySet().iterator();
    var indexes = new java.util.TreeSet();  
    
    while(iterator.hasNext()){
                   var id = iterator.next();
                   if(id.match(regex) == null) continue;
                   else indexes.add(id.split('___')[1]);
    }
    return indexes;
}

function encrypt(content,passcode) 
{
    var result = []; 
    var passLen = passcode.length ;
    for(var i = 0  ; i < content.length ; i++) 
    {
        var passOffset = i%passLen ;
        var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
        result.push(calAscii);
    }
    
    return JSON.stringify(result) ;
};

function decrypt(content,passcode) 
{
    var result = [];
    var str = '';
    var codesArr = JSON.parse(content);
    var passLen = passcode.length ;
    
    for(var i = 0  ; i < codesArr.length ; i++) 
    {
        var passOffset = i%passLen ;
        var calAscii = (codesArr[i]-passcode.charCodeAt(passOffset));
        result.push(calAscii) ;
    }
    for(var i = 0 ; i < result.length ; i++) 
    {
        var ch = String.fromCharCode(result[i]); str += ch ;
    }
    
    return str ;
}
