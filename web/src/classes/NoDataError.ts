export class NoDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "No data"
  }
}
