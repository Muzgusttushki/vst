import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { GoogleCaptcha } from 'src/utils/google/captcha.guard';
import { SignInDTO } from './DTO/SignInDTO';
import { SignInService } from './sign-in.service';
import { EchoState } from 'src/express/echo-state';
import { APICodes } from 'src/express/message-codes';

@Controller('api/account/sign-in')
export class SignInController {
    constructor(private readonly _SignInService: SignInService) { }

    @Post()
    // @UseGuards(GoogleCaptcha)
    async SignIn(@Body() _signInQuery: SignInDTO): Promise<EchoState<string>> {
        return await this._SignInService.signIn(_signInQuery).catch(error => {
            console.error(error);
            return { error: true, code: APICodes.errorSignIn }
        });
    }
}
