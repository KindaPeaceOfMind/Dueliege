let sessionTurns = {};//[\session,\ turnId, player, hero, action, cell]
let turn = 0;
console.log(sessionParams);

turnPoster(turn, sessionParams.login, 'p1', 'action', '1-12');
turnGetter(turn);

function turnPoster(turn, player, hero, action, cell) {
    let body = [sessionParams.sessionId, turn, player, hero, action, cell];
    let url = '/session';
    let result = fetcher(url, body);
    alert(result);
}
function turnGetter(turn) {
    let body = [sessionParams.sessionId, turn];
    let url = '/session';

    let result = fetcher(url,body);
    
    if(result[0]){
        alert(result);
    }else{
        setTimeout(turnGetter, 3000, turn);
    }
}

async function fetcher(url,body){
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
    return await response.json();
}
