param
(
    [Parameter(Mandatory=$true)]
    [string]$CertName,
    [Parameter(Mandatory=$true)]
    [string]$Password
)

function CreatePnPCertificate(){
    $secPassword = ConvertTo-SecureString -String $Password -AsPlainText -Force
    $cert = New-PnPAzureCertificate -OutPfx ($CertName+".pfx") -ValidYears 10 -CertificatePassword $secPassword -CommonName $CertName -Country "UK" -Organization 'Zedra'
}