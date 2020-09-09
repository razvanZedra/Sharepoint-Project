## Scroll To Top

A SharePoint Framework extension that allow users to scroll to the top of page by clicking a button

![](assets/LsOnline-SPFx-ScrollToTop.gif)

### Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/SPFx-1.10.0-success.svg)

## Applies to

* [SharePoint Framework][1]
* [Office 365 tenant][2]

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

To build manually the package, please make sure you have the prerequisites like illustrated to the [Set up your SharePoint Framework development environment][3] article and follow the next steps:

* clone this repo
* in the command line run:
  * `npm i`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* deploy the package to your **Tenant App Catalog** or **Site Collection App Catalog**
* add the web part to a page

## Customize your install

Some properties can be defined to manage the default behavior / UI of the extension. For more information, see [setup documentation](setup.md)

## Debug URL for testing

Here's a debug URL for testing around this sample.

```
&loadSPFX=true&customActions={"ba2540fe-8c92-4b95-99fb-04b074c82b13":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"scrollDuration":null,"buttonIcon":"ChevronUpSmall","shape":"square"}}}
```

## Features

This project contains SharePoint Framework extensions that illustrates next features:

* ApplicationCustomizer
* Can be deploy in to the whole Tenant
* Add a button at the bottom of all of pages of the site collection
* On click, the content page will scroll to the top

[1]: https://dev.office.com/sharepoint
[2]: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant
[3]: https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment