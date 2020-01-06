import { Request, Response, NextFunction } from 'express';

import { User } from '../models/user';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);   
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id);
    res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };