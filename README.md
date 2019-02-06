# react-admin-panel

> Adaptive login form with Users list, Profile page, Login and Registration forms 

> Supports social login (VK)



---

## Table of Contents


- [Installation](#installation)
- [Requiremets](#requirements)
- [Installation](#installation)
- [Features](#features)
- [License](#license)

---






## Requirements

- [Install NodeJS](https://nodejs.org/en/) 

- [NPM](https://www.npmjs.com/get-npm)

- Ubuntu 16.04 LTS

### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/react-admin-panel.git`

## Installation

> update 

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```

> now install packages

```shell
$ sudo apt install curl
```
For latest release:
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
```
For LTS release:
```
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
```
Then proceed with:
```  
$ sudo apt install nodejs
$ git clone https://github.com/iivanovw7/react-admin-panel.git
$ cd react-admin-panel
$ npm install
$ npm run build
$ node server.js 
```

> expected output should look like this:

```terminal
Listening on port 4787
dbRoot: mongodb://XXXXXXXXX:XXXXXXXX@ds211865.mlab.com:XXXXXXX/react-admin-panel
Connected


```
> if so, you can open browser tab: `http://localhost:4787/`




---



## Features

> Frontend: ReactJS + Redux, SASS, JWT token authentication

> Backend: NodeJS, Express, MongoDB, Mongoose  

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">react-admin-panel</a>


