import { Router, Request, Response } from "express";

interface IDescription {
    values: (req: Request, res: Response) => void;
}

export const router = Router();

export function Post(url: string) {
    return (target: any, name: string, description: any) => {
        router.post(url, (req: Request, res: Response) => {
            description.values(req, res);
        });
    };
}

export function Get(url: string) {
    return (target: any, name: string, description: any) => {
        router.get(url, (req: Request, res: Response) => {
            description.values(req, res);
        });
    };
}

export function Put(url: string) {
    return (target: any, name: string, description: IDescription) => {
        router.put(url, (req: Request, res: Response) => {
            description.values(req, res);
        });
    };
}

export function Delete(url: string) {
    return (target: any, name: string, description: IDescription) => {
        router.delete(url, (req: Request, res: Response) => {
            description.values(req, res);
        });
    };
}
