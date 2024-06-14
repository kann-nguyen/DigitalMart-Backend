const UserRepo = require('./user.repo');
const TokenService = require('../token/token.service');
const { comparePassword, hashPassword, generateToken, generateRandomPassword } = require('../../utils/auth');
const { NotFound, BadRequest } = require('../../utils/createError');
const { sendVerificationRequest } = require('../nodemail/sendVerificationEmail');
const UploadService = require('../upload/upload.service');
const { sendNewPassword } = require('../nodemail/sendNewPassword');

module.exports = {
    registerUser: async (user) => {
        const existedUser = await UserRepo.getUserByEmail(user.email);
        if (existedUser) throw BadRequest(`Email ${user.email} is already registed!`);
        user.password = await hashPassword(user.password);
        const verificationToken = generateToken({ email: user.email });
        user.verificationToken = verificationToken;
        await UserRepo.createUser(user);
        // return newUser;
        await sendVerificationRequest(user.email, verificationToken);
    },
    login: async (email, password) => {
        const existedUser = await UserRepo.getUserByEmail(email);
        if (!existedUser) throw NotFound(`User with email ${email} does not exist`);
        if (!existedUser.isVerified) {
            throw BadRequest("Account is not verified!");
        }
        const result = await comparePassword(password, existedUser.password);
        console.log(result);
        if (!result) throw BadRequest(`Wrong Password`);
        // console.log(existedUser.role);
        return {
            user: {
                userId: existedUser.id,
                username: existedUser.username,
                email: existedUser.email,
                phonenumber: existedUser.phonenumber,
                avatar: existedUser.avatar,
                gender: existedUser.gender,
                role: existedUser.role
            },
            accessToken: await TokenService.generateAccessToken(existedUser.id, existedUser.role),
            refreshToken: await TokenService.generateRefreshToken(existedUser.id, existedUser.role)
        }
    },
    logout: async (userId) => {
        await TokenService.deleteByUserId(userId);
    },
    refreshToken: async (userId, token) => {
        const user = await UserRepo.getUserById(userId);
        if (!user.isVerified) {
            throw BadRequest("Account is not verified!");
        }
        await TokenService.deleteByToken(userId, token);
        return {
            accessToken: await TokenService.generateAccessToken(userId),
            refreshToken: await TokenService.generateRefreshToken(userId, token)
        }
    },
    changeAvatar: async (userId, avatar) => {
        const user = await UserRepo.getUserById(userId);
        if (!user.isVerified) {
            throw BadRequest("Account is not verified!");
        }
        const avatarUrl = await UploadService.uploadSingleFile(avatar);
        await UserRepo.changeUserAvatar(userId, avatarUrl);
        return avatarUrl;
    },
    updateUserInfo: async (userId, newInfo) => {
        const user = await UserRepo.getUserById(userId);
        if (!user.isVerified) {
            throw BadRequest("Account is not verified!");
        }
        const updatedUser = await UserRepo.updateUserInfo(userId, newInfo);
        return updatedUser;
    },
    changePassword: async (userId, oldPassword, newPassword, retypePassword) => {
        const user = await UserRepo.getUserById(userId);
        if (!user) throw NotFound(`User does not exist`);
        if (!user.isVerified) throw BadRequest("Account is not verified!");
        if (newPassword !== retypePassword) throw BadRequest("Retype Password miss matched!");
        const result = await comparePassword(oldPassword, user.password);
        if (!result) throw BadRequest(`Wrong Password`);
        await UserRepo.updateUserInfo(userId, { password: await hashPassword(newPassword) });
    },
    verifyUser: async (token) => {
        const result = await UserRepo.verifyUser(token);
        if (!result) throw BadRequest("Verification failed!");
    },
    forgotPassword: async (email) => {
        const existedUser = await UserRepo.getUserByEmail(email);
        if (!existedUser) throw NotFound(`User with ${email} is not existed`);
        if (existedUser.role === "ADMIN") throw BadRequest(`You don't have permission to do this!`);
        const newRandomPassword = generateRandomPassword();
        await UserRepo.updateUserInfo(existedUser.id, { password: await hashPassword(newRandomPassword) });
        await sendNewPassword(email, newRandomPassword);
    },
    getNumberOfCustomer: async () => {
        const result = await UserRepo.getNumberOfUser();
        return result - 1;
    }
}