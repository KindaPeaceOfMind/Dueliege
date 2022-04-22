function PlayerStats(){
    this.hp = 20,
    this.damage = 10
    this.skills = ['Walk','ExplosionWave','Place','Capitulating'],
    this.radius = 7,
    this.maxStamina = 8,
    this.stamina = 8
};

// Серверная часть
//////////////////////////////////////////////////////////////////////////
// Клиентская часть

for(playerId in map.PlayersLocation){
    let div = document.createElement('div');
    div.style.width = '46px';
    div.style.height = '86px';
    div.style.left = 48*map.PlayersLocation[playerId][1]-18+'px';
    div.style.top = 28*map.PlayersLocation[playerId][0]-60+'px';

    // div.style.backgroundColor = 'red';//<<<<<<<<<<<
    div.style.background = 'url(media/sprites/players/mage'+Number(playerId[1])+'.png)';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'contain';
    div.style.position = 'absolute';
    div.style.zIndex = 2;
    div.id = playerId;
    div.classList.add(map.PlayersLocation[playerId][0]+'-'+map.PlayersLocation[playerId][1]);
    div.classList.add('player')
// Number(playerId[1])
    if(
        sessionParams.team == 2 && Number(playerId[1])>2 ||
        sessionParams.team == 1 && Number(playerId[1])<=2
    ){
        div.team = sessionParams.login;
        div.style.border = '1px solid blue';
    }else{
        div.team = sessionParams.enemy;
        div.style.border = '1px solid red';
    }
    table.appendChild(div);

    //getplayerStats<<<<<<<<<<<<<<<
    div.playerStats = new PlayerStats;

    div.addEventListener('click', ClickHero);
}