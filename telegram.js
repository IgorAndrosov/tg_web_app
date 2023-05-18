import { TelegramBot } from 'telegram-bot-sdk';

// Ваш токен бота Telegram
const botToken = '5965053048:AAFHcfnh0S3fbMhEofqHzvB-9eKE5xv1rUs';

// Создайте экземпляр TelegramBot с токеном
const bot = new TelegramBot(botToken);

// Отправка сообщения с чеком
export function sendReceipt(chatId, receiptContent) {
  // Отправка сообщения с HTML форматированием
  bot.sendMessage(chatId, receiptContent, { parse_mode: 'HTML' });
}
