# Azure Spring Apps Sample - Simple Todo App

There are 2 branches about this repository:
1. [quickstart](https://github.com/Azure-Samples/ASA-Samples-Web-Application/blob/quickstart/README.md). This branch is used to teach you to run [spring web application](https://spring.io/web-applications) in [Azure Spring Apps](https://learn.microsoft.com/en-us/azure/spring-apps/overview) (ASA) in a short time.
2. [reference-architecture](https://github.com/Azure-Samples/ASA-Samples-Web-Application/blob/reference-architecture/README.md). This branch give the reference architecture (best practice) of running spring web application in Azure Spring Apps.

## Prerequisites

- Java 17 or later

## Run the app in localhost

1. Build sample project.

    ```shell
    ./mvnw clean package -DskipTests
    ```

2. Run sample project.

    ```shell
    ./mvnw spring-boot:run -f web/pom.xml
    ```

3. Access `http://localhost:8080` by browser, you will see a page like this:

> ![web.png](./assets/web.png)

## Run the app in Azure Spring Apps.

Please refer to [Quickstart: Launch your first web app](.) (todo: Update the link when the article is ready.) to get more information about running the app in Azure Spring Apps.
