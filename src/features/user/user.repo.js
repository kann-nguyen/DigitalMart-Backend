const User = require('./user.model');

module.exports = {
    createUser: async (user) => {
        const newUser = await User.create(user);
        return newUser;
    },
    getUserByEmail: async (email) => {
        return await User.findOne({ email: email });
    },
    changeUserAvatar: async (userId, avatarUrl) => {
        let user = await User.findById(userId);
        user.avatar = avatarUrl;
        await user.save();
    },
    getUserById: async (userId) => {
        return await User.findById(userId);
    },
    updateUserInfo: async (userId, newInfo) => {
        const updatedUser = await User.findByIdAndUpdate(userId, newInfo, { returnDocument: 'after' });
        return updatedUser;
    },
    verifyUser: async (token) => {
        const user = await User.findOne({ verificationToken: token });
        if (!user) return false;
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return true;
    },
    getNumberOfUser: async () => {
        const result = await User.countDocuments();
        return result;
    }
}