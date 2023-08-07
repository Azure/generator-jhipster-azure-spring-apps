targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Relative Path of ASA Jar')
param relativePath string

@allowed([
  'consumption'
  'standard'
])
param plan string = 'consumption'

@secure()
@description('PSQL Server administrator password')
param psqlAdminPassword string = 'SuperAdminPassword1!'

@secure()
@description('Application user password')
param psqlUserPassword string = 'SuperUserPassword1!'

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var asaManagedEnvironmentName = '${abbrs.appContainerAppsManagedEnvironment}${resourceToken}'
var asaInstanceName = '${abbrs.springApps}${resourceToken}'
var appName = 'simple-todo-web'
var psqlServerName = '${abbrs.postgresServer}${resourceToken}'
var databaseName = 'Todo'
var datasourceJdbcUrl= 'jdbc:postgresql://${psqlServerName}.postgres.database.azure.com:5432/${databaseName}'
var psqlAdminName = 'psqladmin'
var psqlUserName = 'psqluser'
var tags = {
  'azd-env-name': environmentName
  'jhipster': 'true'
}


// Organize resources in a resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

module postgresql 'modules/postgresql/flexibleserver.bicep' = {
  name: '${deployment().name}--pg'
  scope: resourceGroup(rg.name)
  params: {
  	serverName: psqlServerName
    location: location
  	tags: tags
  	psqlAdminName: psqlAdminName
  	psqlUserName: psqlUserName
    psqlAdminPassword: psqlAdminPassword
    psqlUserPassword: psqlUserPassword
    databaseName: databaseName
  }
}

module springAppsConsumption 'modules/springapps/springappsConsumption.bicep' = if (plan == 'consumption') {
  name: '${deployment().name}--asaconsumption'
  scope: resourceGroup(rg.name)
  params: {
    location: location
    appName: appName
    tags: tags
    asaManagedEnvironmentName: asaManagedEnvironmentName
    asaInstanceName: asaInstanceName
    relativePath: relativePath
    databaseUsername: psqlUserName
    databasePassword: psqlUserPassword
    datasourceUrl: datasourceJdbcUrl
  }
}

module springAppsStandard 'modules/springapps/springappsStandard.bicep' = if (plan == 'standard') {
  name: '${deployment().name}--asastandard'
  scope: resourceGroup(rg.name)
  params: {
    location: location
    appName: appName
    tags: tags
    asaInstanceName: asaInstanceName
    relativePath: relativePath
    databaseUsername: psqlUserName
    databasePassword: psqlUserPassword
    datasourceUrl: datasourceJdbcUrl
  }
}
