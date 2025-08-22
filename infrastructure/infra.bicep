@description('Name der Static Web App') 
param staticWebAppName string 

@description('Region') 
param location string = resourceGroup().location 

@description('Github Repo URL') 
param repoUrl string 

@description('Branch') 
param branch string 

// Static Web App SWA 
resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = { 
  name: staticWebAppName 
  location: location 
  properties: { 
    repositoryUrl: repoUrl 
    branch: branch 
    buildProperties: { 
      appLocation: '/' 
      apiLocation: '' 
      outputLocation: 'dist' 
    } 
  } 
}

output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'
