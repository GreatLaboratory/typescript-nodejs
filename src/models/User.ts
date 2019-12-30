import bcrypt from 'bcrypt';
import { Document, Schema, Error, model } from 'mongoose';

export type UserDocument = Document & {
    email: string;
    password: string;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };

};

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });

// 비밀번호 암호화
userSchema.pre('save', function save(next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

export const User = model<UserDocument>('User', userSchema);