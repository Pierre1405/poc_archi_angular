export class SystemError extends Error {
  constructor(messsage: string, public throwable?: Error, public extraInfo?: any) {
    super(messsage);
  }
}
