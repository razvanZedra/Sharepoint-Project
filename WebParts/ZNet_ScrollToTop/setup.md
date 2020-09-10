# Setup Scroll To Top

Some properties are defined by default. You you wish to customize:

* UI Fabric icon
* Shape
* Duration of scrolling

it is possible configure the extension.

## PowerShell setup (Windows only)

### Prerequisites

1. Site Collection App Catalog or Tenant App Catalog
2. Install [PnP PowerShell Module](https://github.com/SharePoint/PnP-PowerShell/releases)
3. Login to your target SharePoint Site Collection (more information about [Connect-PnPOnline](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/connect-pnponline))
    ```powershell
    Connect-PnPOnline -Url https://contoso.sharepoint.com/sites/target-site
    ```

### Setup

| Argument | Required | Default value | Description |
|----------|----------|---------------|-------------|
|`-siteUrl`|yes|`undefined`|URL of the site to provision and/or enable the extension|
|`-scrollDuration`|yes|`1000`|GDefine the scroll duration (ms), e.g. `1000`|
|`-icon`|yes|`ChevronUpSmall`|Define a custom UI Fabric icon display in to the button, e.g. `ChevronUpSmall`|
|`-shape`|yes|`square`|Choose the button shape between square or circle, e.g. `square|circle`|
|`-tenantSolutionDeployment`|no|`false`|Set `true`, to deploy the solution package to the whole tenant. If not specified, the package will be deployed to the current Site App Catalog|
|`-skipCustomAction`|no|`false`|Don't enable the custom action to the target site|
|`-checkPoint`|no|`0`|Check point from which to resume executing the setup script|
|`-appId`|no|`undefined`|Product ID of the App from the App Catalog. Use only at checkpoint `200`|

> Note: to get help from PowerShell cmdlet, type : `Get-Help .\setup.ps1`

#### Examples

```powershell
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site
```
In this example, deploy the solution package to the Site Collection App Catalog

```powershell
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -scrollDuration 500 -icon "Up" -shape "circle"
```
In this example, all custom properties are overwrite

```powershell
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -tenantSolutionDeployment
```
In this example, deploy the solution package to the Tenant App Catalog

```powershell
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -checkPoint 300
```
In this example, enable the custom action the target site collection only

```powershell
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -skipCustomAction
```
In this example, deploy and install the package only (the custom action will be not enabled)

## Bash Setup (any platform)

### Prerequisites

1. Site Collection App Catalog or Tenant App Catalog
2. Install [Office365 CLI](https://pnp.github.io/office365-cli/user-guide/installing-cli)
    ```bash
    npm i -g @pnp/office365-cli
    ```
3. Execute
    * login to your target SharePoint Site Collection (more information about [spo login](https://pnp.github.io/office365-cli/cmd/spo/login))
    ```bash
    o365 spo connect https://contoso.sharepoint.com/sites/target-site
    ```
    * allow execution setup script
    ```bash
    chmod +x ./setup.sh
    ```
    * execute setup script

### Setup

| Argument | Required | Default value | Description |
|----------|----------|---------------|-------------|
|`-s`,`--siteUrl`|yes|`undefined`|URL of the site to provision and/or enable the extension|
|`--scrollDuration`|yes|`1000`|GDefine the scroll duration (ms), e.g. `1000`|
|`--icon`|yes|`ChevronUpSmall`|Define a custom UI Fabric icon display in to the button, e.g. `ChevronUpSmall`|
|`--shape`|yes|`square`|Choose the button shape between square or circle, e.g. `square|circle`|
|`--tenantSolutionDeployment`|no|`false`|Set `true`, to deploy the solution package to the whole tenant. If not specified, the package will be deployed to the current Site App Catalog|
|`--skipCustomAction`|no|`false`|Don't enable the custom action to the target site|
|`--checkPoint`|no|`0`|Check point from which to resume executing the setup script|
|`--appId`|no|`undefined`|Product ID of the App from the App Catalog. Use only at checkpoint `200`|
|`--verbose`|no|`false`|Runs setup with verbose logging|
|`--help`|no|`false`|Output usage information|

#### Examples

```bash
./setup.sh --siteUrl https://contoso.sharepoint.com/sites/target-site
```
In this example, deploy the solution package to the Site Collection App Catalog

```bash
./setup.sh --siteUrl https://contoso.sharepoint.com/sites/target-site --scrollDuration 500 --icon "Up" --shape "circle"
```
In this example, all custom properties are overwrite

```bash
./setup.sh --siteUrl https://contoso.sharepoint.com/sites/target-site --tenantSolutionDeployment
```
In this example, deploy the solution package to the Tenant App Catalog

```bash
./setup.sh --siteUrl https://contoso.sharepoint.com/sites/target-site --checkPoint 300
```
In this example, enable the custom action the target site collection only

```bash
./setup.sh --siteUrl https://contoso.sharepoint.com/sites/target-site --skipCustomAction
```
In this example, deploy and install the package only (the custom action will be not enabled)
