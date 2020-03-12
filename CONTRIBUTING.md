<p align="center">
  <a href="https://www.laplateforme.com/">
    <img src="https://www.laplateforme.com/cms/i?o=%2Fsites%2Fdefault%2Ffiles%2F2017-04%2Flogo_pdb_bsl-1.jpg" alt="Pdb logo" width="200">
  </a>
</p>

# Contributing to PDB REQUESTER

:+1::tada: First off all, thank you for joining the team :tada::+1:

The following is a set of guidelines for contributing to the module pdb_requester. These are mostly guidelines, not rules but it would be better if we all try to follow them. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code guideline

### Coding rules

To keep the code base readable we use [eslint](https://eslint.org/) and [prettier](https://prettier.io/) to check and format the code. For the stability [jest](https://jestjs.io/) is our best friend since every feature is tested with it and the coverage requirements are:
| Criteria | Threshold |
| -------- | ----------- |
| Branches | 95% |
| Functions | 95% |
| Lines | 95% |
| Statements | 95% |

### Documentation

As of the code documentation, only src folder code is documented. How everything that's not obvious must be documented and all exported modules must be documented. We use [typedoc](https://typedoc.org/) to generate html documentations which are available in the repository [wiki](https://github.com/Core-Techs-Git/pdb_requester/wiki).

## Git workflow

We adopt [git branching model](https://nvie.com/posts/a-successful-git-branching-model/) introduced by Vincent Driessen with slight modifications to help simplify our development and release process.

### Branch naming

Like the git branching model we have two main branches (master and develop) and three groups of supporting branches (feature, release and hotfix). Here is how and why we use them:

- **master**: is always stable and production-ready. It contains the last release version of source code in production which means that tags are made from this branch.
- **develop**: derives from master and is use to integrate features planned for an upcoming release. Therefore it's less stable than master.
- **feature/\***: derives from develop and is use to implement new feature (by the way everything should be treated as a feature) so you should have a lot of these. When your feature is done you can merge squash it back into develop, make a pull request for that.

- **release/x.y.0**: derives from develop and is used to start a new release. The version name _x.y.0_ follow [semver](https://semver.org/) specification. When the release is ready it is merge squash into master with a pull request. To preserve modifications made in release branch we merge squash it back into develop branch using this git command

  ```Shell
  $ git checkout develop
  $ git merge -s recursive -X theirs --squash release/x.y.0
  $ git push origin develop
  ```

- **hotfix/x.y.z**: derives from master and is used to fix a bug found in latest release. When the bug is fix the branch is merge squash back into master with a pull request. To preserve modifications made in hotfix branch we merge squash it into develop branch using this git command

  ```Shell
  $ git checkout develop
  $ git merge -s recursive -X theirs --squash hotfix/x.y.z
  $ git push origin develop
  ```

### Commit messages

We use the use the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/) to guide our commit messages structure. On top of this convention we use the [commintlint package](https://commitlint.js.org/#/) to enforce its application so we can automaticaly generate the [CHANGELOG.md](https://github.com/Core-Techs-Git/pdb_requester/blob/master/CHANGELOG.md).
For us a valid commit message should:

- Follow the pattern
  ```plaintext
  type(scope?)?: subject (R-ticket)?
  body?
  footer?
  ```
- Limit the header line to 72 characters or less
- Capitalize the subject line
- Use the imperative, present tense
- Have an emoji as `type` in the header. Here is the list of allowed emoji

  | Emoji | Description                                                                           |
  | ----- | ------------------------------------------------------------------------------------- |
  | 🎬    | First commit (should be used only once)                                               |
  | 🎉    | New release                                                                           |
  | 📦    | Anything related to the package build                                                 |
  | 👷    | Anything related to continous integration or deployment                               |
  | 📚    | When editing documentation                                                            |
  | 🧪    | Changes that affect code tests                                                        |
  | 🐛    | Fixing a bug                                                                          |
  | 🧩    | Adding new feature                                                                    |
  | 💄    | Modification affecting user interface and experience                                  |
  | ⚡    | Improving performance                                                                 |
  | 🔒    | Improving security                                                                    |
  | 🔊    | Anything related to logging and monitoring                                            |
  | 🔗    | Changes related to dependencies                                                       |
  | ♻️    | Changes that neither fixes a bug nor adds a feature, just a refactoring               |
  | 🎨    | when change file structure or architecture                                            |
  | 🚧    | Work in progress                                                                      |
  | ⏳    | When reverting a change (use the same header as reverted commit & add its id in body) |
  | 📜    | Changes made to licence                                                               |
  | 👥    | Adding a contributer                                                                  |

- The `scope` is optional and should be one of these options

  | Scope   | Description                             |
  | ------- | --------------------------------------- |
  | core    | Changes that doesn't impact end users   |
  | error   | Changes related to errors handling      |
  | model   | Change to the models used in the module |
  | service | Change related to provided services     |

- If specify, the `ticket` must refere to a redmine issue.

### Pull request guideline and labels

When merging a pull request, the merged branch is always squash to the orther branch. Every pull requests must be labeled accordingly using these labels

| Category | Label       | Description                                                                       |
| -------- | ----------- | --------------------------------------------------------------------------------- |
| Priority | High        | Indicate pull requests that affect all releases and need to be deployed soon      |
| Priority | Low         | Indicates pull requests that don't affect any release code                        |
| Priority | Medium      | Indicates pull requests that need to be deployed with the next release            |
| Status   | Abandoned   | Indicates pull requests that are no longer needed                                 |
| Status   | Accepted    | Indicates validated pull requests                                                 |
| Status   | Blocked     | Indicates pull requests that can't be resolved or pursued for now                 |
| Status   | Completed   | Indicates that work on pull requests is finished                                  |
| Status   | In progress | Indicates pull requests which are still being worked on, more changes will follow |
| Type     | Bug         | Indicates an unexpected problem or unintended behavior in production source code  |
| Type     | Duplicate   | Indicates similar issues or pull requests                                         |
| Type     | Feature     | Indicates new feature pull requests                                               |
| Type     | Enhancement | Indicates improvement pull requests                                               |
| Type     | Question    | Indicates that issues or pull requests needs more information                     |
