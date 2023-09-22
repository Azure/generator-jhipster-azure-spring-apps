<div align="center">
    <a href="https://start.jhipster.tech/generate-azure-application">
        <img width="380" height="160" src="https://raw.githubusercontent.com/Azure/generator-jhipster-azure-spring-apps/main/jhipster-asa-logo.png">
    </a>
    <h1>JHipster Azure Spring Apps</h1>
</div>

---

# About

JHipster Azure Spring Apps can quickly create applications that can be deployed on [Azure Spring Apps](https://azure.microsoft.com/en-au/products/spring-apps/) with easy steps.

Documentation about Azure Spring Apps is available [here](https://learn.microsoft.com/en-us/azure/spring-apps/overview)

---

### Prerequisites

The following prerequisites are required to use this application. Please ensure that you have them all installed locally.

- [Java 17 or later](https://learn.microsoft.com/en-us/java/openjdk/install) - for API backend
- [Node.js with npm (16.13.1+)](https://nodejs.org/) - for the Web frontend
- [Maven](https://maven.apache.org/download.cgi) - for local build
- Azure Subscription:
  - [Try Azure for free](https://azure.microsoft.com/en-us/products/spring-apps/#overview), you can start with $200 Azure credit.
  - To help you get started, Azure Spring Apps have [monthly FREE grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all plans – 50 vCPU Hours and 100 memory GB Hours per plan.
- [Azure Developer CLI 1.2.0 or later](https://aka.ms/azd-install)

## 🚀 How to generate a project

### CLI

1. Install the package with `npm install -g generator-jhipster-azure-spring-apps`
1. Create and navigate to a directory
1. Generate the application with `jhipster-azure-spring-apps createtodoapp`

### JHipster Online

Go to [JHipster Online](https://start.jhipster.tech/generate-azure-application) and generate your application.

## 🚁 How to run locally

To run the project on the localhost:

- `mvn clean package -DskipTests`
- `java -jar web/target/${artifact-name}-web-0.0.1-SNAPSHOT.jar`

You can also use Maven Wrapper with:

- `chmod +x mvnw`
- `mvnw clean package -DskipTests`
- `./mvnw spring-boot:run -f web/pom.xml`

To test the local project, access port 8080 (by default) or the one that you specified:

- `http://localhost:8080/`

## 🎉 How to deploy on Azure

1. Log in to [azd](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd). Only required once per-install.
   </br> `azd auth login`
   - If you are on Windows, install [powershell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-on-windows)
1. Navigate to the generated project directory and run
   </br>`azd up`

After the command is executed, you can see the following log signs that the deployment was successful.

```text
SUCCESS: Your application was provisioned and deployed to Azure Spring Apps in <deployment-time>.
You can view the resources created under the resource group <your-resource-group> in Azure Portal:
https://portal.azure.come/#@/resource/subscriptions/<subscription-id>/resourceGroups/<your-resource-group>/overview
```

The output **Application url** is the endpoint to access the todo application.

## ❤️ Next Steps

- [Try Azure for free](https://azure.microsoft.com/en-us/products/spring-apps/#overview), you can start with $200 Azure credit.

- To help you get started, Azure Spring Apps have [monthly FREE grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all plans – 50 vCPU Hours and 100 memory GB Hours per plan.

- To learn more about this project, check [here](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-web-app?pivots=sc-standard).

- At this point, you have a complete application deployed on Azure, to delete all the Azure resources created with this template:
  </br>[`azd down`](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference#azd-down)
