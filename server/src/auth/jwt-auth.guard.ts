import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
   constructor(
      private jwtService: JwtService
   ) {}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest()
      try {
         const authHeader = req.headers.authorization
         const [type, token] = authHeader.split(' ')[0]
         if((type !== 'Bearer') || !token) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
         }
         const user = this.jwtService.verify(token)
         req.user = user
         return true
      } catch (err) {
         // console.log(err)
         throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
      }
   }
}