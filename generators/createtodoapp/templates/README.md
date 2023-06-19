
# React Web App with Java API and PostgreSQL

A blueprint for getting a React web app with a Java API and a PostgreSQL - Flexible Server on Azure. The blueprint includes sample application code (a ToDo web app) which can be removed and replaced with your own application code. Add your own source code and leverage the Infrastructure to get up and running quickly. This architecture is for running containerized apps or microservices on a serverless platform.

Let's jump in and get this up and running in Azure. When you are finished, you will have a fully functional web app deployed to the cloud. In later steps, you'll see how to setup a pipeline and run the application.

!["Screenshot of deployed ToDo app"](assets/web.png)

<sup>Screenshot of the deployed ToDo app</sup>

### Prerequisites

The following prerequisites are required to use this application. Please ensure that you have them all installed locally.

- [Azure Developer CLI](https://aka.ms/azd-install)
- [Java 17 or later](https://learn.microsoft.com/en-us/java/openjdk/install) - for API backend
- [Node.js with npm (16.13.1+)](https://nodejs.org/) - for the Web frontend

## How to deploy on Azure
1. Log in to azd. Only required once per-install.
</br> `azd auth login`
1. Enable Azure Spring Apps feature for AZD
</br> `azd config set alpha.springapp on`
1. Prepare environment
</br> Navigate to the generated project directory and run
</br>`azd up`
1. Package
</br> `azd package`
1. Deploy
</br> `azd deploy`

### Application Architecture

This application utilizes the following Azure resources:

- [**Azure Spring Apps**](https://docs.microsoft.com/azure/spring-apps/) to host the application
- [**Azure PostgreSQL - Flexible Server**](https://docs.microsoft.com/azure/postgresql/flexible-server/) for storage

Here's a high level architecture diagram that illustrates these components. Notice that these are all contained within a single [resource group](https://docs.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal), that will be created for you when you create the resources.

!["Application architecture diagram"](assets/resources.png)

> This template provisions resources to an Azure subscription that you will select upon provisioning them. Please refer to the [Pricing calculator for Microsoft Azure](https://azure.microsoft.com/pricing/calculator/) and, if needed, update the included Azure resource definitions found in `infra/main.bicep` to suit your needs.

### Application Code

This template is structured to follow the [Azure Developer CLI](https://aka.ms/azure-dev/overview). You can learn more about `azd` architecture in [the official documentation](https://learn.microsoft.com/azure/developer/azure-developer-cli/make-azd-compatible?pivots=azd-create#understand-the-azd-architecture).

### Next Steps
- [Try Azure for free](https://azure.microsoft.com/en-us/products/spring-apps/#overview), you can start with $200 Azure credit.

- To help you get started, Azure Spring Apps have [monthly FREE grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all plans – 50 vCPU Hours and 100 memory GB Hours per plan.

- To learn more about this project, check [here](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-web-app?pivots=sc-standard).

- At this point, you have a complete application deployed on Azure. But there is much more that the Azure Developer CLI can do. These next steps will introduce you to additional commands that will make creating applications on Azure much easier. Using the Azure Developer CLI, you can delete the resources easily.

- [`azd down`](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference#azd-down) - to delete all the Azure resources created with this template


### Additional `azd` commands

The Azure Developer CLI includes many other commands to help with your Azure development experience. You can view these commands at the terminal by running `azd help`. You can also view the full list of commands on our [Azure Developer CLI command](https://aka.ms/azure-dev/ref) page.

## Reporting Issues and Feedback

If you have any feature requests, issues, or areas for improvement, please [file an issue](https://aka.ms/azure-dev/issues). To keep up-to-date, ask questions, or share suggestions, join our [GitHub Discussions](https://aka.ms/azure-dev/discussions). You may also contact us via AzDevTeam@microsoft.com.
