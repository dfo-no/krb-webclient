export class Utils {
  static ensure<T>(
    argument: T | undefined | null,
    message: string = 'This value was promised to be there.'
  ): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
    return argument;
  }

  static getRandomNumber() {
    // TODO: this is just for dev
    const min = Math.ceil(100);
    const max = Math.floor(1000000);

    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
  }

  static truncate(
    str: string | undefined,
    length: number = 100,
    ending: string = '...'
  ): string {
    if (str === undefined) {
      return '';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }
}
