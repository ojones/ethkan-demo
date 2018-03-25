// these are just random helper functions

function randAddr() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return '0x' + text;
}

function selectRandom(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function randNum() {
    return Math.floor(Math.random() * 100) + 1
}

var verbs = ['ask','be','become','begin','call','can','come','could','do','feel','find','get','give','go',
    'have','hear','help','keep','know','leave','let','like','live','look','make','may','mean','might','move',
    'need','play','put','run','say','see','seem','should','show','start','take','talk','tell','think','try',
    'turn','use','want','will','work','would']

var nouns = ['area','book','business','case','child','company','country','day','eye','fact','family','government',
    'group','hand','home','job','life','lot','man','money','month','mother','Mr','night','number','part','people',
    'place','point','problem','program','question','right','room','school','state','story','student','study','system',
    'thing','time','water','way','week','woman','word','work','world','year']

function randName() {
    return capitalizeFirstLetter(selectRandom(verbs)) + ' a ' + selectRandom(nouns);
}

function randToken() {
    return capitalizeFirstLetter(selectRandom(nouns)) + ' token';
}

function newCard() {
    return {
        acct_bal: randNum(),
        claimed_by: randAddr(),
        task_name: randName(),
        project_token: randToken()
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}