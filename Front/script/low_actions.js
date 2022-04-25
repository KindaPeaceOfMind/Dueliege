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
    anim.style.zIndex = 1;
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
        // setTimeout(() => {
        //     cell.style.transform = 'translate('+level+'px, '+level*1.7+'px)';
        //     cell.style.animation = '';
        // }, speed*(1000));
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
                player.playerStats.status.fire = '1';//2
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
        if(subj.playerStats.hp <= 0){
            subj.outerHTML='';
            CheckWin();
        }
    }else{
        subj.hp -= player.playerStats.damage
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
            cell[i].playerStats.hp -= damage
            if(cell[i].playerStats.hp <= 0){
                cell[i].outerHTML='';
                CheckWin();
            }
            return
        }
    }
    if(cell[0].getAttribute('type')!=''){
        cell[0].hp -= damage;
        if(cell[0].hp <= 0){
            ClearCell(cellId);
            delete cell[0].hp
        }
    }
}
function CheckWin() {
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