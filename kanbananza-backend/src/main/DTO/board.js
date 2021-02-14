export default class BoardDTO {
  constructor({ id, label, ownerId }) {
    this.id = id;
    this.label = label;
    this.ownerId = ownerId;
  }

  static fromDocument(board) {
    return new this({
      id: board._id,
      label: board.label,
      ownerId: board.ownerId,
    });
  }
}
