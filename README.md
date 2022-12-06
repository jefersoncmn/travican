<h1 align="center">Travican</h1>
<p align="center">Servidor do projeto para matéria de Técnologia em Desenvovimento de Sistemas</p>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre](#sobre)
   * [Tecnologias](#tecnologias)
   * [Pre Requisitos](#pré-requisitos)
   * [Autores](#autores)
<!--te-->

### Sobre
<div align="center">
	<p>Em desenvolvimento</p>
	<p>Esse projeto é um coletor de dados de empresas utilizando APIs. Seu objetivo é a coleta, organização e armazenamento dos contatos das empresas coletadas.</p>
</div>


### Tecnologias

No projeto será aplicado:
- JavaScript
- TypeScript
- Angular (FrontEnd)
- Node (BackEnd)
- MongoDB (Banco de dados)


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:<br>
- [Git](https://git-scm.com)<br>
- [VSCode](https://code.visualstudio.com/) ou algum outro programa para realizar a edição de código.<br>
- [Node](https://nodejs.org/)<br>
- [Yarn](https://classic.yarnpkg.com/)<br>

- [Firebird](https://firebirdsql.org/)<br>Versão 4.0.2

Cria projeto:
``yarn init -y``

Instala o Typescript:
``yarn add typescript``

Cria o documento de configuração de compilação do Typescript:
``yarn tsc --init``

Adiciona o pacote Express:
``yarn add express``

Adicionar as tipagens do express:
``yarn add @types/express -D``

Adiciona o pacote Bbody-parserody-parser:
``yarn add body-parser``

Adiciona o pacote Cors:
``yarn add cors``

Adiciona o pacote Mongoose para uso do MongoDB:
``yarn add mongoose``

Dependecias que fazem a conversão do typescript pra javascript(tsc), execução(node) e observação do codigo(nodemon):
``yarn add ts-node-dev -D``

Adicione o ``"dev":"ts-node-dev --respawn src/server.ts"`` na parte ``scripts`` da pasta ``package.json``.

Adiciona o pacote do Firebird:
``yarn add node-firebird``

Para fazer o uso do Firebird é preciso alterar tais trechos do arquivo ``firebird.conf``.
``AuthServer = Srp256, Srp, Legacy_Auth``
``WireCrypt = Disabled``
``UserManager = Legacy_UserManager``
``AuthClient = Srp256, Srp, Win_Sspi, Legacy_Auth #Windows clients``
Depois reiniciar o serviço Firebird.

Para executar o projeto:
``yarn dev``

<h2 align="center">Autores</h2>

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/jefersoncmn"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/51566081?v=4" width="100px;" alt=""/><br/><sub><b>Jeferson Martin</b></sub></a><br /><a href="https://github.com/jefersoncmn" title="Jeferson Martin"></a>
    </td>
</table>
	
## Contatos

:mailbox: [jefersoncmn@hotmail.com](jefersoncmn@hotmail.com)

<div align="justify">

[<img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>](https://www.linkedin.com/in/jefcmn/)
[<img alt="Instagram" src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/>](https://www.instagram.com/jefersoncmn/)
[<img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white"/>](mailto:jefersoncmnn@gmail.com)
