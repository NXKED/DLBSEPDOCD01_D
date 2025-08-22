# DLBSEPDOCD01_D

## Deployment:

### Ressourcen Gruppe erstellen

\*benötigt RES-NAME

az group create \
 --name "RES-NAME" \
 --location westeurope

### Erstellen der SWA je Branch (Muss für jeden Branch ausgeführt werden)

\*benötigt SWA-NAME, REPO-URL, BRANCH, RES-NAME

az deployment group create \
 --resource-group "XYZ" \
 --template-file infrastructure/infra.bicep \
 --parameters staticWebAppName="SWA-NAME" \
 repoUrl="REPO-URL" \
 branch="BRANCH"
