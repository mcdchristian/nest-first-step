import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqStart = Date.now();
    console.log('created at:', reqStart);
    // console.log('In the First Interceptor');
    return next.handle().pipe(
      tap(() => {
        const reqEnd = Date.now();
        console.log('ended at:', reqEnd);
        console.log(`duration: ${reqEnd - reqStart} ms`);
      }),
    );
  }
}
