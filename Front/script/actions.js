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
                setTimeout(() => {
                    Lift(cellStr, 20, 1, 0);
                }, (Math.abs(a)+Math.abs(b))*100);

                setTimeout(() => {
                    Lift(cellStr, 0, 1, 20);
                    if(document.getElementsByClassName(cellStr)[0].getAttribute('type')=='wall'){
                        GetDamage(cellStr, 20);
                    }else{
                        GetDamage(cellStr, 2);
                    }
                }, (Math.abs(a)+Math.abs(b))*100+1000);
            }
        }
    }
}
function FireBall(cellId){
    let cords = cellId.split('-');
    let massive = [ //+
        (cords[0])+'-'+(cords[1]),
        (cords[0]-1)+'-'+(cords[1]), (Number(cords[0])+1)+'-'+(cords[1]),
        (cords[0])+'-'+(cords[1]-1), (cords[0])+'-'+(Number(cords[1])+1),
    ];
    for(let i=0; i<massive.length; i++){
        GetDamage(massive[i],2);
        let cell = document.getElementsByClassName(massive[i]);
         
        if(cell[0].getAttribute('type')==''){
            PlaceImg(massive[i], 'media/actions/gifs/fire.gif', true);
            cell[0].setAttribute('type','fire');
            cell[0].hp = 2;
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
    WallCreate(Number(cords[0]),Number(cords[1]),'IceWall.png')
}