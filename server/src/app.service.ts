/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
// import * as util from 'util';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly i18n: I18nService) {}

  getHello(): string {
    // const i18nContext = I18nContext.current();
    // const lang = i18nContext?.lang;

    const translation = this.i18n.t<string>('translation.hello', { lang: "en" });

    if (typeof translation !== 'string') {
      return 'hello';
    }

    return translation;
  }
}

@Injectable()
export class TestService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly i18n: I18nService) {}

  getHello(): string {
    // const i18nContext = I18nContext.current();
    // const lang = i18nContext?.lang;

    const translation = this.i18n.t<string>('translation.hello', { lang: "en" });

    if (typeof translation !== 'string') {
      return 'hello';
    }

    return translation;
  }
}

