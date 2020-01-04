import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { check, sanitize, validationResult, Result, ValidationError } from 'express-validator';

import { User, UserDocument } from '../models/user';

 // POST /login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('email', 'Email is not valid').isEmail().run(req);
        await check('password', 'Password cannot be blank').isLength({min: 1}).run(req);
        // eslint-disable-next-line @typescript-eslint/camelcase
        await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('errors', `${ errors.array() }`);
            return res.status(400).json({ message: errors });
        }

        passport.authenticate('local', (err: Error, user: UserDocument, info: IVerifyOptions) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash('errors', info.message);
                return res.status(400).json({ message: `${ info.message }` });
            }
            req.logIn(user, (err: Error) => {
                if (err) { return next(err); }
                req.flash('success', info.message);
                return res.status(200).json({ message: `${ info.message }` });
            });
        })(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


// GET /logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    req.session?.destroy((err: Error)=>{
        if (err) {
            console.error(err);
            next(err);
        }
    });
    res.status(204).json({ message : '성공적으로 로그아웃 되었습니다.' });
};


 // POST /signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('email', '올바른 이메일 형식이 아닙니다.').isEmail().run(req);
        await check('password', '비밀번호는 최소 4글자 이상이어야 합니다.').isLength({ min: 4 }).run(req);
        await check('confirmPassword', '재입력 비밀번호가 일치하지 않습니다.').equals(req.body.password).run(req);
        // eslint-disable-next-line @typescript-eslint/camelcase
        await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    
        const errors: Result<ValidationError> = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors });
        }
        
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email }, (err) => {
            if (err) { return next(err); }
        });
        
        if (existingUser) {
            return res.status(400).json({ message: '해당 이메일은 이미 존재합니다.' });
        }
        
        const newUser: UserDocument = new User({ email, password });
        await newUser.save((err) => {
            if (err) { return next(err); }
        });

        res.status(201).json({ message: '성공적으로 회원가입되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
