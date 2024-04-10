class UserDto {
    constructor(firstName, lastName, role, age, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.age = age;
        this.email = email;
    }
}

module.exports = UserDto;