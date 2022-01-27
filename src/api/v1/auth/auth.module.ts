import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from '../cats/cats.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    /** Passport Strategy */
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    /** Login 시 JWT 생성 */
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1y' },
    // }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
