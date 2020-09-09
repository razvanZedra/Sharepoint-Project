help() {
  echo
  echo "Scroll Top Top"
  echo
  echo "Usage: ./setup.sh [options]"
  echo
  echo "Options:"
  echo
  echo "--help                                                  Output usage information"
  echo "-s, --siteUrl <siteUrl>                                 URL of the site to provision and/or enable the extension"
  echo "--scrollDuration [scrollDuration]                       Define the scroll duration (ms), e.g. '1000'"
  echo "--shape [shape]                                         Choose the button shape between square or circle, e.g. 'square'"
  echo "--icon [icon]                                           Define a custom UI Fabric icon display in to the button, e.g. 'ChevronUpSmall'"
  echo "--tenantSolutionDeployment [tenantSolutionDeployment]   Set 'true', to deploy the solution package to the whole tenant. If not specified, the package will be deployed to the current Site App Catalog"
  echo "--skipCustomAction [skipCustomAction]                   Don't enable the custom action to the target site"
  echo "--checkPoint [checkPoint]                               Check point from which to resume executing the setup script"
  echo "--appId [appId]                                         Product ID of the App from the App Catalog. Use only at checkpoint '200'"
  echo "--verbose [verbose]                                     Runs setup with verbose logging"
  echo
  echo "Example:"
  echo
  echo "  Deploy and enable Scroll To Top extension"
  echo "    ./setup.sh --siteUrl https://contoso.sharepoint.com"
  echo
}

msg() {
  printf -- "$1"
}
