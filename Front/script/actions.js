function Empty(){}
function Place(cellId){
    PlaceImg(cellId, 'media/actions/gifs/Explosion.gif', true);
}
function ExplosionWave(cellId){
    let cell = cellId.split('-');
    //Lift(cellId, 20, 1, 0);
    r = 10;
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
function Walk(cellId, subjectId) {
    let subject = document.getElementById(subjectId);
    MovePlayer(subject, [-1,1]);
    // start = subjectId.split('-');//Нужно вести траекторию от игрока, и, в случае касания стены, завершать
    // end = cellId.split('-');
    // subject.style.left += 48*1;
    // subject.style.top += 28*1;//добавить пиксели и переменные
}