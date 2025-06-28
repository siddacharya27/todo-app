import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    console.log(`[Interceptor] Before : ${req.method} ${req.url}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[Interceptor] After : ${req.method} ${req.url} - ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
