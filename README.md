![](https://github.com/hyperledger/burrow/raw/develop/docs/assets/images/burrow.png)
# Hyperledger Burrow 
> A simple application using the [Hyperledger Burrow](https://www.hyperledger.org/projects/hyperledger-burrow)
> This application stores data in the blockchain and retrives it.
> Repository of the Hyperleger Burrow : [Github](https://github.com/hyperledger/burrow)

This Repository consists of **3 indevidual applications** :
  - A Hyperledger Burrow server
  - A middleware server
  - Angular UI for interaction with the server

| Application | Folder Name | Details |
| ------ | ------| ------ |
| Hyperledger Burrow Server | [hyperledger-burrow](link-to-folder) | This is the Blockchain server which stores the final data |
| Middleware Server | [monax-middleware-server](link-to-folder) | A middleware server written in ExpressJS, using [@monax/burrow](https://www.npmjs.com/package/@monax/burrow) library |
| Angular UI | [burrow-ui](link-to-folder) | A front-end application built with [Angular](https://angular.io) version 7 |

# What does it do?
> The **UI** takes some input informations (form data) and sends them to the **middleware server**.
> The **middleware server** stores the data in the **Hyperledger Burrow** blockchain.
> The **UI** asks for the input data to the **middleware server**, the **middleware server** then fetches the data from the **Hyperledger Burrow** blockchain and sends it back to the **UI**.

# How to start
Requirements:
  - [Go 1.11](https://golang.org/) or higher
  -  - See [here](https://github.com/hyperledger/burrow/blob/develop/docs/INSTALL.md) for installation instruction
  -  Install **Solidity** binary package
  -  - See [here](https://solidity.readthedocs.io/en/v0.5.3/installing-solidity.html) for installation instruction
  -  [NodeJS](https://nodejs.org/en/) verion 8 or higher
  -  [Angular CLI](https://angular.io/guide/quickstart) if you want to modify the UI
  -  - The server is aslo written in Typescript, you can install [typescript](https://www.npmjs.com/package/typescript) package to modify **index.ts** file of the server or you can simply use the **index.js** file.

> **Hyperledger Burrow Server**
> Start the blockchain server

All files that are needed is present in the *hyperledger-burrow* folder, but you will have to setup the nodes and deploy the contract. 
 -  See [here](https://github.com/hyperledger/burrow/blob/develop/docs/quickstart/single-full-node.md) to setup a single full node
 -  See [here](https://github.com/hyperledger/burrow/blob/develop/docs/quickstart/deploy-contracts.md) to deploy contract

Then run the following command:
```sh
cd hyperledger-burrow
sh init_burrow.sh
```

> **Middleware Server**
> Start the middleware server in a separate terminal
```sh
cd monax-middleware-server
npm install
node index.js
```

# UI
> Host the contents of [burrow-ui/dist/burrow-ui](link-to-folder) on a webserver

If you have [Python](https://python.org) installed:
 - Version 2.7+
```sh
cd burrow-ui/dist/burrow-ui
python -m SimpleHTTPServer 8080
```
 - Version 3.5+
```sh
cd burrow-ui/dist/burrow-ui
python -m http.server 8080
```
| Version | Command |
| ------ | ------|
| 2.7+ | python -m SimpleHTTPServer 8080 |
| 3.5+ | python -m http.server 8080

**Now visit: *[localhost:8080](localhost:8080)* to use the application**.