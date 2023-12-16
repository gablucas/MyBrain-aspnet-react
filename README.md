# MyBrain (Em desenvolvimento)

## Sobre
MyBrain é uma aplicação full stack utilizada para criar listas de tarefas.

## Como utilizar
O projeto possui duas pastas principais (webapi para o backend) e (reactapp para o frontend)

### webapi
- Abrir esta pasta com Visual Studio e baixar todas dependências
- A connectionString se encontra no arquivo <b>appsettings.json</b>
- Executar a aplicação
  - dotnet run

## Oracle
Para criar as tabelas no banco, importar o arquivo <b>MYBRAIN.sql</b> que se encontra na pasta raiz da aplicação.

### reactapp
- Abrir esta pasta com Visual Studio Code e baixar todas dependências
- Para alterar a URL da api basta editar a propriedade <b>baseURL</b> no arquivo <b>config.js</b> na pasta <b>Axios</b>
- Executar a aplicação
  - npm run dev 

## Tecnologias utilizadas
- C#
- .NET
- ASP.NET
- Dapper
- Oracle
- React
- Axios
