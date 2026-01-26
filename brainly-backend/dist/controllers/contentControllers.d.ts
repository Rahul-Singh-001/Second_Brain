import { type Request, type Response } from "express";
export declare const addContent: (req: Request, res: Response) => Promise<void>;
export declare const getContent: (req: Request, res: Response) => Promise<void>;
export declare const deleteContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const manageShareLink: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPublicContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=contentControllers.d.ts.map