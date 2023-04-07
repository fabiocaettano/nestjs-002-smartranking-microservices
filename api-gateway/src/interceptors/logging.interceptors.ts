import { NestInterceptor, ExecutionContext , CallHandler} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs";

export class LogginInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Antes ...')
        const newDate = Date.now()
        return next.handle().pipe(
            tap(() => console.log(`Depois ... ${Date.now() - newDate } ms`)),
        )        
    }
}