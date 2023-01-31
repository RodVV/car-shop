
  Nste projeto, foram aplicados os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos. Foi feito utilizando o banco de dados `MongoDB` e typescript.
  
  Projeto feito pela metodologia TDD de implementacao de testes.






  Subir o banco do MongoDB usando Docker:
  

  Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker, é só seguir os passos a seguir:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-container> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```


 Rodando no Docker 

  > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
  - A partir daqui você pode rodar o container `car_shop` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it car_shop bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  



Passos do projeto:

 01 - Criar a interface `IModel` genérica

 02 - Criar a interface `IVehicle` genérica

 03 - Criar a interface `ICar` a partir da interface `IVehicle`
 
 04 - Rota para o endpoint `/cars` onde seja possível cadastrar um novo carro

 05 - Rota para o endpoint `/cars` onde seja possível listar todos os carros registrados

 06 - Rota para o endpoint `/cars/id` onde seja possível listar um único carro através do seu id

 07 - Rota para o endpoint `/cars/id`, onde é possível atualizar o registro de um carro através do seu id

 08 - Rota para o endpoint `/cars/id` para excluir os registros de um carro

