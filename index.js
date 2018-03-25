$(document).ready(function(){

    $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(cards){

        $("#div1").html(JSON.stringify(cards));

        $("#listcards").click(function(){
            $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(result){
                $("#div1").html(JSON.stringify(result));
            }});
        });

        $("#createcard").click(function(){
            $.ajax({
                type: "POST",
                url: 'https://ethkanproject.firebaseio.com/cards.json',
                data: JSON.stringify(newCard()),
                success: function(result) {
                    $("#div2").html(JSON.stringify(result));
                    $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                        cards = updatedCards
                    }});
                },
                dataType: "json"
                });
        });

        $("#claimcard").click(function(){
            var cardId = selectRandom(Object.keys(cards))
            $.ajax({
                type: "POST",
                url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '/.json?x-http-method-override=PATCH',
                data: JSON.stringify({ claimed_by: randAddr() }),
                success: function(result) {
                    $("#div3").html(JSON.stringify('User ' + result.claimed_by + ' claimed ' + cards[cardId].name));
                },
                dataType: "json"
                });
        });

        $("#approvecard").click(function(){
            var cardId = selectRandom(Object.keys(cards))
            $.ajax({
                type: "POST",
                url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '/.json?x-http-method-override=PATCH',
                data: JSON.stringify({ acct_bal: 0 }),
                success: function(result) {
                    $("#div4").html(JSON.stringify('Card ' + cards[cardId].name + ' was approved and funds were released'));
                },
                dataType: "json"
                });
        });

        $("#cardbalance").click(function(){
            var cardId = selectRandom(Object.keys(cards))
            $.ajax({url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '/.json', success: function(card){
                $("#div5").html(JSON.stringify('The balance of card ' + card.name + ' is ' + card.acct_bal));
            }});
        });

        $("#fundcard").click(function(){
            var cardId = selectRandom(Object.keys(cards))
            var addVal = randNum()
            var newBalance = cards[cardId].acct_bal + addVal
            $.ajax({
                type: "POST",
                url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '/.json?x-http-method-override=PATCH',
                data: JSON.stringify({ acct_bal: newBalance }),
                success: function(result) {
                    $("#div6").html(JSON.stringify('Added ' + addVal + ' to card ' + cards[cardId].name + ' balance'));
                },
                dataType: "json"
                });
        });

        $("#deletecards").click(function(){
            var cardId = selectRandom(Object.keys(cards))
            var addVal = randNum()
            var newBalance = cards[cardId].acct_bal + addVal
            $.ajax({
                type: "PUT",
                url: 'https://ethkanproject.firebaseio.com/cards.json',
                data: JSON.stringify(newCard()),
                success: function(result) {
                    console.log(result);
                    $("#div7").html(JSON.stringify('Deleted all cards but added new one'));
                },
                dataType: "json"
                });
        });
    }});

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
        return { '-L8QjStart': {
                acct_bal: randNum(),
                claimed_by: randAddr(),
                task_name: randName(),
                project_token: randToken()
            }
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

});