# 📌 Tasks API - CRUD com Node.js

API simples desenvolvida em Node.js puro para gerenciamento de tarefas, com operações completas de CRUD e importação em massa via CSV.

---

## 🚀 Funcionalidades

- ✅ Criar tarefa
- 📄 Listar tarefas
- 🔍 Filtrar por título e descrição
- ✏️ Atualizar tarefa
- 🗑️ Deletar tarefa
- ✔️ Marcar tarefa como concluída
- 📥 Importar tarefas via arquivo CSV

---

## 🧱 Estrutura da Tarefa

Cada tarefa possui:

- `id` → identificador único
- `title` → título da tarefa
- `description` → descrição
- `completed_at` → data de conclusão (ou `null`)
- `created_at` → data de criação
- `updated_at` → data de atualização

---

## ⚙️ Tecnologias

- Node.js (sem framework)
- ES Modules
- csv-parse (para importação de CSV)

---

## ▶️ Como executar

```bash
npm install
node src/server.js