function PlayerStats(){
    this.hp = 20,
    this.damage = 10
    this.skills = ['Walk','ExplosionWave','Place','Capitulating'],
    this.buffs = []
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
    div.style.zIndex = 2;
    div.id = playerId;
    div.classList.add(map.PlayersLocation[playerId][0]+'-'+map.PlayersLocation[playerId][1]);
    div.classList.add('player')
    if(Number(playerId[1])>2){//<<<<<<<<<<<
        div.team = sessionParams.login;
        div.setAttribute('border', '1px solid blue');
    }else{
        div.team = sessionParams.enemy;
        div.setAttribute('border', '1px solid red')
    }
    table.appendChild(div);

    //getplayerStats<<<<<<<<<<<<<<<
    div.playerStats = new PlayerStats;

    div.addEventListener('click', ClickHero);
}