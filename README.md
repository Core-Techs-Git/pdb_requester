<p align="center">
  <a href="https://www.laplateforme.com/">
    <img src="https://www.laplateforme.com/cms/i?o=%2Fsites%2Fdefault%2Ffiles%2F2017-04%2Flogo_pdb_bsl-1.jpg" alt="Pdb logo" width="200">
  </a>
</p>

# PDB REQUESTER

[![Latest tag](https://img.shields.io/github/v/tag/Core-Techs-Git/pdb_requester?color=f87a15)](https://github.com/Core-Techs-Git/pdb_requester/tags)
![Commit since latest release](https://img.shields.io/github/commits-since/Core-Techs-Git/pdb_requester/latest?color=f87a15&sort=semver)

[![Built with TypeScript](https://img.shields.io/npm/v/typescript?color=007ACC&label=Typescript&logo=typescript)](https://github.com/microsoft/TypeScript)
[![Tested with Jest](https://img.shields.io/npm/v/jest?color=C21325&label=Jest&logo=jest)](https://github.com/facebook/jest)
[![Code Style Eslint](https://img.shields.io/npm/v/eslint?color=4B32C3&label=Eslint&logo=eslint)](https://github.com/eslint/eslint)
[![Code Style Prettier](https://img.shields.io/npm/v/prettier?color=F7B93E&label=Prettier&logo=prettier)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Part of the **[La Plateform du bâtiment](https://www.laplateforme.com/)** environment, this module is responsible for the management of the requests made to external services via a proxy (or not, according to the configuration).

## Features

Below are the features offered by **pdb_requester**:

- [x] HTTP/HTTPS requests
- [x] Requests over proxy

## How to use it ?

1. Install with `npm`

```Shell
$ npm i -S @core-techs-git/pdb_requester
```

> ⚠️
> To install this way you need to have configured `npm` to use `github package registry`. To know more you may follow [this link](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry).

<details>
  <summary>Or you can follow this quick setup</summary>
  <ul>
    <li>
      <p>Set a scoped registry access</p>
      <pre>$ npm config set @core-techs-git:registry https://npm.pkg.github.com/core-techs-git</pre>
    </li>
    <li>
      <p>Set authentication information inside your .npmrc file</p>
      <pre>//npm.pkg.github.com/:_authToken=PERSONAL-ACCESS-TOKEN</pre>
    </li>
  </ul>
  <p><b><i><a href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line">PERSONAL-ACCESS-TOKEN</a></i></b> is generated in github settings.</p>
</details>

You may want to install from github url:

```Shell
$ npm i -S Core-Techs-Git/pdb_requester.git[#<commit-ish>]
```

2. Edit your configuration file _`config/dev.js`_ located at the root of your project. [config](https://github.com/lorenwest/node-config) module is used to load the right environment configurations.

```JavaScript
const config = {};
...
config.search = {
  protocol: 'https',
  host: 'search.io',
  path: '/hashcontent/orwhateveryoulike',
  defaultStoreUid: 1,
  proxy: false,    // true if requests must go through the proxy.
};
...
// An other possible config that will take advantage of baseUrl
config.bills = {
  protocol: 'https',
  host:'bills.com',
  path: 'hashcontent/', // Can be omitted
  proxy: true,
};
module.exports = config;
```

Make sure you have a _`proxy`_ key inside each top level service key in the exported object, so you may configure the proxy access.

> ⚠️
> You also need to set an environment variable to define the proxy url: `http_proxy=http(s)://host.name:port`

3. Import the module inside your code and just use it (remember that _`requester`_ is a little wrapper arround the module [Request](https://github.com/request/request))

```JavaScript
const requester = require('requester')('search');
requester.get(
  // Same parameters as node native http or https module
  // However you can pass a key "body":<string> to send in the request
  {
    url: config.search.url,
  },
  // Callback
  (err, response, body) => {
    console.log('err', err);
    console.log('response', response);
    console.log('body', body);
  });
...
const request = require('requester')('bills');
request('', // sub path like /anotherpath?with=params can be pass
(err, response, body) => {
  console.log('err', err);
  console.log('response', response);
  console.log('body', body);
});
```

## How to contribute ?

1. Import the project from [github](https://github.com/Core-Techs-Git/pdb_requester)

```Shell
$ git clone git@github.com:Core-Techs-Git/pdb_requester.git
```

2. Install dependencies with `npm`

```Shell
$ npm ci
```

3. Make sure you have read the guidelines for contributing to the project [here](https://github.com/Core-Techs-Git/pdb_requester/blob/master/CONTRIBUTING.md).

That's it you're all setup and can start contributing :thumbsup:.
