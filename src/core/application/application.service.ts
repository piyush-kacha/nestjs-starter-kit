import { Injectable } from '@nestjs/common';

/**
 * Service that provides application-level functionalities.
 */
@Injectable()
export class ApplicationService {
  /**
   * Returns a greeting message.
   *
   * @returns A string containing a greeting message.
   */
  getHello(): string {
    return 'Yeah yeah! we are okay! :)';
  }
}
