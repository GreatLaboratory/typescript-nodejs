import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const test = async (req: Request, res: Response, next: NextFunction) => {
    const add = (a: number, b: number): number => a + b;
    try {
        const { data } = await axios.get('https://coveyyy.tk/api/post/payList/1');

        let count: number = 0;

        const result00 = data.map((p: { category: string }) => p.category + count++);
        console.log(...result00);

        const result01 = data.map((p: { userId: number }) => p.userId);
        console.log(...result01);

        const result02 = result01.filter((p: number) => p < 6);
        console.log(...result02);

        const finalResult = data.map((p: { userId: number }) => p.userId)
                                .filter((p: number) => p < 6)
                                .reduce(add);
        console.log(finalResult);

        res.json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { test };