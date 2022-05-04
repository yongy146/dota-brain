# About dota-brain

This repository contains the core knowledge of Dota Coach, which is used in the following resources:
  - App (https://www.overwolf.com/app/dota-coach.com-Dota_Coach)
  - Website (https://www.dota-coach.com)
  - Steam Guides (https://steamcommunity.com/id/DotaCoachApp/myworkshopfiles/?section=guides)

These are the key files:
  - heroBuilds.ts: Ability and items builds, combos, and counter itmes
  - messages.ts: Notifications and coaching tips for own as well as enemy heroes
  - disables.ts: Disables of all heroes
  - dispellableBuffs.ts: Dispellalbe buffs of all heroes

# Can I contribute?

Yes, absolutely! Our aim is to provide users the best possible Dota 2 paying experience so any improvement is welcome.

# How can I contribute?

The best way to contribute is to provide input to this repository.

The can be done as follows:
How to contribute using GitHub.com:

Create a fork of the dota-brain repository:
  - Go to the the repository page (https://github.com/dota-coach/dota-brain)
  - Click on "Fork" in the top-right corner and then on "Create fork"

Edit the documents:
  - Select document you want to edit
  - Click on pencil to edit document
  - Make changes to document
  - Then click on "Commit changes"

Create pull-request to send changes:
  - Go to section "Pull requests"
  - Then click on "New pull request"
  - Review your changes and then click on "Create pull request"
  - Describe the change you made
  - Then click on "Create pull request"

# Can I also use the command line tool git?

Yes, more advanced users will use git (https://git-scm.com/docs/git). Alternatively you can also work with GitHub Desktop and also most IDEs can directly integrate with GitHub.

## Update repository (task before you do any change)

in your dota2 directory execute the following commands:

- git checkout main
- git pull
- git checkout <your branch>
- git merge main

All commands need to be executed in your git directory.

## Save changes (task after you completed your changes)

git commit -m "<comment the updates you did>" -a
git push

Create pull request with GitHub.com.
