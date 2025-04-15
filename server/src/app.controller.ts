// import { Controller, Get } from '@nestjs/common';
// import { I18n, I18nContext } from 'nestjs-i18n';

// @Controller()
// export class AppController {
//   @Get()
//   getHello(@I18n() i18n: I18nContext) {
//     return i18n.t('translation.hello');
//   }
// }

import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n'; // Import I18n decorator if needed directly
import { AppService } from './app.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly appService: AppService) {} // Inject AppService

  @Get()
  getHello(): string {
    // Call the service method
    return this.appService.getHello();
  }

  // Example of using I18n directly in controller if needed
  @Get('hello-again')
  getHelloAgain(@I18n() i18n: I18nContext): string {
    return i18n.t('translation.hello'); // Context is automatically handled by the decorator
  }
}
@Controller('test')
export class AppController {
  constructor(private readonly testService: AppService) {} // Inject AppService

  @Get()
  getHello(): string {
    // Call the service method
    return this.testService.getHello();
  }

  // Example of using I18n directly in controller if needed
  @Get('hello-again')
  getHelloAgain(@I18n() i18n: I18nContext): string {
    return i18n.t('translation.hello'); // Context is automatically handled by the decorator
  }
}
