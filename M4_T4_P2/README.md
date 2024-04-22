# Práctica M4_T4_P2
Para esta práctica entrarán en juego diferentes partes. La aplicación tendrás tecnologías como Ganache, Truffle, Node.js, Angular y se dividirá en tres elementos: 
<ul>
  <li>Una red blockchain en local</li>
  <li>Un backend que hará de servidor / API</li>
  <li>Un frontend desde el que lanzar las consultas</li>
</ul>  

### Índice
<ul>
  <li>
    <a href="#ganache">Ganache</a>
  </li>
  <li>
    <a href="#truffle">Truffle</a>
  </li>
  <li>
    <a href="#back-end">Back End</a>
  </li>
  <li>
    <a href="#front-end">Front End</a>
  </li>
</ul>

## Ganache
Lo primero que haremos será instalar [Ganache](https://archive.trufflesuite.com/ganache) en nuestro ordenador y crear un proyecto Ethereum que lo llamaremos Tokio.

<div align="center">
  <img src="./img/ganache.png">
</div>

## Truffle
Lo siguiente será instalar la suite de Truffle con `npm install -g truffle`. Para comprobar que se ha instalado correctamente ejecutaremos `truffle version`.

<div align="center">
  <img src="./img/truffle_version.png">
</div>

## Back End
Creamos una carpeta **/backend** y dentro de la carpeta ejecutamos en la consola `npm init`, iremos aceptando todo hasta que se cree los archivos *package.json* y *package-lock.json*. Justamente después de esto ejecutaremos `truffle init` para iniciar un nuevo proyecto de Truffle. Además, también tendremos que instalar las librerías Express y Web3.js con `npm install express web3`.  

Con lo anterior ya hecho, crearemos un fichero *index.js* donde pondremos nuestro servidor. Debería quedar una estructura así:
- /backend
  - /build
  - /contracts
  - /migrations
  - index.js
  - package-lock.json
  - package.json
  - truffle-config.json
  
### Servidor Express

Foto de codigo servidor

Explicacion endpoints

GET /messages

## Front End