export default class BoardDTO {
  constructor({ id, name, ownerId }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
  }

  static fromDocument(board) {
    return new this({
      id: board._id,
      name: board.name,
      ownerId: board.ownerId,
    });
  }
}
