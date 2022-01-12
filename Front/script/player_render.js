let playerStats = {
    'hp': 20, 'armor': 10,
    'stamina': 8, 'mana': 3,
    'skills': ['walk','blowup'], 'buffs': [], 'resists': [],
    'lvl': 1, 'stats': []
};

// Серверная часть
//////////////////////////////////////////////////////////////////////////
// Клиентская часть

for(playerId in map.PlayersLocation){
    let div = document.createElement('div');
    div.style.width = '46px';
    div.style.height = '24px';
    div.style.left = 48*map.PlayersLocation[playerId][1]+'px';
    div.style.top = 28*map.PlayersLocation[playerId][0]+'px';
    div.style.backgroundColor = 'red';//<<<<<<<<<<<
    div.style.position = 'absolute';
    div.id = playerId;
    if(Number(playerId[1])>2){
        div.team = sessionParams.login;
    }else{
        div.team = sessionParams.enemy;
    }
    table.appendChild(div);

    //getplayerStats<<<<<<<<<<<<<<<
    div.playerStats = playerStats;

    div.addEventListener('click', ClickHero);
}