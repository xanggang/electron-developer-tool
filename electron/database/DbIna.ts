
export abstract class IDbModel {
  abstract crateTable(): Promise<void>
}
