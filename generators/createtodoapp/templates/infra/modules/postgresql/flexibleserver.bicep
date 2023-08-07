param serverName string
param location string = resourceGroup().location
param tags object = {}
param psqlAdminName string
param psqlUserName string
@secure()
param psqlAdminPassword string
@secure()
param psqlUserPassword string
param databaseName string
param version string = '14'

// Latest official version 2022-12-01 does not have Bicep types available
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  location: location
  tags: tags
  name: serverName
  sku: {
  	name: 'Standard_D4s_v3'
  	tier: 'GeneralPurpose'
  }
  properties: {
    version: version
    administratorLogin: psqlAdminName
    administratorLoginPassword: psqlAdminPassword
    storage: {
      storageSizeGB: 32
    }
    availabilityZone: '1'
    highAvailability: {
      mode: 'Disabled'
    }
    authConfig: {
      activeDirectoryAuth: 'Disabled'
      passwordAuth: 'Enabled'
      tenantId: subscription().tenantId
    }
  }

  resource database 'databases' = {
    name: databaseName
    properties: {
      charset: 'utf8'
      collation: 'en_US.utf8'
    }
  }

  resource firewall_all 'firewallRules' = {
    name: 'allow-all-IPs'
    properties: {
      startIpAddress: '0.0.0.0'
      endIpAddress: '255.255.255.255'
    }
  }

}

resource psqlDeploymentScript 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'psql-deployment-script'
  location: location
  kind: 'AzureCLI'
  properties: {
    azCliVersion: '2.40.0'
    retentionInterval: 'PT1H' // Retain the script resource for 1 hour after it ends running
    timeout: 'PT5M' // Five minutes
    cleanupPreference: 'OnSuccess'
    environmentVariables: [
      {
        name: 'PSQLADMINNAME'
        value: psqlAdminName
      }
      {
        name: 'PSQLADMINPASSWORD'
        secureValue: psqlAdminPassword
      }
      {
        name: 'PSQLUSERNAME'
        value: psqlUserName
      }
      {
        name: 'PSQLUSERPASSWORD'
        secureValue: psqlUserPassword
      }
      {
        name: 'DBNAME'
        value: databaseName
      }
      {
        name: 'DBSERVER'
        value: serverName
      }
    ]

    scriptContent: '''
apk add postgresql-client

cat << EOF > create_user.sql
CREATE ROLE "$PSQLUSERNAME" WITH LOGIN PASSWORD '$PSQLUSERPASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $DBNAME TO "$PSQLUSERNAME";
EOF

psql "host=$DBSERVER.postgres.database.azure.com user=$PSQLADMINNAME dbname=$DBNAME port=5432 password=$PSQLADMINPASSWORD sslmode=require" < create_user.sql
    '''
  }
  dependsOn: [
  	postgresServer
  ]
}


output POSTGRES_DOMAIN_NAME string = postgresServer.properties.fullyQualifiedDomainName
