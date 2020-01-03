import { PassportStatic } from 'passport';

import { local } from './localStrategy';
import { User, UserDocument } from '../models/user';

export const passportConfig = (passport: PassportStatic) => {

    passport.serializeUser((user: UserDocument, done) => {
        console.log('-------------serialize');
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            console.log('-------------deserialize');
            done(null, user);
        });
    });

  local(passport);
};

