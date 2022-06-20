function PlayerStats(num){
    this.status = [];
    this.radius = 7;
    this.maxStamina = 6;
    this.stamina = 6;
    if(num % 2 == 1){ // Если маг
        // this.skills = ['Capitulating','','Walk','FireBall','IceWall']
        this.skills = ['Сдаться','','Идти','Огненный шар','Ледяная стена']
        this.damage = 4;
    }else{            // Если рыцарь
        // this.skills = ['Capitulating','','Walk','EarthQuake']
        this.skills = ['Сдаться','','Идти','Землетрясение']
        this.damage = 5;
    }
    this.hp = 20;
}

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
    div.style.zIndex = 34*map.PlayersLocation[playerId][0]+map.PlayersLocation[playerId][1];
    div.id = playerId;
    div.classList.add(map.PlayersLocation[playerId][0]+'-'+map.PlayersLocation[playerId][1]);
    div.classList.add('player')
// Number(playerId[1])
    if(
        sessionParams.team == 2 && Number(playerId[1])>2 ||
        sessionParams.team == 1 && Number(playerId[1])<=2
    ){
        div.team = sessionParams.login;
        div.style.border = '1px solid limegreen';
    }else{
        div.team = sessionParams.enemy;
        div.style.border = '1px solid red';
    }
    table.appendChild(div);


    //getplayerStats<<<<<<<<<<<<<<<
    div.playerStats = new PlayerStats(Number(playerId[1]));

    div.addEventListener('click', ClickHero);
	div.addEventListener('mouseover', CellMouseHover);
}