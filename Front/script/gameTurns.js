
let sessionTurns = {};//[\session,\ turnId, player, hero, action, cell]
let turn = 0;
let yourTurn = false;

turnGetter(turn);

async function turnPoster(player, hero, action, cell) {
    let body = [sessionParams.sessionId, turn, player, hero.id, action, cell];
    let url = '/session';
    let result = await fetcher(url, body);
    turn+=1;
}
async function turnGetter(turnToGet) {
    let body = [sessionParams.sessionId, turnToGet];
    let url = '/session';

    let result = await fetcher(url,body);
    
    if(result[0]==1){
        if(result[1][2]=='ChangeTurn'){
            turn+=1;
            ChangeTurn();
        }else{
            turn+=1;
            action = result[1][2]
            actionSubject = document.getElementById(result[1][1]);
            ActionPerformer(result[1][3]);
            setTimeout(turnGetter, 3000, turn);
        }
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
async function ClickChangeTurn(){
    await turnPoster(sessionParams.login, 'p0', 'ChangeTurn', '0-0');
    ChangeTurn();
}
function ChangeTurn(){
    yourTurn = !yourTurn;
    if(!yourTurn){
        ShowSkills();
        turnGetter(turn);
    }
}