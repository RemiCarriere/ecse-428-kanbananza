export default class UserDTO {
  constructor({ id, firstName, lastName, email }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static fromDocument(user) {
    return new this({
      id: user._id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    });
  }
}
