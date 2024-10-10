interface NotificationService {
  sendEmailNotification(email: string, message: string): void;
  sendTelegramNotification(chatId: string, message: string): void;
}

export default NotificationService;