import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SignUpDTO } from './DTO/SignUpDTO';
import { GoogleCaptcha } from '../../../utils/google/captcha.guard';

@Controller('api/account/sign-up')
export class SignUpController {
    constructor() { }

    @Post()
    @UseGuards(GoogleCaptcha)
    async SignUp(@Body() _signUpQuery: SignUpDTO) {
        

    }
}