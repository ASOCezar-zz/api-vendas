# Projeto

Este projeto se trata de um projeto para o anúncio e venda de produtos. Esse projeto possui implementações que permitem salvar uma imagem de perfil para o usuário, salvar uma imagem para o produto que está sendo vendido, criar uma conta e recuperar a conta através de um email, além do CRUD básico, tanto para produtos, quanto para clientes, assim como para ordens de compra.

# Stacks

A API foi desenvolvida utilizando Node.js com Typescript, TypeORM em conjunto com um banco de dados PostgreSQL hospedado utilizando Docker, Redis para sistema de cache e integração ao Amazon SES para envio de email em produção.

# Endpoints

## Usuário
- GET(/users) **Essa é uma rota privada** retorna todos os usuários cadastrados na aplicação, mantido por razões de prototipagem e testagem da API;

- POST(/users) Cria um usuário no banco de dados ao receber no corpo da requisição os seguintes dados:
	- name
	- email
	- password

- PATCH(/users/avatar) **Essa é uma rota privada** permite fazer o upload de uma foto para o usuário, deve ser enviado no corpo da requisição a foto que deseja manter como foto de perfil;

## Password

- POST(/password/forgot) recebe no corpo de requisição o email do usuário que se deseja fazer a recuperação da senha e envia o email de recuperação para a conta do usuário se este possuir um email cadastrado (infelizmente, o sistema com Amazon SES não está funcionando, certifique-se de utilizar o ethereal mail para que este funcione);

- POST(/password/reset) ao receber no corpo da requisição um token (o mesmo enviado pelo serviço de email), a senha e a confirmação da senha, esse serviço faz a troca da senha cadastrada;

## Sessão

- POST(/sessions) ao receber um email e senha que estejam corretamente cadastrados, esse serviço faz a criação de uma sessão de usuário através da utilização de um Token JWT.

## Perfil

- GET(/profile) **Essa é uma rota privada** faz uma busca dos dados do usuário logado e retorna em formato JSON;

- PUT(/profile) **Essa é uma rota privada** permite fazer alterações no perfil do usuário logado. Para alterações de senha com o usuário logado, são necessários os seguintes campos:
    - old_password (com a senha antiga cadastrada no banco de dados)
    - password (com a nova senha que deseja cadastrar)
    - confirm_password (com a confirmação da nova senha)

## Produtos

- GET(/products) retorna todos os produtos cadastrados no sistema;

- GET(/products/:id) busca o produto pelo id passado pelos parâmetros e retorna suas informações;

- POST(/products) cria um novo produto no banco de dados. Para que seja criado o produto é necessário que se envie no corpo da requisição:
	- name
	- price
	- quantity (com a quantidade disponível para venda)

- PATCH(/products/:id) permite cadastrar uma nova imagem para o produto com o id igual ao passado por parâmetro na rota de requisição;

- DELETE(/products/:id) exclui o produto do banco de dados.

## Clientes
- GET(/customers) retorna todos os clientes cadastrados na aplicação;

- GET(/customers/:id) retorna um cliente específico com o id igual ao passado por parâmetro na requisição;

- POST(/customers) Cria um cliente no banco de dados ao receber no corpo da requisição os seguintes dados:
	- name
	- email

- DELETE(/customers/:id) exclui o cliente com o id correspondente ao passado por parâmetro.

## Pedidos

- GET(/orders) **Essa é uma rota privada** busca todos os pedidos cadastrados de acordo com o usuário logado na aplicação;

- GET(/orders/:id) **Essa é uma rota privada** busca um pedido com o id correspondente ao passado por parâmetro na requisição (apenas se o pedido for do usuário que está logado);

- POST(/orders) **Essa é uma rota privada** cria um novo pedido ao passar as seguintes informações:
	- customer_id(com o id do usuário que deseja fazer a compra)
	- products(passando os produtos que se deseja adquirir, com id dos produtos e quantidades)
