function Empty(){}
function Place(cellId){
    PlaceImg(cellId, 'media/actions/gifs/fire.gif', true);
    // cell.setAttribute('type','fire');
    // cell.hp = 2;
}
function ExplosionWave(cellId, r){
    let cell = cellId.split('-');
    //Lift(cellId, 20, 1, 0);
    if(!r){
        r = 3;
    }
    for(let y=-r; y <= r; y++){
        for(let x=-r+Math.abs(y); x<=r-Math.abs(y); x++){
            timeQueue1(x,y);
            

            function timeQueue1(a,b){
                let cellStr = (Number(cell[0])+b)+'-'+(Number(cell[1])+a);
                if(!cellStr){ return }
                
                setTimeout(() => {
                    Lift(cellStr, 20, 1, 0);
                }, (Math.abs(a)+Math.abs(b))*100);

                setTimeout(() => {
                    Lift(cellStr, 0, 1, 20);
                    if(document.getElementsByClassName(cellStr)[0].getAttribute('type')=='wall'){
                        GetDamage(cellStr, 20);
                    }else{
                        GetDamage(cellStr, 3);
                    }
                }, (Math.abs(a)+Math.abs(b))*100+1000);
            }
        }
    }
}
function FireBall(cellId){
    let cords = cellId.split('-');
    
    let massive = [];
    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
            massive.push((Number(cords[0])+i)+'-'+(Number(cords[1])+j));
        }
    }

    for(let i=0; i<massive.length; i++){
        GetDamage(massive[i],2);
        let cell = document.getElementsByClassName(massive[i]);
         
        if(cell[0].getAttribute('type')==''){
            let fire = PlaceImg(massive[i], 'media/actions/gifs/fire.gif', true);
            fire.classList.add('fire');
            // cell[0].setAttribute('type','fire');
            cell[0].setAttribute('type','огонь');
            cell[0].hp = 4;
        }

        for(let j=0; j<cell.length;j++){
            if(cell[j].classList[1]=='player'){
                AddStatuses(cell[j])
            }
        }   
    }
}
async function Walk(cellId, subject) {
    let turn = WalkComputing(cellId, subject.classList[0]);
    let checkWall = true;
    for(let i=0; i<turn.length && checkWall; i++){
        checkWall = await MovePlayer(subject, turn[i]);
    }
    RefreshPlayerVisibility()
}
function Capitulating(){
    document.getElementsByClassName('body')[0].outerHTML='';
    alert('Игра закончена');
    location.reload();
}
function IceWall(cellId){
    let cords = cellId.split('-');
    ClearCell(cellId);
    WallCreate(Number(cords[0]),Number(cords[1]),'IceWall.png');
    RefreshPlayerVisibility();
}