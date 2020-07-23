export class Message {
  email: string;
  message: string;

  constructor(emailParam: string, messageParam: string) {
    this.email = emailParam;
    this.message = messageParam;
  }
}
