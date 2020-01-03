import LocalStrategy from 'passport-local';
import { PassportStatic } from 'passport';
import { Error } from 'mongoose';

import { User, UserDocument } from '../models/user'; 

export const local = (passport: PassportStatic) => {
    passport.use(new LocalStrategy.Strategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async (email: string, password: string, done) => {
        try {
            await User.findOne({ email }, (err: Error, user: UserDocument) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(undefined, false, { message: '가입되지않은 이메일입니다.' });
                }
                user.comparePassword(password, (err: Error, isMatch: boolean) => {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(undefined, user, { message: '성공적으로 로그인이 완료되었습니다.' });
                    }
                    return done(undefined, false, { message: '비밀번호가 일치하지 않습니다.' });
                });
            });
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};

