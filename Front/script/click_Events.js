let action = 0;
let actionSubject = false;

function ClickCell(){
    if(!yourTurn){
        alert('Сейчас ход противника')
        return
    }
    if(action!='Walk' && actionSubject && actionSubject.radius < CheckDistance(actionSubject.classList[0], event.target.classList[0])){
        return
    }
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
    hoverPLayerPosition = false;
    ShowSkills();
    if(action){
        ActionPerformer(event.target.classList[0]);
        turnPoster(sessionParams.login, actionSubject.id, action, event.target.classList[0])
    }
    action = 0;
    actionSubject = false;
}
function ActionPerformer(cellId) {
    switch (action) {
        case 0:
            Empty();
        break;
        case 'Empty':
            Empty();
        break;
        case 'ExplosionWave':
            ExplosionWave(cellId);
        break
        case 'Place':
            Place(cellId);
        break
        case 'FireBall':
            FireBall(cellId);
        break
        case 'Walk':
            Walk(cellId, actionSubject);
        break
        case 'Capitulating':
            Capitulating();
        break
    }
}

function ClickHero(){
    if(action!=0 && action!='Empty'){
        // if(action!='Walk'){
            ClickCell();
        // }
    }else{
        ShowSkills(event.target);
        if(yourTurn){
            actionSubject = event.target;
        }else{
            alert('Сейчас ход противника')
        }
    }
}
function ClickSkill(){
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
	action = event.target.value;// Действие для ClickCell
    hoverPLayerPosition = actionSubject.classList[0];
}
function CheckDistance(cellId1, cellId2){
    let start = cellId1.split('-');
    let end = cellId2.split('-');
    let y = Math.abs(start[0] - end[0]);
    let x = Math.abs(start[1] - end[1]);
    if(y>x){
        return y
    }else{
        return x
    }
}
