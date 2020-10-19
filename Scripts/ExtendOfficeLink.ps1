#Config Variables
$connectionName = "AzureRunAsConnection"
$AdminSiteURL = Get-AutomationVariable -Name 'TenantUrl'
$ADPropertyName = Get-AutomationVariable -Name 'ADPropertyName'
$SPOPropertyName = Get-AutomationVariable -Name 'SPOPropertyName'
$servicePrincipalConnection = Get-AutomationConnection -Name $connectionName
$SPOAppId = Get-AutomationVariable -Name 'SharePointAppID'
$SPOAppSecret = Get-AutomationVariable -Name 'SharePointAppSecret'


Try {
    #Connect to AzureAD
    Connect-AzureAD -TenantId $servicePrincipalConnection.TenantId -ApplicationId $servicePrincipalConnection.ApplicationId -CertificateThumbprint  $servicePrincipalConnection.CertificateThumbprint
 
    #Connect-AzureAD -TenantId $servicePrincipalConnection.TenantId -ApplicationId $servicePrincipalConnection.ApplicationId -CertificateThumbprint  $servicePrincipalConnection.CertificateThumbprint
    $AllUsers = Get-AzureADUser -All:$True -Filter "UserType eq 'Member'"

    #Connect to PnP Online
    Connect-PnPOnline -Url $AdminSiteURL -AppId $SPOAppId -AppSecret $SPOAppSecret
    Write-Output Get-PnPContext
    #Iterate through All Users
    $Counter = 1
    ForEach($User in $AllUsers)
    {

        Write-host "`Updating User Profile Property for: $($User.UserPrincipalName)" -f Yellow
        $extendedPropertyKey = $User.ExtensionProperty.Keys | Where-Object {$_ -match ($ADPropertyName+"*")} 


        if($User.Surname -eq $null -or $User.Surname -eq "Service Account"){
            continue
        }
        if($extendedPropertyKey -eq $null){
          #$($User.UserPrincipalName +";") | Out-File -filePath C:\Logs\UsersWithNoExtendedProperty.txt -Append
          Write-Output "`User does not have extended property synced from AD"
            continue
        }else{
            $ADUserPropertyValue = $User.ExtensionProperty.$extendedPropertyKey
        }

        
 
        #Check if the AD Property is not Null
        If (!([string]::IsNullOrEmpty($ADUserPropertyValue)))
        {
            #Get existing User Profile Property from SharePoint
            $UserAccount = "i:0#.f|membership|$($User.UserPrincipalName)"
            $UserProfile = Get-PnPUserProfileProperty -Account $UserAccount
            $UserProfileProperty = $UserProfile.UserProfileProperties[$SPOPropertyName]
 
            #Check if the Existing SharePoint User Profile Property is Null
            If (([string]::IsNullOrEmpty($UserProfileProperty)))
            {
                Set-PnPUserProfileProperty -Account $UserAccount -PropertyName $SPOPropertyName -Value $ADUserPropertyValue
                Write-host "`Updated User Profile Property for: $($User.UserPrincipalName)" -f Green
            }
            Else
            {
                Write-host "`Existing Value of the Property in SharePoint is Not Null! Skipping..." -f Yellow
            }
        }
        else
        {
            Write-host "`AD Value of the Property is Null! Skipping..." -f Yellow
        }
        $Counter++
        Write-Progress -Activity "Updating User Profile Data..." -Status "Updating User Profile $Counter of $($AllUsers.Count)" -PercentComplete (($Counter / $AllUsers.Count)  * 100)
    }
}
Catch {
    write-host -f Red "Error Updating User Profile Property!" $_.Exception.Message
}


