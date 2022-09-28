## Descrição

- API simples para o sistema EasyMed

## Ferramentas necessárias

- node v16.17.0
- MySQL 80

## Passos para rodar

- Crie uma base de dados para o programa (qualquer nome)
- No arquivo `knexfile.js` substitua o valor da chave `database` pelo nome da sua base e de `user` pelo seu usuário
- Clonar repositório
- Criar na raiz do projeto um arquivo chamado `.env`
- Nesse arquivo crie as chaves:

```
MYSQL_PASSWORD="minhaSenhaPraBase"
JWT_SECRET="qualquerStringServe"
```

- Na primeira, coloque a senha para a sua base
- Na segunda, qualquer coisa serve para fins de teste
- Rodar o comando `npx knex migrate:latest` para rodar as migrations e criar as tabelas
- Caso esse comando falhe, verifique as credenciais da base e se ela está rodando
