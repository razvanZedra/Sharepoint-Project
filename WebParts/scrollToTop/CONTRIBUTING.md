# Contribution guidelines

The issue board and merge requests are managed from the GitLab reporistory: https://gitlab.lsonline.fr/SharePoint/sp-dev-fx-webparts/scrollToTop

Before you submit your first MR, please read the following guide. It would be a shame to see you work on something that someone else is already working on, something that we agreed not to do or something that doesn't match the project.

## You've found a bug
...

## Fixing typos
...

## Tips

Before contributing:

- ensure that the **dev** branch on your fork is in sync with the original **ScrollToTop** repository

    ```sh
    # assuming you are in the folder of your locally cloned fork....
    git checkout dev

    # link remote repository with yours
    git remote add upstream https://gitlab.lsonline.fr/SharePoint/sp-dev-fx-webparts/scrollToTop.git

    # assuming you have a remote named `upstream` pointing to the official **Go-Provisioning** repo
    git fetch upstream

    # update your local dev to be a mirror of what's in the main repo
    git pull --rebase upstream dev
    ```

> **Note:** if you have an error that said the repository not found, please reset all of your saved credentials from your operating system and signin again with your account.

- create a feature branch for your change. If you'll get stuck on an issue or merging your MR will take a while, this will allow you to have a clean dev branch that you can use for contributing other changes
    ```sh
    git checkout -b my-contribution
    ```

## DO's & DON'Ts

* **DO** follow the same project and test structure as the existing project.
* **DO** keep discussions focused. When a new or related topic comes up it's often better to create new issue than to side track the conversation.
* **DO** from Visual Studio Code, perform a code format before submit your MR.
* **DO NOT** submit MR's for coding style changes.
* **DO NOT** surprise the overviewer with big MR's. Instead file an issue & start a discussion so we can agree on a direction before you invest a large amount of time.