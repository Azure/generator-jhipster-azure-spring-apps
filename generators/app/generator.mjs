import chalk from 'chalk';
import AppGenerator from 'generator-jhipster/generators/app';


export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints azure-spring-apps')}`
      );
    }

    this.sbsBlueprint = true;
  }

  get [AppGenerator.COMPOSING]() {
    return {
      async composeAzureSpringApps() {
        await this.composeWithJHipster(`jhipster-azure-spring-apps:createtodoapp`, true);
      },
    };
  }
}
