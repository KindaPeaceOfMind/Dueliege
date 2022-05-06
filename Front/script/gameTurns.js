
let sessionTurns = {};//[\session,\ turnId, player, hero, action, cell]
let turn = 0;
let yourTurn = false;

RefreshPlayerVisibility();
turnGetter(turn);

async function turnPoster(player, heroId, action, cell) {
    let body = [sessionParams.sessionId, turn, player, heroId, action, cell];
    let url = '/session';
    let result = await fetcher(url, body);
    turn+=1;
}
async function turnGetter(turnToGet) {
    let body = [sessionParams.sessionId, turnToGet];
    let url = '/session';

    let result = await fetcher(url,body);
    
    if(turnToGet==0 && result[0]==1){
        
    }

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
    await turnPoster(sessionParams.login, 'ChangeTurn', 'ChangeTurn', '0-0');
    ChangeTurn();
}
function ChangeTurn(){
    yourTurn = !yourTurn;
    action = false;
    actionSubject = false;
    RefreshStats();
    if(!yourTurn){
        ShowSkills();
        turnGetter(turn);
    }
}
function RefreshStats(){
    let players = document.getElementsByClassName('player');
    for(let i=0; i<players.length; i++){
        players[i].stamina = players[i].maxStamina;//stamina
        
        for(let j=0; i<players[i].playerStats.status.length; j++){//снимаем один ход статусов
            players[i].playerStats.status[j] -= 1;
            switch (players[i].playerStats.status[j]) {
                case 'fire':
                    GetDamage(players[i].classList[0],1);
                break;
            }
            if(players[i].playerStats.status[j] == 0){
                delete players[i].playerStats.status[j];
                // j--;
            }
        }
    }
}