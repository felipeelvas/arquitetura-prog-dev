# Arquitetura de Programação — Projeto da aula

Exercício de acesso a um banco MySQL usando Node.js, Sequelize e o padrão DAO para consultar e cadastrar produtos.

## O que foi feito

- Instaladas as dependências `sequelize` e `mysql2`.
- Configurado o projeto para usar módulos ES (`"type": "module"`).
- Criada a conexão Sequelize em `db.js`, apontando para o banco `loja_node`, no host `127.0.0.1`, com o usuário `root`.
- Definida a entidade `produto` em `model-produto.js`, com os campos:
  - `codigo`: inteiro sem sinal, chave primária, auto incremento e obrigatório.
  - `nome`: texto obrigatório.
  - `quantidade`: inteiro opcional.
- Desativados os campos automáticos `createdAt` e `updatedAt` (`timestamps: false`).
- Criado `produto-dao.js` com operações para listar todos os produtos (`obterTodos`), consultar por chave primária (`obterProduto`) e cadastrar (`criarProduto`).
- Executada e validada a listagem dos produtos existentes no banco.

## Requisitos

- Node.js e npm.
- MySQL em execução no endereço `127.0.0.1`.
- Banco de dados `loja_node`, usuário `root` e tabela `produtos` com as colunas `codigo`, `nome` e `quantidade`.

O Sequelize não cria nem altera a tabela automaticamente neste projeto.

## Instalação e configuração

Na pasta do projeto, instale as dependências:

```powershell
npm install
```

Defina a senha do MySQL na variável de ambiente `DB_PASSWORD`. No PowerShell, pode-se solicitá-la sem exibi-la:

```powershell
$senha = Read-Host "Senha do MySQL" -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new('', $senha).Password
Remove-Variable senha
```

`db.js` lê essa variável e informa um erro se ela não estiver definida. A senha não deve ser adicionada ao código nem enviada ao Git.

## Consultar produtos

Com o MySQL em execução e `DB_PASSWORD` definido no terminal:

```powershell
node --input-type=module -e 'import { obterTodos } from "./produto-dao.js"; import db from "./db.js"; try { const produtos = await obterTodos(); console.log(JSON.stringify(produtos, null, 2)); } catch (erro) { console.error("Erro ao consultar produtos:", erro); process.exitCode = 1; } finally { await db.close(); }'
```

A consulta foi executada com sucesso e retornou:

```json
[
  {
    "codigo": 1,
    "nome": "Laranja",
    "quantidade": 500
  },
  {
    "codigo": 2,
    "nome": "Banana",
    "quantidade": 1000
  }
]
```

O Sequelize também exibe no console o SQL executado. `obterTodos` é assíncrona e devolve uma Promise; por isso, o exemplo aguarda o resultado antes de imprimi-lo e fecha a conexão ao terminar.
