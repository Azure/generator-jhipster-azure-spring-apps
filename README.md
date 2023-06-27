<div align="center">
    <a href="https://start.jhipster.tech/generate-azure-application">
        <img width="380" height="160" src="https://raw.githubusercontent.com/Azure/generator-jhipster-azure-spring-apps/main/jhipster-asa-logo.png">
    </a>
</div>

---

# About

Jhipster Azure Spring Apps can quickly create applications that can be deployed on [Azure Spring Apps](https://azure.microsoft.com/en-au/products/spring-apps/) with easy steps.

Documentation about Azure Spring Apps is available [here](https://learn.microsoft.com/en-us/azure/spring-apps/overview)

---

### Prerequisites

The following prerequisites are required to use this application. Please ensure that you have them all installed locally.

- [Azure Developer CLI](https://aka.ms/azd-install)
- [Java 17 or later](https://learn.microsoft.com/en-us/java/openjdk/install) - for API backend
- [Node.js with npm (16.13.1+)](https://nodejs.org/) - for the Web frontend

## 🚀 How to generate a project

### CLI

1. Install the package with `npm i generator-jhipster-azure-spring-apps`
1. Create and navigate to a directory
1. Generate the application with `jhipster-azure-spring-apps createtodoapp`

### JHipster Online

Go to [Jhipster Online](https://start.jhipster.tech/generate-azure-application) and generate your application.

## 🎉 How to deploy on Azure

1. Log in to azd. Only required once per-install.
   </br> `azd auth login`
1. Enable Azure Spring Apps feature for AZD
   </br> `azd config set alpha.springapp on`
1. Navigate to the generated project directory and run
   </br>`azd up`

After the command is executed, you can see the following log signs that the deployment was successful.

```text
[INFO] Deployment(default) is successfully updated.
[INFO] Deployment Status: Running
[INFO] Getting public url of app(simple-todo-web)...
[INFO] Application url: https://<your-azure-spring-apps-name>-simple-todo-web.azuremicroservices.io
```

The output **Application url** is the endpoint to access the todo application.

## ❤️ Next Steps

- [Try Azure for free](https://azure.microsoft.com/en-us/products/spring-apps/#overview), you can start with $200 Azure credit.

- To help you get started, Azure Spring Apps have [monthly FREE grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all plans – 50 vCPU Hours and 100 memory GB Hours per plan.

- To learn more about this project, check [here](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-web-app?pivots=sc-standard).

- At this point, you have a complete application deployed on Azure, to delete all the Azure resources created with this template:
  </br>[`azd down`](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference#azd-down)
