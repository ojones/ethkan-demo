$(document).ready(function(){

    var cards; // global dictionary of cards

    // get cards first and display
    $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(result){
        cards = result;
        $("#div1").html(JSON.stringify(result));
    }});

    // ui event for get cards button
    $("#listcards").click(function(){
        $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(result){
            cards = result;
            $("#div1").html(JSON.stringify(result));
        }});
    });

    // ui event for create card
    $("#createcard").click(function(){
        // post new card
        $.ajax({
            type: "POST",
            url: 'https://ethkanproject.firebaseio.com/cards.json',
            data: JSON.stringify(newCard()),
            success: function(result) {
                $("#div2").html('Created new card with key ' + result);
                // get and update list of cards
                $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                    cards = updatedCards
                    $("#div1").html(JSON.stringify(updatedCards));
                }});
            },
            dataType: "json"
            });
    });

    // ui event for claim card
    $("#claimcard").click(function(){
        // patch randomly selected card with new address from claimed_by
        var cardId = selectRandom(Object.keys(cards))
        $.ajax({
            type: "POST",
            url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
            data: JSON.stringify({ claimed_by: randAddr() }),
            success: function(result) {
                $("#div3").html('User ' + result.claimed_by + ' claimed "' + cards[cardId].task_name + '"');
                // get and update list of cards
                $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                    cards = updatedCards
                    $("#div1").html(JSON.stringify(updatedCards));
                }});
            },
            dataType: "json"
            });
    });

    // ui event for approve card
    $("#approvecard").click(function(){
        // patch randomly selected card with 0 for acct_bal
        var cardId = selectRandom(Object.keys(cards))
        $.ajax({
            type: "POST",
            url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
            data: JSON.stringify({ acct_bal: 0 }),
            success: function(result) {
                $("#div4").html('Card "' + cards[cardId].task_name + '" was approved and funds were released');
                // get and update list of cards
                $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                    cards = updatedCards
                    $("#div1").html(JSON.stringify(updatedCards));
                }});
            },
            dataType: "json"
            });
    });

    // ui event for card balance
    $("#cardbalance").click(function(){
        // get randomly selected card acct_bal
        var cardId = selectRandom(Object.keys(cards))
        $.ajax({url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json', success: function(card){
            $("#div5").html('The balance of card "' + card.task_name + '" is ' + card.acct_bal);
        }});
    });

    // ui event for fund card
    $("#fundcard").click(function(){
        // patch randomly selected card by adding funds to acct_bal
        var cardId = selectRandom(Object.keys(cards))
        var fundsToAdd = randNum()
        var newBalance = cards[cardId].acct_bal + fundsToAdd
        $.ajax({
            type: "POST",
            url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
            data: JSON.stringify({ acct_bal: newBalance }),
            success: function(result) {
                $("#div6").html('Added ' + fundsToAdd + ' to card "' + cards[cardId].task_name + '" balance');
                // get and update list of cards
                $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                    cards = updatedCards
                    $("#div1").html(JSON.stringify(updatedCards));
                }});
            },
            dataType: "json"
            });
    });

    // ui event for delete cards
    $("#deletecards").click(function(){
        // put only one new card there by deleting all others
        $.ajax({
            type: "PUT",
            url: 'https://ethkanproject.firebaseio.com/cards.json',
            data: JSON.stringify({ FristCard: newCard() }),
            success: function(result) {
                cards = result;
                $("#div7").html('Deleted all cards but added new one');
                // get and update list of cards
                $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(updatedCards){
                    cards = updatedCards
                    $("#div1").html(JSON.stringify(updatedCards));
                }});
            },
            dataType: "json"
            });
    });

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

});