<p align="center">
  <a href="https://www.laplateforme.com/">
    <img src="https://www.laplateforme.com/cms/i?o=%2Fsites%2Fdefault%2Ffiles%2F2017-04%2Flogo_pdb_bsl-1.jpg" alt="Pdb logo" width="200">
  </a>
</p>

# PDB REQUESTER

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

2. Edit your configuration file _`config.js`_ located at the root of your project

```JavaScript
const config = {};
...
config.requester = {
  docapost: {
    proxy: false,
    protocol: 'https'
  },
};
...
module.exports = config;
```

Make sure you have a _`requester`_ key in the exported object. Inside that requester you might want to define your services with _`proxy`_ and _`protocol`_ configuration you want to use for each one of them.

> ⚠️
> You also need to set an environment variable to define the proxy url: `http_proxy=http(s)://domain.name:port`

3. Import the module inside your code and just use it

```JavaScript
const requester = require('requester')('docapost');
requester.request(
  {
    host: 'www.google.com',
    method: 'GET'
  },
  (err, data) => {
    console.log('err', err);
    console.log('data', data);
  });
```

## How to contribute ?

1. Import the project from [github](https://github.com/Core-Techs-Git/pdb_requester)

```Shell
$ git clone git@github.com:Core-Techs-Git/pdb_requester.git
```

2. Install dependencies with `npm`

```Shell
$ npm i
```

That's it you're all setup and can start contributing :thumbsup:.

## Modules and techs used

[<img src="https://s.gravatar.com/avatar/3e2b342616822f8eabc9dd393840db4a?size=100&default=retro" width="100"/>](http://www.typescriptlang.org 'Typescript')&nbsp;&nbsp;&nbsp;&nbsp;
[<img src="https://eslint.org/assets/img/logo.svg" width="100"/>](https://eslint.org 'Eslint')&nbsp;&nbsp;&nbsp;&nbsp;
[<img src="https://avatars0.githubusercontent.com/u/11887183?s=200&v=4" width="100"/>](http://inversify.io/ 'Inversify')&nbsp;&nbsp;&nbsp;&nbsp;
[<img src="https://cdn.worldvectorlogo.com/logos/jest-0.svg" width="100"/>](https://jestjs.io 'Jest')&nbsp;&nbsp;&nbsp;&nbsp;
