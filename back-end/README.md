3 tabelas 

    Login/user
    Projetos
    Tarefas

Criação de tabela com relação com usuário
então, 1 usuário pode ter vários projetos
Crud, projeto tera uma coluna name e updated e created at

Criação de tabela tarefa que tem relação com projeto, então, 1 projeto pode ter várias tarefas, Titulo, descrição, data de vencimento e status (Enum) - Pendente, progresso ou concluida
Crud


## end-points 

      POST/Login
      GET/projects
      POST/Projects
      PUT/Projects/:id
      DELETE projects/:id
      GET projects/:id/projects
      POST tasks // para criar uma task em um projeto 
      PUT tasks/:id editar uma tarefa
      DELETE tasks/id
      PATCH /tasks/:status rota para atualizar o status de uma tarefa
