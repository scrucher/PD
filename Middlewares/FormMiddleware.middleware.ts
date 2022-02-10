import {NextFunction, Request, Response} from "express";
import formidable from "formidable";
export function FormUpload(req: Request, res: Response, next: NextFunction){
    const form = formidable({multiples: true});
    form.parse(req, (err, fields, files) => {
        console.log({
            "req": req,
            "fields": fields,
            "files": files
        })
        if (err) {
            next(err);
            return;
        }
        console.log({ fields: fields,
            files: files });
        next();
    });

}
