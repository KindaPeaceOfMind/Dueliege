function Empty(){}
function Place(cellId){
    PlaceImg(cellId, 'media/actions/gifs/Explosion.gif', true);
}
function ExplosionWave(cellId){
    let cell = cellId.split('-');
    //Lift(cellId, 20, 1, 0);
    r = 5;
    for(y=-r; y <= r; y++){
        for(x=-r+Math.abs(y); x<=r-Math.abs(y); x++){
            timeQueue1(x,y);

            function timeQueue1(a,b){
                setTimeout(() => {
                    Lift((Number(cell[0])+b)+'-'+(Number(cell[1])+a), 20, 1, 0);
                }, (Math.abs(a)+Math.abs(b))*100);

                setTimeout(() => {
                    Lift((Number(cell[0])+b)+'-'+(Number(cell[1])+a), 0, 1, 20);
                }, (Math.abs(a)+Math.abs(b))*100+1000);
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
}