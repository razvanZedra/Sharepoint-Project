#!/usr/bin/env bash

# helper functions
. ./_functions.sh

# String used for write-host indication mostly
solutionName="Scroll To Top"

# default args values
siteUrl=
scrollDuration=null
icon=""
shape=""
tenantSolutionDeployment=false
verbose=false
skipCustomAction=false
checkPoint=0
appId=

# script arguments
while [ $# -gt 0 ]; do
  case $1 in
    -s|--siteUrl)
      shift
      siteUrl=$1
      ;;
    --scrollDuration)
      shift
      scrollDuration=$1
      ;;
    --icon)
      shift
      icon=$1
      ;;
    --shape)
      shift
      shape=$1
      ;;
    --tenantSolutionDeployment)
      tenantSolutionDeployment=true
      ;;
    --skipCustomAction)
      skipCustomAction=true
      ;;
    --checkPoint)
      shift
      checkPoint=$1
      ;;
    --appId)
      shift
      appId=$1
      ;;
    --verbose)
      verbose=true
      ;;
    -h|--help)
      help
      exit
      ;;
    *)
      error "Invalid argument $1"
      exit 1
  esac
  shift
done

if [ -z "$siteUrl" ]; then
  error "Please specify site collection URL"
  echo
  help
  exit 1
fi

if [ "$tenantSolutionDeployment" = true ]; then
  # First, find the Tenant App Catalog
  msg "Retrieving tenant app catalog URL...\n"

  appCatalogUrl=$(o365 spo tenant appcatalogurl get)
  if [ -z "$appCatalogUrl" ]; then
    error "Couldn't retrieve Tenant App Catalog"
    exit 1
  fi
  if [ "$verbose" = true ]; then
    msg "Tenant App Catalog was find.\n"
  fi

  msg "Deploying the $solutionName Package to the Tenant AppCatalog...\n"

  if (( $checkPoint < 100 )); then
    # Push package to the Tenant AppCatalog
    if [ "$verbose" = true ]; then
      msg "Adding the $solutionName Package to the Tenant AppCatalog...\n"
    fi
    appId=$(o365 spo app add --filePath ./scrollToTop.sppkg)

    if [ "$verbose" = true ]; then
      msg "App ID: $appId...\n"
    fi

    checkPoint=100
  fi
  if (( $checkPoint < 200 )); then
    # Deploy solution from the Tenant AppCatalog
    if [ "$verbose" = true ]; then
      msg "Deploying the $solutionName Package...\n"
    fi
    o365 spo app deploy --name scrollToTop.sppkg --skipFeatureDeployment

    checkPoint=200
  fi
  if (( $checkPoint < 300 )); then
    # Install solution to site collection
    if [ "$verbose" = true ]; then
      msg "Installing the $solutionName Package with ID: $appId...\n"
    fi
    o365 spo app install --id $appId --siteUrl $siteUrl

    checkPoint=300
  fi
else
  if (( $checkPoint < 100 )); then
    msg "Deploying the $solutionName Package to the Site AppCatalog...\n"
    # Push package to the site AppCatalog
    if [ "$verbose" = true ]; then
      msg "Adding the $solutionName Package to the Site AppCatalog $siteUrl...\n"
    fi
    appId=$(o365 spo app add --filePath ./scrollToTop.sppkg --scope sitecollection --appCatalogUrl $siteUrl)

    if [ "$verbose" = true ]; then
      msg "App ID: $appId...\n"
    fi
    
    checkPoint=100
  fi
  if (( $checkPoint < 200 )); then
    # Deploy solution from the site AppCatalog
    if [ "$verbose" = true ]; then
      msg "Deploying the $solutionName Package...\n"
    fi
    o365 spo app deploy --name scrollToTop.sppkg --scope sitecollection --appCatalogUrl $siteUrl

    checkPoint=200
  fi
  if (( $checkPoint < 300 )); then
    # Install solution to site collection
    if [ "$verbose" = true ]; then
      msg "Installing the $solutionName Package with ID : $appId...\n"
    fi
    o365 spo app install --id $appId --siteUrl $siteUrl --scope sitecollection

    checkPoint=300
  fi
fi

if [ "$skipCustomAction" = false ]; then
  msg "Enabling the $solutionName extension...\n"

  # Build SPFx extension propreties
  str="'{"
  str="$str\"scrollDuration\":$scrollDuration"
  str="$str,\"buttonIcon\":\"$icon\""
  str="$str,\"shape\":\"$shape\""
  str="$str}'"

  if [ "$verbose" = true ]; then
    msg "SPFx properties: $str\n"
  fi

  o365 spo customaction add --url $siteUrl --clientSideComponentId ba2540fe-8c92-4b95-99fb-04b074c82b13 --name "$solutionName" --title "$solutionName" --location 'ClientSideExtension.ApplicationCustomizer' --scope Site -p $str
fi
