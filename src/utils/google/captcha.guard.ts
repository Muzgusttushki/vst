import { CanActivate, ExecutionContext, Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleCaptcha implements CanActivate {
  http = new HttpService();
  configService = new ConfigService();

  async canActivate(
    context: ExecutionContext,
  ) {
    const _request = context.switchToHttp().getRequest();
    const { verification } = _request.body as { verification: string };

    if (verification == null
      || verification == undefined
      || verification.length <= 0) return false;

    const { data } = await this.http.request({
      method: "post",
      url: "https://www.google.com/recaptcha/api/siteverify",
      params: {
        response: verification,
        secret: this.configService.get<string>("GOOGLE_SERVICE_KEY")
      }
    }).toPromise();

    if (!(data || data.success))
      return false;

    return data.success || false;
  }
}