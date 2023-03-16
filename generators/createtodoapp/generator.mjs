import chalk from 'chalk';
import BaseGenerator from 'generator-jhipster/esm/generators/base';
import {
  PRIORITY_PREFIX,
  PROMPTING_PRIORITY,
  WRITING_PRIORITY,
} from 'generator-jhipster/esm/priorities';

export default class extends BaseGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });
  }

  get [PROMPTING_PRIORITY]() {
    return {
      async promptingTemplateTask() {

        const prompts = [
          {
            type: "input",
            name: "applicationName",
            message: "What is your application name?",
            default: "azure-spring-apps-todo"
          },
          {
            type: "input",
            name: "serverPort",
            message: "On which port would you like your server to run?",
            default: 8080
          },
          {
            type: "input",
            name: "packageName",
            message: "What is your default java package name?",
            default: "com.mycompany.myapp"
          },
          {
            type: "confirm",
            name: "prodDatabase",
            message: "Do you need a production database?",
            default: true
          },
          {
            type: "confirm",
            name: "devDatabase",
            message: "Do you need a development database?",
            default: true
          }
        ];

        const props = await this.prompt(
          prompts,
          this.blueprintStorage
        );

        this.todoAppProps = props
      },
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask() {

        this.fs.copy(this.templatePath("client/"), this.destinationPath("client/"),);

        const packageName = this.todoAppProps.packageName.replaceAll(".", "/");

        await this.writeFiles({
          sections: {
            maven: [{
              templates: [
                { file: 'mvnw', noEjs: true },
                { file: 'mvnw.cmd', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.jar', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.properties', noEjs: true },
              ],
            }],
            client: [{
              templates: [
                {
                  file: 'clientpom.xml',
                  renameTo: ctx => `client/pom.xml`
                },
              ],
            }],
            web: [{
              templates: [
                { file: 'web/pom.xml'},
                {
                  file: 'web/configuration/RFC3339DateFormat.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/configuration/RFC3339DateFormat.java`
                },
                {
                  file: 'web/configuration/WebConfiguration.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/configuration/WebConfiguration.java`
                },
                {
                  file: 'web/model/TodoItem.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/model/TodoItem.java`
                },
                {
                  file: 'web/model/TodoList.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/model/TodoList.java`
                },
                {
                  file: 'web/model/TodoState.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/model/TodoState.java`
                },
                {
                  file: 'web/repository/TodoItemRepository.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/repository/TodoItemRepository.java`
                },
                {
                  file: 'web/repository/TodoListRepository.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/repository/TodoListRepository.java`
                },
                {
                  file: 'web/web/HomeController.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/web/HomeController.java`
                },
                {
                  file: 'web/web/TodoListsController.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/web/TodoListsController.java`
                },
                {
                  file: 'web/SimpleTodoApplication.java',
                  renameTo: ctx => `web/src/main/java/${packageName}/SimpleTodoApplication.java`
                },
                {
                  file: 'web/application.yml',
                  renameTo: ctx => `web/src/main/resources/application.yml`
                },
              ],
            }],
            parent: [{
              templates: [
                { file: 'pom.xml'},
              ],
            }]
          },
          context: this.todoAppProps
        });

      },
    };
  }

}
