export default class {
  static success<T>(data: T) {
    return {
      state: 1,
      message: data,
      errorMsg: '',
    }
  }

  static error(errorMsg: string) {
    return {
      state: 0,
      message: null,
      errorMsg,
    }
  }
}
