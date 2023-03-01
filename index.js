const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const token = '5954431263:AAGFl7eP7gFsnBgNubuFN1DMgUZNi2r5EXc';
const webAppUrl = 'https://reac-telegram.vercel.app/';
const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Выберите ниже одну из кнопок', {
        reply_markup: {
            keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
            ]
        }
    });

    await bot.sendMessage(chatId, 'Нажмите кнопку заполить форму', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl}}]
            ]
        }
    });
  }


    if(msg?.web_app_data?.data){
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            await bot.sendMessage(chatId, 'Cпасибо за обратную связь');
            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);
            await bot.sendMessage(chatId, 'Ваша занятность: ' + data?.subject);
            setTimeout(async() => {
                await bot.sendMessage(chatId, 'Вся информация полученна нами!');
            }, 3000)
        }catch (e) {
            console.log(e);
        }
    }

    const PORT = 8000;
    try{
        app.listen(PORT, async()=> {
            console.log('Порт запустился в порту ' + `${PORT}`)
        })
    }catch(e){
        console.log(e);
    }

});