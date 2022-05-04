# How to use git?

test test test test
We strongly recommend you to use the git command line tool (https://git-scm.com/docs/git).

In the past we had issues with GitHub Desktop and therefore do not recommend to use it.

## Downloading repository

1. create dotacoach directory on your filesystem
2. download repository: git clone https://github.com/dota-coach/dota-brain.git
3. create own brach: 'git branch <your name>' (you need to be in the dota2 directory for it to work)

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
