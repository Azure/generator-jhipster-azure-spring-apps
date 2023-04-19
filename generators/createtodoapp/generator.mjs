import chalk from 'chalk';
import BaseGenerator from 'generator-jhipster/esm/generators/base';
import { PRIORITY_PREFIX, PROMPTING_PRIORITY, WRITING_PRIORITY, END_PRIORITY } from 'generator-jhipster/esm/priorities';

export default class extends BaseGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });
  }

  get [PROMPTING_PRIORITY]() {
    return {
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
            choices: ['postgresql']
          }
        ];

        const props = await this.prompt(prompts, this.config);

        // Make sure all derived properties are loaded
        this.loadAppConfig(props);
        this.loadDerivedAppConfig(props);
        this.loadServerConfig(props);
        this.loadDerivedServerConfig(props);
        this.loadClientConfig(props);
        this.loadDerivedClientConfig(props);
        this.loadPlatformConfig(props);
        this.loadTranslationConfig(props);

        this.todoAppProps = props;
      },
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {
        this.fs.copy(this.templatePath('client/'), this.destinationPath('client/'));

        const packageFolder = this.todoAppProps.packageFolder;

        await this.writeFiles({
          sections: {
            maven: [
              {
                templates: [
                  { file: 'mvnw', noEjs: true },
                  { file: 'mvnw.cmd', noEjs: true },
                  { file: '.mvn/wrapper/maven-wrapper.jar', noEjs: true },
                  { file: '.mvn/wrapper/maven-wrapper.properties', noEjs: true },
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

  get [END_PRIORITY]() {
    return {
      afterRunHook() {
        this.log(`
${chalk.greenBright('The TODO template has been created successfully! 🎉')}

${chalk.magentaBright(`Run locally:`)}
${chalk.cyan(`    mvn clean package -DskipTests`)}
${chalk.cyan(`    java -jar web\\target\\azure-spring-apps-todo-web-0.0.1-SNAPSHOT.jar`)}

${chalk.magentaBright(`Deploy on Azure Spring Apps with monthly free grants:`)}
${chalk.cyan(`    https://aka.ms/asa/webapp-quickstart`)}
                  `);
      },
    };
  }
}
