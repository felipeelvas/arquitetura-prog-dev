import { Sequelize } from 'sequelize';

const password = process.env.DB_PASSWORD;

if (!password) {
  throw new Error('Defina a variável de ambiente DB_PASSWORD antes de iniciar a aplicação.');
}

const sequelize = new Sequelize('loja_node', 'root', password, {
  dialect: 'mysql',
  host: '127.0.0.1',
  });

export default sequelize;
