let action = 0;
let actionSubject = false;

function ClickCell(){
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
    hoverPLayerPosition = false;
    ShowSkills();
    if(action){
        ActionPerformer(event.target.classList[0]);
        turnPoster(sessionParams.login, actionSubject, action, event.target.classList[0])
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
        case 'Walk':
            Walk(cellId, actionSubject);
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
