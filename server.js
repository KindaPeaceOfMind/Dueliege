
const express = require('express');
const app = express();
const jsonParser = express.json()

const path = require('path');
app.use(express.static(path.join(__dirname, 'Front')))

const { PrismaClient } = require('@prisma/client');
const { create } = require('domain');
const prisma = new PrismaClient()


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/Front/login.html`);
});

app.post('/', jsonParser, async function (req, res) {
  if (!req.body||req.body == {}) {return res.sendStatus(400)}//проверка на пустое тело запроса

  const login = req.body.login;
  const password = req.body.password;
  
  if (login.length<3||login.length>20) {return res.json([false,"Мне не нравится ваш логин"])}
  if (password.length<3||password.length>20) {return res.json([false,"Мне не нравится ваш пароль"])}

  const authorization = await prisma.user.findUnique({//проверяем логин
    where:{
      login:login
    }
  })
  if(authorization){
    const entrance = await prisma.user.findFirst({//если логин занят - проверяем пароль
      where:{
        login:login,
        password:password
      }
    })
    if(entrance){
      let token = await tokenGenerate(login);
      res.json([true,token]);//Даём успех и токен
    }else{
      res.json([false,'Неверный пароль'])
    }
  }else{
    const registration = await prisma.user.create({//если логин свободен - регистрируем
      data: {
        login,
        password,
      }
    })
  let token = await tokenGenerate(login);
  res.json([true,token]);//Даём успех и токен
  }
})
async function tokenGenerate(login){//возвращает токен и добавляет в бд
  let token = '';
  const pattern = [
    'q','w','e','r','t','y','u','i','o','p','a','s',
    'd','f','g','h','j','k','l','z','x','c','v','b',
    'n','m','1','2','3','4','5','6','7','8','9','0']
  
  for(i in pattern){
    token += pattern[Math.round(Math.random()*35)];
  }
  const u = await prisma.user.update({
    where: {
      login: login
    },
    data: {
      token:token
    }
  })
  return token
}

app.get('/start', async function (req, res) {
  res.sendFile(`${__dirname}/Front/gameStart.html`);
})



app.post('/start', jsonParser, async function (req, res) {
  if (!req.body||req.body == {}) {return res.sendStatus(400)}

  let token = req.body[0];
  const tokenCheck = await prisma.user.findFirst({//проверяем токен
    where:{
      token:token
    }
  })
  if(tokenCheck){//если токен существует в бд
    res.json(await SessionCreate(token));//отправляем SessionCreate
  }else{
    res.json([0,'Ошибка токена, авторизуйтесь снова.']);
  }
})

async function SessionCreate(token){//Отдаёт 1, id сессии, логин, противника
  const user = await prisma.user.findFirst({//Получить пользователя
    where:{
      token:token
    }
  })
  let login = user.login;//Получить логин
  const liveSession = await prisma.sessions.findFirst({//Проверить наличие своей сессии
    where:{
      OR:[
        {user1: {contains: login}},
        {user2: {contains: login}}
      ]
    }
  })
  if(liveSession){
    console.log(login+' переподключился к созданной сессии '+liveSession.id)
    if(liveSession.user1==login){
      return [1, liveSession.id, login, liveSession.user2, 2]
    }else{
      return [1, liveSession.id, login, liveSession.user1, 1]
    }
    
  }else{
    const sessionCheck = await prisma.sessions.findFirst({//Проверить наличие свободной сессии
      where:{
        active:'waiting'
      }
    })
    if(sessionCheck){//Если есть свободная сессия
      if(sessionCheck.user1){
        await prisma.sessions.update({
          data:{
            user2:login,
            active:'active'
          },
          where:{
            id:sessionCheck.id
          }
        })
        console.log(login+' подключился к сессии '+sessionCheck.id+' как user2 ')
        return [1, sessionCheck.id, login, sessionCheck.user1, 1]
      }else{
        await prisma.sessions.update({
          data:{
            user1:login,
            active:'active'
          },
          where:{
            id:sessionCheck.id
          }
        })
        console.log(login+' подключился к сессии '+sessionCheck.id+' как user1 ')
        return [1, sessionCheck.id, login, sessionCheck.user2, 2]
      }
    }else{
      const SessionCreate = await prisma.sessions.create({
        data:{
          active:'waiting',
          user1:login
        }
      })
      console.log(login+' создал сессию '+SessionCreate.id)
      return [1, SessionCreate.id, login, SessionCreate.user2, 2]///////////////////////Добавить второго пользователя
    }
  }
}

let sessionsTurns = {};
app.post('/session', jsonParser, async function (req, res){
  if (!req.body||req.body == {}) {return res.sendStatus(400)}
  input = req.body;

  //[session, turnId, player, hero, action, cell] >>>>input

  const Session = await prisma.sessions.findFirst({
    where:{
      id:input[0]
    }
  })
  if(Session){
    // console.log(input)
    if(input[2] && input[3] && input[4] && input[5]){//post
      sessionsTurns[input[0]][input[1]] = [input[2], input[3], input[4], input[5]]
      
      console.log("Ход "+input[1]+" добавлен");
      // console.log(sessionsTurns[input[0]][input[1]]);

      res.json([1])
    }else{//get
      if(sessionsTurns[input[0]]){//Если сессия активна
        
        if(sessionsTurns[input[0]][input[1]]){
          console.log("Ход "+input[1]+" в сессии "+input[0]+" выведен");
          // console.log(sessionsTurns[input[0][input[1]]]);
          res.json([1,
            sessionsTurns[input[0]][input[1]]
          ])
          if(sessionsTurns[input[0]][input[1]][2]=='Capitulating'){
            delete sessionsTurns[input[0]];
          }
        }else{
          console.log("хода "+input[1]+" в сессии "+input[0]+" ещё не было");
          res.json([0]);
        }
      }else{
        sessionsTurns[input[0]] = {0:['FirstTurn','FirstTurn','Empty','FirstTurn']};
        res.json([1,['FirstTurn','FirstTurn','ChangeTurn','FirstTurn']])}
    }
  }else{res.json([0,'Сессия не найдена'])}
})
app.get('/restartall', async function (req, res) {
  sessionsTurns = {}
})
app.get('/restart', async function (req, res) {
  if(!req.body){
    res.json(0)
  }else{
    let id = req.body.id;
    res.json(sessionsTurns);
    sessionsTurns[id] = {}
  }
})
app.get('/showSessions', async function (req, res) {
  res.json(sessionsTurns);
})
app.listen(3000, () => {
    console.log('Application listening on http://localhost:3000');
});