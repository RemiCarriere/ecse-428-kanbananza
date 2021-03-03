export default class CardDTO {
  constructor({ id, label, columnId }) {
    this.id = id;
    this.label = label;
    this.columnId = columnId;
  }

  static fromDocument(card) {
    return new this({
      id: card._id,
      label: card.label,
      column: card.columnId,
    });
  }
}
