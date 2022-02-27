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
 * @player {'id'} player's id for getElementById
 * @side {[1,1]} x+1, y+1
 */
function MovePlayer(player, side){
    player.style.animation = 'move_'+side[0]+'_'+side[1]+' 0.1s 1';
    let arr = [];
    setTimeout(()=>{
        player.style.animation = '';
        arr = player.style.left.slice(0, -2);
        player.style.left = Number(arr)+48*side[0]+'px';

        arr = player.style.top.slice(0, -2);
        player.style.top = Number(arr)+28*side[1]+'px';

    }, 100);
}
InitAnimationsForMovePlayer();
function InitAnimationsForMovePlayer(){
    let moveArray = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];
    for(let side = 1; side<=9; side++){
        let style = document.createElement('style');
        style.type = 'text/css';
        let keyFrames = '\
        @-webkit-keyframes move_'+moveArray[side-1][0]+'_'+moveArray[side-1][1]+' {\
            0%{\
                -webkit-transform: translate('+0+'px, '+0+'px);\
            }\
            100% {\
                -webkit-transform: translate('+48*moveArray[side-1][0]+'px, '+24*moveArray[side-1][1]+'px);\
            }\
        }\
        @-moz-keyframes move'+moveArray[side-1]+' {\
            0%{\
                -webkit-transform: translate('+0+'px, '+0+'px);\
            }\
            100% {\
                -webkit-transform: translate('+48*moveArray[side-1][0]+'px, '+24*moveArray[side-1][1]+'px);\
            }\
        }';
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
