#Config Variables
$AdminSiteURL = "https://zedra365.sharepoint.com/"
$ADPropertyName = "Department"
$SPOPropertyName = "extensionAttribute2"
 
#Get Credentials to connect to Azure AD and SharePoint Online Admin Center

 
Try {
    #Connect to AzureAD
    Connect-AzureAD 
 
    #Get All Users of the Domain from AzureAD
    $AllUsers = Get-AzureADUser -All:$True -Filter "UserType eq 'Member'"
    Write-host "Total Number of User Profiles Found:"$AllUsers.Count 
 
    #Connect to PnP Online
    Connect-PnPOnline -Url $AdminSiteURL -Credentials $Cred
 
    #Iterate through All Users
    $Counter = 1
    ForEach($User in $AllUsers)
    {
        Write-host "`nUpdating User Profile Property for: $($User.UserPrincipalName)" -f Yellow
 
        #Get the User Property value from Azure AD       
        $ADUserPropertyValue = $User | Select -ExpandProperty $ADPropertyName
 
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
                Write-host "`tUpdated User Profile Property for: $($User.UserPrincipalName)" -f Green
            }
            Else
            {
                Write-host "`t Existing Value of the Property in SharePoint is Not Null! Skipping..." -f Yellow
            }
        }
        else
        {
            Write-host "`t AD Value of the Property is Null! Skipping..." -f Yellow
        }
        $Counter++
        Write-Progress -Activity "Updating User Profile Data..." -Status "Updating User Profile $Counter of $($AllUsers.Count)" -PercentComplete (($Counter / $AllUsers.Count)  * 100)
    }
}
Catch {
    write-host -f Red "Error Updating User Profile Property!" $_.Exception.Message
}


#Read more: https://www.sharepointdiary.com/2019/03/sharepoint-online-import-user-profile-property-from-azure-ad-using-powershell.html#ixzz6aqOQb6fl