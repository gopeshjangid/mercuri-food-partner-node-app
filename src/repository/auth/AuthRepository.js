import { User } from "../../models/user/User";
import { UserAuth } from "../../models/user/UserAuth";

export class AuthRepository {

    async findUser(condition) {
        return await User.findOne({ where: condition });
    }

    async findUserByIdAuth(userId) {
        return await UserAuth.findOne({ where: { user_id: userId } });
    }

    async saveUserSession(authData) {
        return await UserAuth.create(authData);
    }

    async updateIsLoggedInByUserId(userId) {
        return UserAuth.update({ userId, "isLoggedIn": true }, { where: { isLoggedIn: false } });
    }
    async updateIsLoggedInByToken(token) {
        return UserAuth.update({ isLoggedIn: false }, { where: { token, "isLoggedIn": true } });

    }
    async saveUser(user) {
        return User.create(user);
    }

    async fetchUserByToken(token) {
        return UserAuth.findOne({ where: { token } }, {}, {});
    }

    async updateExpireTime(token, end_time) {
        return UserAuth.update({ token }, { where: { end_time } });
    }

    async updateUserPwd(updatepwd,Id) {
        
        return User.update({ password: updatepwd }, { where: { id: Id  } });

    }
    async deleteUserByToken(token,userid) {
        
        const data=await UserAuth.destroy( { where:  {token:token, user_id :userid}})==0?"Logout Failed ":"Logout Successfull";
       // console.log('dqwww',data)
        return data;

    }

    
}




