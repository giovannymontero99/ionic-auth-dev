import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { constantBaseUrl } from "../const/const";

export const apiInterceptor : HttpInterceptorFn = (req, next) => {
    const api = req.clone({
        url: `${ constantBaseUrl.url +  req.url}`
    });
    return next(api);
}