// remember to use 'node:...' in front of every package from node
// GET, POST, PUT, PATCH, DELETE
// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end
// Stateful (salva na memoria) - Stateless (náo salva nada em memoria, salva em BD ou arquivo de texto)
// JSON - JavaScript Object Notation
// Cabeçalhos (Requisição/resposta) => Metadados
// HTTP Status Code

// 3 ways to send information to the back-end:
// Query Parameters: URL Stateful => Filters, pagination, not obligatory
// http://localhost:3333/users?userId=1&name=Rodrigo (using query parameters)

// Route Parameters: Resource identification
// GET http://localhost:3333/users/1 (using route parameters)
// DELETE http://localhost:3333/users/1

// Request Body: To send form information, sensitive information like passwords (using HTTPS)
// POST http://localhost:3333/users/

import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups };

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);

// CommonJS => require
// ESModules => import/export
