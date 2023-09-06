import _ from 'lodash';
import chalk from 'chalk';
import BaseGenerator from 'generator-jhipster/generators/base';

export default class extends BaseGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);
  }

  get [BaseGenerator.PROMPTING]() {
    return {
      ...super.prompting,
      async promptingTemplateTask() {
        const prompts = [
          {
            type: 'input',
            name: 'baseName',
            message: 'What is your application name?',
            default: 'azure-spring-apps-todo',
          },
          {
            type: 'input',
            name: 'serverPort',
            message: 'On which port would you like your server to run?',
            default: 8080,
          },
          {
            type: 'input',
            name: 'packageName',
            message: 'What is your default java package name?',
            default: 'com.mycompany.myapp',
          },
          {
            type: 'list',
            name: 'prodDatabaseType',
            message: 'Which database would you like to use?',
            choices: ['postgresql'],
            default: 'postgresql',
          },
        ];

        const props = await this.prompt(prompts, this.config);

        const baseName = this.jhipsterConfigWithDefaults.baseName;
        props.humanizedBaseName = baseName.toLowerCase() === 'jhipster' ? 'JHipster' : _.startCase(baseName);
        props.dasherizedBaseName = _.kebabCase(baseName);
        props.packageFolder = this.jhipsterConfigWithDefaults.packageFolder;

        this.todoAppProps = props;
      },
    };
  }

  get [BaseGenerator.WRITING]() {
    return {
      ...super.writing,
      async writingTemplateTask() {
        this.fs.copy(this.templatePath('client/'), this.destinationPath('client/'));
        this.fs.copy(this.templatePath('infra/'), this.destinationPath('infra/'));

        const packageFolder = this.todoAppProps.packageFolder;

        await this.writeFiles({
          sections: {
            maven: [
              {
                templates: [
                  { file: 'mvnw', noEjs: true },
                  { file: 'mvnw.cmd', noEjs: true },
                  { file: 'azure.yaml', noEjs: true },
                  { file: '.gitattributes', noEjs: true },
                  { file: '.gitignore', noEjs: false },
                  { file: 'Dockerfile', noEjs: true },
                  { file: 'CHANGELOG.md', noEjs: true },
                  { file: 'CONTRIBUTING.md', noEjs: true },
                  { file: 'LICENSE', noEjs: true },
                  { file: 'LICENSE.md', noEjs: true },
                  { file: 'NOTICE.txt', noEjs: true },
                  { file: 'README.md', noEjs: true },
                  { file: '.mvn/wrapper/maven-wrapper.jar', noEjs: true },
                  { file: '.mvn/wrapper/maven-wrapper.properties', noEjs: true },
                  { file: '.devcontainer/devcontainer.json', noEjs: true },
                  { file: '.github/CODE_OF_CONDUCT.md', noEjs: true },
                  { file: '.github/ISSUE_TEMPLATE.md', noEjs: true },
                  { file: '.github/PULL_REQUEST_TEMPLATE.md', noEjs: true },
                  { file: '.github/workflows/build-with-maven.yml', noEjs: true },
                  { file: '.github/workflows/azure-dev.yml', noEjs: true },
                  { file: '.github/workflows/create-release.yml', noEjs: true },
                  { file: '.github/workflows/docker-image.yml', noEjs: true },
                  { file: 'assets/web.png', noEjs: true },
                  { file: 'web/README.md', noEjs: true },
                ],
              },
            ],
            client: [
              {
                templates: [
                  {
                    file: 'clientpom.xml',
                    renameTo: ctx => `client/pom.xml`,
                  },
                ],
              },
            ],
            web: [
              {
                templates: [
                  { file: 'web/pom.xml' },
                  {
                    file: 'web/configuration/RFC3339DateFormat.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/configuration/RFC3339DateFormat.java`,
                  },
                  {
                    file: 'web/configuration/WebConfiguration.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/configuration/WebConfiguration.java`,
                  },
                  {
                    file: 'web/model/TodoItem.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/model/TodoItem.java`,
                  },
                  {
                    file: 'web/model/TodoList.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/model/TodoList.java`,
                  },
                  {
                    file: 'web/model/TodoState.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/model/TodoState.java`,
                  },
                  {
                    file: 'web/repository/TodoItemRepository.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/repository/TodoItemRepository.java`,
                  },
                  {
                    file: 'web/repository/TodoListRepository.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/repository/TodoListRepository.java`,
                  },
                  {
                    file: 'web/web/HomeController.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/web/HomeController.java`,
                  },
                  {
                    file: 'web/web/TodoListsController.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/web/TodoListsController.java`,
                  },
                  {
                    file: 'web/SimpleTodoApplication.java',
                    renameTo: ctx => `web/src/main/java/${packageFolder}/SimpleTodoApplication.java`,
                  },
                  {
                    file: 'web/application.yml',
                    renameTo: ctx => `web/src/main/resources/application.yml`,
                  },
                ],
              },
            ],
            parent: [
              {
                templates: [{ file: 'pom.xml' }],
              },
            ],
          },
          context: this.todoAppProps,
        });
      },
    };
  }

  get [BaseGenerator.END]() {
    return {
      ...super.end,
      afterRunHook() {
        const artifactName = this.todoAppProps.dasherizedBaseName + '-web';
        this.log(`
${chalk.greenBright('The TODO template has been created successfully! 🎉')}

${chalk.magentaBright(`Run locally:`)}
${chalk.cyan(`    mvn clean package -DskipTests`)}
${chalk.cyan(`    java -jar web/target/${artifactName}-0.0.1-SNAPSHOT.jar`)}

${chalk.magentaBright(`Deploy on Azure Spring Apps with monthly free grants:`)}
${chalk.cyan(`    https://aka.ms/asa/webapp-quickstart`)}
                  `);
      },
    };
  }
}
