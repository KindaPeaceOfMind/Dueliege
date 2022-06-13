/**
 * Вставляет изображение в клетку
 * @cellId {'x-y'} Id for coords
 * @media {string} path to gif/img
 * @skew {bool} true for skew(32deg)
 */
function PlaceImg(cellId, media, skew){
    //console.log('placeCell '+cellId+' is done');
    let coords = cellId.split('-');

    let anim = document.createElement('img');
    // anim.classList.add('anim');
    anim.classList.add(cellId);
    anim.style.position = 'absolute';
    anim.style.left = 48*coords[1]+'px';
    anim.style.top = 28*coords[0]+'px';
    anim.style.width = 48+'px';
    anim.style.height = 28+'px';
    anim.style.zIndex = 34*Number(coords[0])+Number(coords[1]);;
    anim.classList = coords[0]+'-'+coords[1];
	anim.addEventListener('click', ClickCell);
	anim.addEventListener('mouseover', CellMouseHover);
    anim.src = media;
    if(skew){anim.style.transform = 'skewX(32deg)';}
    table.appendChild(anim);
}
let optiLift = {};
let optiLiftCounter = 0;
/**
 * Перемещает клетку вверх-вниз
 * @cellId {'x-y'} Id for coords
 * @level {int} lift to int level
 * @speed {secs} speed of animation
 * @startlevel {int} lift from int level
 */
function Lift(cellId, level, speed, startlevel) {
    //console.log(cellId, level, speed, startlevel);
    let cells = document.getElementsByClassName(cellId);
    if(!cells){
        return
    }
    for(let cell=0; cell<cells.length; cell++){
        if (!cells[cell]){
            continue
        }
        let optiLiftParams = level+'_'+speed+'_'+startlevel; //Параметры
        if(!optiLift.hasOwnProperty([optiLiftParams])){//optilift.
            
            optiLiftCounter+=1;
            optiLift[optiLiftParams] = optiLiftCounter;
            //console.log(optiLift);
            
            let style = document.createElement('style');
            style.type = 'text/css';

            let keyFrames = '\
            @-webkit-keyframes lift'+optiLiftCounter+' {\
                0%{\
                    -webkit-transform: translate('+startlevel+'px, '+startlevel*1.7+'px);\
                }\
                100% {\
                    -webkit-transform: translate('+level+'px, '+level*1.7+'px);\
                }\
            }\
            @-moz-keyframes lift'+optiLiftCounter+' {\
                0%{\
                    -moz-transform: translate('+startlevel+'px, '+startlevel*1.7+'px);\
                }\
                100% {\
                    -moz-transform: translate('+level+'px, '+level*1.7+'px);\
                }\
            }';
            style.innerHTML = keyFrames;
            document.getElementsByTagName('head')[0].appendChild(style);

            cells[cell].style.animation = 'lift'+optiLiftCounter+' '+speed+'s 1';
        }else{
            cells[cell].style.animation = 'lift'+optiLift[optiLiftParams]+' '+speed+'s 1';
        }
    }
}
/**
 * Передвигает игрока на одну клетку
 * @player player-object-div
 * @side [1,1] y+1, x+1
 */
async function MovePlayer(player, side){
    let speed = 0.1; //sec
    let playerPosition = player.classList[0].split('-');
    let y = Number(playerPosition[0])+side[0];
    let x = Number(playerPosition[1])+side[1];

    

    document.documentElement.style.setProperty('--walking-left-start',(x-side[1])*48-18+'px');
    document.documentElement.style.setProperty('--walking-top-start', (y-side[0])*28-60+'px');

    document.documentElement.style.setProperty('--walking-left', 48*x-18+'px');
    document.documentElement.style.setProperty('--walking-top',  28*y-60+'px');

    let cell = document.getElementsByClassName(y+'-'+x)
    for(let i=0; i<cell.length;i++){
        if(cell[i].classList.contains('player') || cell[i].getAttribute('type') == 'wall'){
            Attack(player, cell[i]);
            return false;
        }
    }
    


    player.style.animation = 'walking '+speed+'s 1 forwards';
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            player.style.left = 48*x-18+'px';
            player.style.top  = 28*y-60+'px';
            player.style.animation = '';
            player.classList.remove(player.classList[0]);
            player.classList = y+'-'+x+' '+player.classList;
	        player.style.zIndex = 34*y+x;
            player.offsetHeight;//перерендер
            AddStatuses(player);
            resolve(true);
        }, speed*1600)
    });
}
/**
 * Накладывает статусы на игрока в 
 * зависимости от клетки на которой он стоит
 * @player obj
 */
function AddStatuses(player){
    cell = document.getElementsByClassName(player.classList[0]);
    for(let i=0; i<cell.length; i++){
        switch (cell[i].getAttribute('type')) {
            case 'fire':
            case 'огонь':
                // player.playerStats.status.fire = '2';
                player.playerStats.status.огонь = '2';
                GetDamage(player.classList[0], 1);
            break;
        } 
    }
}
/**
 * Наносит урон субъекту//игроку, 
 * равный атаке игрока 
 * @player obj 
 * @subj cellId
 */
function Attack(player, subj){
    if(subj.classList.contains('player')){
        subj.playerStats.hp -= player.playerStats.damage
        DamageIndicator(subj.classList[0],player.playerStats.damage);
        if(subj.playerStats.hp <= 0){
            subj.outerHTML='';
            CheckWin();
        }
    }else{
        subj.hp -= player.playerStats.damage
        DamageIndicator(subj.classList[0],player.playerStats.damage);
        if(subj.hp <= 0){
            ClearCell(subj.classList[0])
        }
    }
}
/**
 * Наносит урон субъекту//игроку на клетке, 
 * равный damage
 */
function GetDamage(cellId,damage){
    let cell = document.getElementsByClassName(cellId);
    for(let i=0; i<cell.length; i++){
        if(cell[i].classList.contains('player')){
            cell[i].playerStats.hp -= damage;
            DamageIndicator(cellId,damage);
            if(cell[i].playerStats.hp <= 0){
                cell[i].outerHTML='';
                CheckWin();
            }
            return
        }
    }
    if(cell[0].getAttribute('type')!=''){
        cell[0].hp -= damage;
        DamageIndicator(cellId,damage);
        if(cell[0].hp <= 0){
            ClearCell(cellId);
            delete cell[0].hp
        }
    }
}
let damageIndicatorMassive = {}//чтобы цифры не сливались
function DamageIndicator(cellId, damage){
    if(damageIndicatorMassive[cellId]){
        setTimeout(() => {
            DamageIndicator(cellId, damage);
        }, 2000);
        return
    }
    damageIndicatorMassive[cellId] = true;
    let div = document.createElement('div');
    let coords = cellId.split('-');
    div.innerHTML = damage;
    div.style.position = 'absolute';
    div.style.transform = 'skewX(32deg)';
    div.style.color = 'orange';
    div.style.zIndex = 999;
    div.style.fontSize = '22px';
    div.style.left = 48*coords[1]+24+'px';
    div.style.top = 28*coords[0]+'px';
    div.style.animation = 'damageGet 2.5s ease-out';

    document.querySelector('table').appendChild(div);
    setTimeout(() => {
        delete damageIndicatorMassive[cellId];
    }, 2000);
    setTimeout(() => {
        div.outerHTML = '';
    }, 2500);
}
function CheckWin(){
    let players = document.getElementsByClassName('player');
    let firstTeam = players[0].team;
    let win = true;
    for(let i = 1; i<players.length; i++){
        if(players[i].team != firstTeam){
            win = false;
        }
    }
    if(win){
        turnPoster(sessionParams.login, 'Capitulating', 'Capitulating', 'Capitulating')
        Capitulating();
    }
}
/**
 * Сносит всё ненужное на клетке и присваивает type= ' '
 */
function ClearCell(cellId){
    let cell = document.getElementsByClassName(cellId);
    cell[0].setAttribute('type', '')
    for(i=1; i<cell.length; i++){
        cell[i].remove();
        i--;
    }
    RefreshPlayerVisibility()
}
/**
 * @start 'y-x'
 * @end 'y-x'
 * @возвращает [...[-1,-1], [-1,0]]
 */
function WalkComputing(start,end){
    if(!start || !end){
        alert('Ошибка вычисления')
        return
    }
    start = start.split('-');// [y,x]
    end = end.split('-');// [y,x]

    let y = start[0]-end[0];
    let x = start[1]-end[1];
    let turn = [];

    while(y!=0 || x!=0){
        let part = [];

        part.push(Math.sign(y));
        y -= part[0];

        part.push(Math.sign(x));
        x -= part[1];

        turn.push(part);
    }
    return turn
}
function RefreshPlayerVisibility() {
    let players = document.getElementsByClassName('player')
    for(let i=0; i<players.length; i++){
        if(players[i].team == sessionParams.login || CheckEnemyVisibility(players[i])){
            players[i].style.display = 'block';
        }else{
            players[i].style.display = 'none';
        }
    }
    function CheckEnemyVisibility(enemy){
        for(let i=0; i<players.length; i++){//Для каждого игрока
            if(players[i].team == sessionParams.login){//Для каждого союзника
                // console.log(CheckCoordsVisibility(players[i].classList[0], enemy.classList[0]),players[i].classList[0], enemy.classList[0]);
                if(CheckCoordsVisibility(players[i].classList[0], enemy.classList[0])){//Если не видно
                    return true
                }
            }
        }
        return false
    }
}
/**
 * Если корды видят друг друга/без стен
 * возвращаем true
 */
function CheckCoordsVisibility(id1, id2){
    id1 = id1.split('-');
    id2 = id2.split('-');

    let y = Number(id1[0]) - Number(id2[0]);
    let x = Number(id1[1]) - Number(id2[1]);

    if(Math.abs(x)>Math.abs(y)){
        let coef = y/x;
        if(x==0){
            coef = y;
        }
        if(y==0){
            coef = 1/x;
        }

        if(x>0){
            for(let i=0; i<x; i++){
                // document.getElementsByClassName( (Number(id1[0])+Math.ceil(coef*-i)) +'-'+ (-i+Number(id1[1])) )[0].style.borderColor='#f00';
                if(document.getElementsByClassName( (Number(id1[0])+Math.ceil(coef*-i)) +'-'+ (-i+Number(id1[1])) )[0].getAttribute('type')=='wall'){
                    return false
                }
            }
        }else{
            for(let i=0; i>x; i--){
                // document.getElementsByClassName( (Number(id1[0])+Math.ceil(coef*-i)) +'-'+ (-i+Number(id1[1])) )[0].style.borderColor='#f00';
                if(document.getElementsByClassName( (Number(id1[0])+Math.ceil(coef*-i)) +'-'+ (-i+Number(id1[1])) )[0].getAttribute('type')=='wall'){
                    return false
                }        
            }
        }
    }else{
        let coef = x/y;
        if(x==0){
            coef = 1/y;
        }
        if(y==0){
            coef = x;
        }
        if(y>0){
            for(let i=0; i<y; i++){
                // document.getElementsByClassName( (Number(id1[0])-i) +'-'+ (Math.ceil(coef*-i)+Number(id1[1])) )[0].style.borderColor='#f00';
                if(document.getElementsByClassName( (Number(id1[0])-i) +'-'+ (Math.ceil(coef*-i)+Number(id1[1])) )[0].getAttribute('type')=='wall'){
                    return false
                }
            }
        }else{
            for(let i=0; i>y; i--){
                // document.getElementsByClassName( (Number(id1[0])-i) +'-'+ (Math.ceil(coef*-i)+Number(id1[1])) )[0].style.borderColor='#f00';
                if(document.getElementsByClassName( (Number(id1[0])-i) +'-'+ (Math.ceil(coef*-i)+Number(id1[1])) )[0].getAttribute('type')=='wall'){
                    return false
                }        
            }
        }
    }
    return true
}