<#
.SYNOPSIS
Deploy and install Scroll to Top to your Modern SharePoint Site Collection

.DESCRIPTION
With this script, you can deploy Scroll To Top to the Site Collection catalog or the whole Tenant and enable the custom action to the target site collection.

.EXAMPLE
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site

.EXAMPLE
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -scrollDuration 500 -icon "Up" -shape "circle"

.EXAMPLE
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -tenantSolutionDeployment

.EXAMPLE
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -checkPoint 300

.EXAMPLE
.\setup.ps1 -siteUrl https://contoso.sharepoint.com/sites/target-site -skipCustomAction

.NOTES
	Version		: 1.0.0.0
    File Name   : setup.ps1
    Author      : Laurent Sittler - laurent.sittler@lsonline.fr

.LINK
https://gitlab.lsonline.fr/SharePoint/sp-dev-fx-webparts/scrollToTop

#>

[CmdletBinding()]
Param(
    [Parameter(Mandatory=$true, HelpMessage="URL of the site to provision and/or enable the extension, e.g. 'https://contoso.sharepoint.com/sites/target-site'")]
    [string]$siteUrl,

    [Parameter(Mandatory=$false, HelpMessage="Define the scroll duration (ms), e.g. '1000'")]
    [int]$scrollDuration,

    [Parameter(Mandatory=$false, HelpMessage="Define a custom UI Fabric icon display in to the button, e.g. 'ChevronUpSmall'")]
    [string]$icon,

    [Parameter(Mandatory=$false, HelpMessage="Choose the button shape between square or circle, e.g. 'square'")]
    [string]$shape,

    [Parameter(Mandatory=$false, HelpMessage="Define to deploy the solution package to the whole tenant. If not specified, the package will be deployed to the current Site App Catalog")]
    [switch]$tenantSolutionDeployment,

    [Parameter(Mandatory=$false, HelpMessage="Define to skip the custom action to the target site")]
    [switch]$skipCustomAction,

    [Parameter(Mandatory=$false, HelpMessage="Check point from which to resume executing the setup script, e.g. '300'")]
    [int]$checkPoint = 0,

    [Parameter(Mandatory=$false, HelpMessage="Product ID of the App from the App Catalog. Use only at checkpoint '200'")]
    [string]$appId
)

# String used for write-host indication mostly
$solutionName = "Scroll To Top"

# Force UTF8 encoding script
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

$global:CommandDirectory = Split-Path $SCRIPT:MyInvocation.MyCommand.Path -Parent

Push-Location $CommandDirectory

# Get Credentials. If not exists, provide a Windows Prompt 
If ($Credentials -eq [System.Management.Automation.PSCredential]::Empty) { 
	$Credentials = Get-Credential 
}

# Package if necessary when the checkpoint if lower than 200
If ($checkPoint -lt 200) {
    $package = Join-Path -Path $global:CommandDirectory -ChildPath "scrollToTop.sppkg"
    If ((Test-Path $package -PathType Leaf) -ne $True) {
        Write-Host "Package file not found" -ForegroundColor Red
        exit 1
    }
}

If ($checkPoint -lt 300 -and $checkPoint -gt 100 -and !$appId) {
    Write-Host "appId is necessary." -ForegroundColor Red
    exit 1
}

If ($tenantSolutionDeployment) {
    Write-Host "Retrieving tenant app catalog URL..."
    $appCatalogUrl = Get-PnPTenantAppCatalogUrl
    If ($appCatalogUrl) {
        Write-Verbose "Tenant App Catalog was find."
    } Else {
        Write-Host "Couldn't retrieve Tenant App Catalog." -ForegroundColor Red
        exit 1
    }

    Write-Host "Deploying the $solutionName Package to the Tenant AppCatalog..."

    If ($checkPoint -lt 100) {
        Write-Verbose "Adding the $solutionName Package to the Tenant AppCatalog..."

        $app = Add-PnPApp -Path $package -SkipFeatureDeployment
        $appId = $app.Id

        Write-Verbose "App ID: $appId"

        $checkPoint = 100
    }

    If ($checkPoint -lt 200) {
        Write-Verbose "Deploying/Publishing the $solutionName Package..."

        Publish-PnPApp -Identity $appId

        $checkPoint = 200
    }

    If ($checkPoint -lt 300) {
        Write-Verbose "Installing the $solutionName Package with ID: $appId..."

        Install-PnPApp -Identity $appId

        $checkPoint = 300
    }
} Else {
    If ($checkPoint -lt 100) {
        Write-Host "Deploying the $solutionName Package to the Site AppCatalog..."
        # Push package to the site AppCatalog
        Write-Verbose "Adding the $solutionName Package to the Site AppCatalog $siteUrl..."

        $app = Add-PnPApp -Path $package -Scope Site
        $appId = $app.Id
        
        Write-Verbose "App ID: $($appId)...\n"
        
        $checkPoint = 100
    }

    If ($checkPoint -lt 200) {
        # Deploy solution from the site AppCatalog
        Write-Verbose "Deploying/Publishing the $solutionName Package..."

        Publish-PnPApp -Identity $appId -Scope Site

        $checkPoint = 200
    }

    If ($checkPoint -lt 300) {
        # Install solution to site collection
        Write-Verbose "Installing the $solutionName Package with ID : $appId..."
            
        Install-PnPApp -Identity $appId -Scope Site

        $checkPoint = 300
    }
}

If (!$skipCustomAction) {
    Write-Host "Enabling the $solutionName extension..."

    # Build SPFx extension propreties
    $str = "{`"scrollDuration`":"
    $str += $scrollDuration ? $scrollDuration : null

    $str += ",`"buttonIcon`":"
    $str += $icon ? "`"$icon`"" : "`"`""

    $str += ",`"shape`":"
    $str += $shape ? "`"$shape`"" : "`"`""
    $str += "}"

    Write-Verbose "SPFx properties: $str"

    Add-PnPCustomAction -ClientSideComponentId ba2540fe-8c92-4b95-99fb-04b074c82b13 -Name "$solutionName" -Title "$solutionName" -Location ClientSideExtension.ApplicationCustomizer -ClientSideComponentProperties $str -Scope site
}
