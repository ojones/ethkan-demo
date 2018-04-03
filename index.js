// this is the code that directly touches ui elements
$(document).ready(function(){

    var cards; // global dictionary of cards

    function updateCardsList(result) {
        cards = result;
        $("#div1").html(JSON.stringify(result));
    }

    // get cards first and display
    getCards(updateCardsList)

    // ui event for get cards button
    $("#listcards").click(function(){
        // get and update list of cards
        getCards(updateCardsList)
    });

    // ui event for create card
    $("#createcard").click(function(){
        // post new card
        createCard(newCard(), function(result){
            $("#div2").html('Created new card with key ' + result.name);
            // get and update list of cards
            getCards(updateCardsList)
        })
    });

    // ui event for claim card
    $("#claimcard").click(function(){
        // patch randomly selected card with new address from claimed_by
        var cardId = selectRandom(Object.keys(cards))
        claimCard(cardId, randAddr(), function(result){
            $("#div3").html('User ' + result.claimed_by + ' claimed "' + cards[cardId].task_name + '"');
            // get and update list of cards
            getCards(updateCardsList)
        })
    });

    // ui event for approve card
    $("#approvecard").click(function(){
        // patch randomly selected card with 0 for acct_bal
        var cardId = selectRandom(Object.keys(cards))
        approveCard(cardId, function(result) {
                $("#div4").html('Card "' + cards[cardId].task_name + '" was approved and funds were released');
                // get and update list of cards
                getCards(updateCardsList)
        })
    });

    // ui event for card balance
    $("#cardbalance").click(function(){
        // get randomly selected card acct_bal
        var cardId = selectRandom(Object.keys(cards))
        cardBalance(cardId, function(result){
            $("#div5").html('The balance of card "' + result.task_name + '" is ' + result.acct_bal);
        });
    });

    // ui event for fund card
    $("#fundcard").click(function(){
        // patch randomly selected card by adding funds to acct_bal
        var cardId = selectRandom(Object.keys(cards))
        var fundsToAdd = randNum()
        var newBalance = cards[cardId].acct_bal + fundsToAdd
        fundCard(cardId, newBalance, function(result) {
            $("#div6").html('Added ' + fundsToAdd + ' to card "' + cards[cardId].task_name + '" balance');
            // get and update list of cards
            getCards(updateCardsList)
        });
    });

    // ui event for delete cards
    $("#deletecards").click(function(){
        // put only one new card there by deleting all others
        deleteCards(newCard(), function(result) {
            $("#div7").html('Deleted all cards but added new one');
            // get and update list of cards
            getCards(updateCardsList)
        });
    });
});