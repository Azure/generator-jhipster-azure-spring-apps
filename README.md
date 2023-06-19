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

## 🚀 How to generate a project
### CLI
1. Install the package with `npm i generator-jhipster-azure-spring-apps`
1. Create and navigate to a directory
1. Generate the application with `jhipster-azure-spring-apps createtodoapp`

### JHipster Online
Go to [Jhipster Online](https://start.jhipster.tech/generate-azure-application) and generate your application.

## 🎉 How to deploy on Azure
1. Install AZD, you can try one of the following options:
 - **Windows package manager(winget)**: `winget install microsoft.azd`
 - **Chocolatey**: `choco install azd`
 - **Script**: `powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"`
1. Prepare environment
</br>Log in Azure with OAuth2:
</br> `azd auth login`
</br>  Provision the template's infrastructure to Azure.
</br> `azd provision`
1. Package
</br> `azd package`
1. Deploy
</br> `azd deploy`

1. Clean up resources
</br> Run the following command to delete all the Azure resources used in this sample application.
 </br>`azd down`

## ❤️ Learn more
To help you get started, Azure Spring Apps have [monthly FREE grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all plans – 50 vCPU Hours and 100 memory GB Hours per plan.

To learn more about this project, check [here](https://learn.microsoft.com/azure/spring-apps/quickstart-deploy-web-app?pivots=sc-standard).
