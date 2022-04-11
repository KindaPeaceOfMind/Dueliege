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
    anim.classList.add('anim');
    anim.classList.add(cellId);
    anim.style.position = 'absolute';
    anim.style.left = 48*coords[1]+'px';
    anim.style.top = 28*coords[0]+'px';
    anim.style.width = 48+'px';
    anim.style.height = 28+'px';
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

    

    document.documentElement.style.setProperty('--walking-top-start', (-side[0]+y)*28+'px');
    document.documentElement.style.setProperty('--walking-left-start',(-side[1]+x)*48+'px');

    document.documentElement.style.setProperty('--walking-top', 28*y+'px');
    document.documentElement.style.setProperty('--walking-left', 48*x+'px');

    if(document.getElementsByClassName(y+'-'+x)[0].getAttribute('type') == 'wall'){
        return false
    }
    player.style.animation = 'walking '+speed+'s 1 forwards';
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            player.style.left = 48*x+'px';
            player.style.top  = 28*y+'px';
            player.style.animation = '';
            player.offsetHeight;//перерендер
            player.classList = y+'-'+x;
            resolve(true);
        }, speed*1600)
      });
    
}
/**
 * @start 'y-x'
 * @end 'y-x'
 * @возвращает [...[-1,-1], [-1,0]]
 */
function WalkComputing(start,end){
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