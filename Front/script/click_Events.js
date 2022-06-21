let action = 0;
let actionSubject = false;

function ClickCell(){
    if(!yourTurn){
        alert('Сейчас ход противника');
        return
    }
    // Условия для срабатывания для скиллов
    // 1 Проверка на дистанцию и наличие субъекта
    let distance = 0;
    if( !actionSubject || 
        actionSubject.playerStats.radius < (distance = CheckDistance(actionSubject.classList[0], event.target.classList[0])) && 
        (action!='Walk' && action!='Идти' && action!="Сдаться" && action!="Capitulating" && action!="")//Скиллы без радиуса
    ){
        DamageIndicator(event.target.classList[0],'Слишком далеко от игрока', 'white')
        return
    }
    // 2 Проверка на видимость для некоторых скилов
    if((action == 'FireBall' || action == 'Огненный шар') &&
    !CheckCoordsVisibility(event.target.classList[0], actionSubject.classList[0])){
        DamageIndicator(event.target.classList[0],'Клетка вне зоны видимости', 'white')
        return
    }
    // 3 Проверка на игрока на клетке для размещения стены
    if(action == 'IceWall' || action == 'Ледяная стена'){
        let cell = document.getElementsByClassName(event.target.classList[0]);
        for(let i=0; i<cell.length; i++){
            if(cell[i].classList.contains('player')){
                DamageIndicator(event.target.classList[0],'Клетка занята', 'white')
                return
            }
        }
    }
    // 4 Проверка на выносливость
    let staminaCost = StaminaCost(action, distance);
    if(staminaCost > actionSubject.playerStats.stamina){
        DamageIndicator(event.target.classList[0],'Недостаточно выносливости', 'white')
        return
    }else{
        actionSubject.playerStats.stamina -= staminaCost;
    }
    let hoverEffects = document.getElementsByClassName('hoverEffects')[0];
    hoverEffects.innerHTML = '';
    hoverPLayerPosition = false;
    ShowSkills();
    if(action){
        ActionPerformer(event.target.classList[0])
        turnPoster(sessionParams.login, actionSubject.id, action, event.target.classList[0]);
    }
    action = 0;
    actionSubject = false;
}
function ActionPerformer(cellId) {
    switch (action) {
        case 0:
        case '':
        case 'Empty':
            Empty();
        break;
        case 'EarthQuake':
        case 'Землетрясение':
            ExplosionWave(cellId);
        break
        case 'Ледяная стена':
        case 'IceWall':
            IceWall(cellId);
        break
        case 'FireBall':
        case 'Огненный шар':
            FireBall(cellId);
        break
        case 'Идти':
        case 'Walk':
            Walk(cellId, actionSubject);
        break
        case 'Capitulating':
        case 'Сдаться':
            Capitulating();
        break
        case 'Place':
        case 'Поставить':
            Place(cellId);
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
    let skills = document.getElementsByClassName('skills');
    for(let i=0; i<skills.length; i++){
        if(skills[i].classList.contains('activeSkill')){
            skills[i].classList.remove('activeSkill');
        }
    }
    event.target.classList.add('activeSkill');

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

function StaminaCost(action, distance){
    switch (action) {
        case "FireBall":
        case "Огненный шар":
            return 3;
        break
        case "Walk":
        case "Идти":
            return distance;
        break
        case 'EarthQuake':
        case 'Землетрясение':
            return 4;
        break
        case "IceWall":
        case "Ледяная стена":
            return 1;
        break
    }
    return 0;
}