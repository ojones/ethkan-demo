// these are the api calls which are meant to emulate smart contracts deployed on blockchain

function getCards(successFn) {
    $.ajax({url: "https://ethkanproject.firebaseio.com/cards.json", success: function(result){
        successFn(result)
    }});
}

function createCard(card, successFn) {
    $.ajax({
        type: "POST",
        url: 'https://ethkanproject.firebaseio.com/cards.json',
        data: JSON.stringify(card),
        success: function(result) {
            successFn(result)
        },
        dataType: "json"
        });
}

function claimCard(cardId, successFn) {
    $.ajax({
        type: "POST",
        url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
        data: JSON.stringify({ claimed_by: randAddr() }),
        success: function(result) {
            successFn(result)
        },
        dataType: "json"
        });
}

function approveCard(cardId, successFn) {
    $.ajax({
        type: "POST",
        url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
        data: JSON.stringify({ acct_bal: 0 }),
        success: function(result) {
            successFn(result)
        },
        dataType: "json"
        });
}

function cardBalance(cardId, successFn) {
    $.ajax({url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json', 
    success: function(result){
        successFn(result)
    }});
}

function fundCard(cardId, newBalance, successFn) {
    $.ajax({
        type: "POST",
        url: 'https://ethkanproject.firebaseio.com/cards/' + cardId + '.json?x-http-method-override=PATCH',
        data: JSON.stringify({ acct_bal: newBalance }),
        success: function(result) {
            successFn(result)
        },
        dataType: "json"
        });
}

function deleteCards(newCard, successFn) {
    $.ajax({
        type: "PUT",
        url: 'https://ethkanproject.firebaseio.com/cards.json',
        data: JSON.stringify({ FristCard: newCard }),
        success: function(result) {
            successFn(result)
        },
        dataType: "json"
        });
}