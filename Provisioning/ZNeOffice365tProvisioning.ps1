

param
(
    [Parameter(Mandatory=$true)]
    [string]$alias,
    [Parameter(Mandatory=$true)]
    [string]$displayName,
    [Parameter(Mandatory=$true)]
    [string]$teamDescription,
    [Parameter(Mandatory=$true)]
    [string]$teamOwner
)
$VerbosePreference = "Continue" 
$creds = Get-AutomationPSCredential –Name 'MM_AzureGraph'
$global:AppID = $creds.UserName
$global:AppSecret = $creds.GetNetworkCredential().Password

# $azureSPOcreds = Get-AutomationPSCredential -Name 'AzureAutomationSPO'
[xml]$global:tenantConfig = Get-AutomationVariable –Name 'TenantCOnfig'

# Call Team creation (sub)runbook which creates Team 
.\New_Office365_Team_CreateTeam2.ps1 `
		–DisplayName $displayName `
		–Alias $alias `
		–teamdescription $teamDescription `
		–TeamOwner $teamOwner

$team = Get-PnPUnifiedGroup –Identity $global:TeamID

$counter = 0
while (($team -eq $null -or $team.SiteUrl.Contains("Unable to provision resource")) -and $counter -lt 5)
{
    $counter++
    Write-Output "$(Get-Date –Format u) Team not ready yet. Wait 1min and try again $counter/5"
    start-sleep 60
    $team = Get-PnPUnifiedGroup –Identity $global:TeamID
}
Write-Output "$(Get-Date –Format u) Site Url: $($team.SiteUrl)"
$global:SiteUrl = $team.SiteUrl

.\New_Office365_Team_ProvisionSite.ps1 –SiteUrl $global:SiteUrl

# Next create a Teams tab
# https://docs.microsoft.com/en-us/graph/teams-configuring-builtin-tabs

.\New_Office365_Team_FurtherSteps.ps1 `
		–siteUrl $global:SiteUrl `
		–teamid $teamID