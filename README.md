# VivaFit - README Técnico

Este documento fornece uma visão geral técnica do protótipo do aplicativo VivaFit, seu estado atual e os próximos passos.

## Visão Geral do Projeto

O VivaFit é uma aplicação completa de saúde e bem-estar projetada para ajudar os usuários na perda de peso e na adoção de um estilo de vida mais saudável. O protótipo foi construído usando Next.js, React, Tailwind CSS e componentes de UI da ShadCN.

### Tecnologias Principais

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Estilização:** Tailwind CSS, ShadCN UI
- **IA Generativa:** Genkit para o AI Coach
- **Autenticação e Banco de Dados (Simulados):** A lógica de autenticação e banco de dados está atualmente simulada usando `sessionStorage` e arquivos JSON locais para permitir o desenvolvimento rápido da UI.

---

## Checklist de Desenvolvimento

### Funcionalidades Implementadas (UI e Simulação)

- [x] **Fluxo de Autenticação:** Páginas de login, criação de conta e recuperação de senha. A autenticação é simulada via `sessionStorage`.
- [x] **Onboarding de Usuário:** Um fluxo de várias etapas para coletar informações básicas do usuário e definir metas iniciais.
- [x] **Dashboard Principal:** Painel central com resumo das atividades diárias e semanais, tendências de peso e energia.
- [x] **Navegação Completa:** Layouts de barra lateral para o painel do usuário e para o painel administrativo.
- [x] **Gerenciamento de Conta:** Seção onde os usuários podem gerenciar perfil, assinatura (simulada), pagamentos (simulados) e configurações.
- [x] **Páginas de Conteúdo:**
  - [x] **Treinos:** Listagem e página de detalhes dos vídeos de treino.
  - [x] **Premium Hub:** Página de conteúdo exclusivo para assinantes (com bloqueio para não-assinantes).
  - [x] **Depoimentos:** Galeria de histórias de sucesso de usuários.
- [x] **AI Coach:** Interface de chat funcional conectada a um fluxo Genkit para conselhos de saúde.
- [x] **Painel Administrativo:**
  - [x] Dashboard com estatísticas (mock).
  - [x] Gerenciamento de usuários, conteúdo (treinos, receitas, artigos), anúncios e finanças (com dados mock).
  - [x] Página de configurações para integrações de serviços.
- [x] **Ajuste de Logo e Layout:** A logo foi ajustada para caber corretamente nos cabeçalhos e o contraste do layout foi melhorado.

### Funcionalidades Pendentes e Próximos Passos

A principal prioridade é substituir os dados simulados por uma integração real com o Firebase.

- [ ] **Integração com Firebase:**
    - [ ] **Firestore:** Substituir todos os dados mock (arquivos `.json` em `/src/lib/firebase/seed-data`) por chamadas reais ao Firestore para treinos, usuários, artigos, etc.
    - [ ] **Firebase Authentication:** Implementar o provedor de autenticação real do Firebase para substituir a simulação com `sessionStorage`.
    - [ ] **Cloud Functions / Backend:** Criar funções de backend para lidar com lógica de negócios, como processamento de pagamentos e gerenciamento de assinaturas.

- [ ] **Lógica de Backend:**
    - [ ] **Pagamentos:** Integrar com um gateway de pagamento (ex: PagSeguro, Stripe) para gerenciar assinaturas Premium.
    - [ ] **Anúncios:** Implementar a lógica para exibir anúncios do AdSense e AdMob para usuários gratuitos.
    - [ ] **Notificações:** Configurar um sistema de notificações (ex: via Firebase Cloud Messaging).

- [ ] **Refinamento de Funcionalidades:**
    - [ ] Conectar os formulários do painel administrativo para efetivamente criar, editar e deletar conteúdo no banco de dados.
    - [ ] Desenvolver a lógica do "Planejador Semanal IA" na página Premium.

---

## Como Acessar o Painel Administrativo

O painel administrativo é onde todo o conteúdo e os usuários são gerenciados.

- **Link de Acesso:** [**`/admin/dashboard`**](/admin/dashboard)

Para acessar, navegue diretamente para o URL acima. Atualmente, o acesso não é restrito por autenticação, mas isso deve ser implementado junto com a integração do Firebase Auth, atribuindo uma "role" de administrador a usuários específicos.
