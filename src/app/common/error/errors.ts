/**
 * Created by root on 05/04/17.
 */

export class SystemError extends Error {
  constructor(messsage: string, public throwable?: Error, public extraInfo?: any) {
    super(messsage);
  }
}
