# ADF

Aprovação de Documentos do ERP via Fluig

### Instalação

Requer [Node.js](https://nodejs.org/) v4+.

Instale as dependências e inicie

As alterações serão assistidas e o código atualizado será gerado no diretório de projeto no Eclipse (adf)

```sh
$ npm install
$ npm start
```

Para ambiente de produção...

```sh
$ npm run build
```

Para ambiente de produção assistido...

```sh
$ npm run build:watch
```

No Eclipse, selecione a raiz deste projeto como workspace e crie um novo projeto com o nome adf.

### Manutenção

Formulários, datasets e widgets devem ser alterados no diretório src (scripts em ES6, compilados via babel). 

Scripts do processo devem ser alterados diretamente no diretório do projeto: adf/workflow/scripts (scripts em ES5).

    - TODO: Trazer scripts do processo para o diretório src e montar task no gulp para atualização no diretório do projeto

O diagrama deve ser editado pelo Eclipse

Para uso de partials nos datasets utilizar /*$$ path/do/partial.js $$*/. Ex.: /*$$ partials/callDatasul.js $$*/

### Exportação

Para exportar em ambiente de cliente, utilizar o script npm run build OU npm run build:watch

Todas as exportações devem ser feitas pelo Eclipse

    - TODO: Criar tasks para exportações via GULP

