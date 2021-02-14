export default class ColumnDTO {
  constructor({ id, label, boardId }) {
    this.id = id;
    this.label = label;
    this.boardId = boardId;
  }

  static fromDocument(column) {
    return new this({
      id: column._id,
      label: column.label,
      board: column.boardId,
    });
  }
}
