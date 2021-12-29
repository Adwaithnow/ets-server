const UserModel = require('../models/user')

class UserController {
    constructor(){}

    userIdPrefix = 'uid'

    async getAllUsers() {
        try {
            const users = await UserModel.find({})
            return users;
        } catch (error) {
            throw new Error()
        }
    }

    async createUser(data) {
        try {
            const user = new UserModel({
                name: data.name,
                email: data.email
            });
            await user.save();
            return user;
        } catch (error) {
            throw new Error()
        }
    }

    async createUser_legacy(data) {
        return {
            name: data.name,
            dob: data.dob
        }
    }
    async createUser2({ name, dob }) {
        return { name, dob }
    }
}

module.exports = UserController