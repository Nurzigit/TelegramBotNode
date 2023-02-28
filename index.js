const TelegramBot = require('node-telegram-bot-api');


const token = '5954431263:AAGFl7eP7gFsnBgNubuFN1DMgUZNi2r5EXc';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Received your message');
  }
 
});