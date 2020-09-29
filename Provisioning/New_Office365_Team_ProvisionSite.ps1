param 
(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

function Download-PnPTemplate($templateName) {
    $sas = Get-AutomationVariable –Name 'SASBlob'

    $context = New-AzureStorageContext –StorageAccountName "mmsharepoint"  –StorageAccountKey $sas

    Get-AzureStorageBlobContent –Context $context –Container "pnp" –Blob $templateName –Destination "C:\Users\$templateName"
}

$azureSPOcreds = Get-AutomationPSCredential –Name 'AzureAutomationSPO'
$Password = $azureSPOcreds.GetNetworkCredential().Password
$global:SecPassword = $azureSPOcreds.Password
$global:ClientID = $azureSPOcreds.UserName

$cert = Get-AutomationCertificate –Name 'AzureAutomationSPOAccess'

$pfxCert = $cert.Export(3 ,$Password) # 3=Pfx
$global:CertPath = Join-Path "C:\Users" "SPSiteModification.pfx"
Set-Content –Value $pfxCert –Path $global:CertPath –Force –Encoding Byte | Write-Verbose
    
if (Test-Path $global:CertPath)
{
    $global:PnpCert = Get-PnPAzureCertificate –CertificatePassword $global:SecPassword –CertificatePath $global:CertPath
}
# Alternatively Legacy credentials
# $credentials = Get-AutomationPSCredential -Name 'MM_O365'
Set-PnPTraceLog	–On –Level Debug 
Try
{
    Connect-PnPOnline –CertificatePath $global:CertPath `
                    –CertificatePassword $global:SecPassword `
                    –Tenant $global:tenantConfig.Settings.Azure.AADDomain `
                    –ClientId $global:ClientID `
                    –Url $SiteUrl
    # Connect-PnPOnline -Credentials $credentials -Url $SiteUrl
    
    $templateName="Template_TeamsBasic.xml"
    Download–PnPTemplate($templateName);
    $templatePath="C:\Users\$templateName";

    Write-Output "$(Get-Date –Format u) Template to be used is $templatePath"

    Write-Output "$(Get-Date –Format u) Provisioning started"
    Apply–PnPProvisioningTemplate –Path $templatePath 
}
Catch
{
    Write-Output (Get-Date –Format u)" "$_.Exception.Message
    Write-Output (Get-Date –Format u)" "$_.Exception.StackTrace
}
Finally
{
    Write-Output "$(Get-Date –Format u) Provisioning done!"
    Set-PnPTraceLog –Off 
}
    