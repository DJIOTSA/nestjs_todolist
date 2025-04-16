import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello-again')
  getHelloAgain(@I18n() i18n: I18nContext): string {
    return i18n.t('translation.hello');
  }
}
@Controller('test')
export class AppController {
  constructor(private readonly testService: AppService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }

  @Get('hello-again')
  getHelloAgain(@I18n() i18n: I18nContext): string {
    return i18n.t('translation.hello');
  }
}
