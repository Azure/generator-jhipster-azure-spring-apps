import chalk from 'chalk';
import AppGenerator from 'generator-jhipster/esm/generators/app';
import { PRIORITY_PREFIX, COMPOSING_PRIORITY } from 'generator-jhipster/esm/priorities';

export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints azure-spring-apps')}`
      );
    }
  }

  get [COMPOSING_PRIORITY]() {
    return {
      async composeAzureSpringApps() {
        await this.composeWithJHipster(`jhipster-azure-spring-apps:createtodoapp`, true);
      },
    };
  }
}
