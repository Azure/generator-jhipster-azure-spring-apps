param asaInstanceName string
param appName string
param location string = resourceGroup().location
param tags object = {}
param relativePath string
param databaseUsername string
@secure()
param databasePassword string

resource asaInstance 'Microsoft.AppPlatform/Spring@2022-12-01' = {
  name: asaInstanceName
  location: location
  tags: tags
  sku: {
      name: 'B0'
      tier: 'Basic'
    }
}

resource asaApp 'Microsoft.AppPlatform/Spring/apps@2022-12-01' = {
  name: appName
  location: location
  parent: asaInstance
  properties: {
    public: true
    activeDeploymentName: 'default'
  }
}

resource asaDeployment 'Microsoft.AppPlatform/Spring/apps/deployments@2022-12-01' = {
  name: 'default'
  parent: asaApp
  properties: {
    deploymentSettings: {
      resourceRequests: {
        cpu: '1'
        memory: '2Gi'
      }
      environmentVariables: {
		DATABASE_USERNAME: databaseUsername
		DATABASE_PASSWORD: databasePassword
	  }
    }
    source: {
      type: 'Jar'
      runtimeVersion: 'Java_17'
      relativePath: relativePath
    }
  }
}

output name string = asaApp.name
output uri string = 'https://${asaApp.properties.url}'
