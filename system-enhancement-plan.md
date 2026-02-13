# Plano de Aprimoramento do Sistema - Agendify (FocusFlow)

## 📋 Visão Geral
Este plano visa transformar o protótipo atual do **Agendify** em uma aplicação robusta, segura e de alto desempenho, seguindo as diretrizes dos agentes especialistas. O foco inicial será a transição de dados mockados para integração real com Supabase, correção de gargalos de desempenho e refinamento da UI/UX.

---

## 🏗️ Tipo de Projeto: WEB (React + Vite)
**Agente Principal:** `frontend-specialist`
**Suporte:** `backend-specialist`, `security-auditor`, `project-planner`

---

## 🎯 Critérios de Sucesso
- [ ] **Integração Supabase**: Dados persistidos e autenticação real funcionando.
- [ ] **Performance Audit**: Lighthouse score > 90 em Performance e Acessibilidade.
- [ ] **Segurança**: Zero vulnerabilidades críticas no `security_scan.py`.
- [ ] **UX Pro**: Implementação de micro-interações e animações de revelação.

---

## 🚀 Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Bundled via PostCSS)
- **Database/Auth:** Supabase
- **State Management:** TanStack Query (Server State) + Zustand (UI State)
- **Animações:** Framer Motion (para micro-interações)

---

## 📂 Estrutura de Arquivos Proposta
```plaintext
src/
├── components/       # Componentes reutilizáveis (Atomic Design)
├── hooks/            # Custom hooks (ex: useEvents, useAuth)
├── services/         # Camada de repositório (Supabase Clients)
├── store/            # Zustand for UI state
├── pages/            # Telas principais (já existentes, a serem refatoradas)
└── utils/            # Formatters, constants, helpers
```

---

## 📝 Cronograma e Etapas

### Fase 1: Fundação & Segurança (P0)
**Foco:** Infraestrutura e proteção de dados.

| ID | Nome da Tarefa | Agente | Skills | Prioridade | Dependências |
|---|---|---|---|---|---|
| T1.1 | Configurar Supabase Client | `backend-specialist` | `database-design` | P0 | Nenhuma |
| T1.2 | Implementar Autenticação Real | `security-auditor` | `vulnerability-scanner` | P0 | T1.1 |
| T1.3 | Refatorar `App.tsx` (Service Layer) | `backend-specialist` | `clean-code` | P0 | T1.1 |

**INPUT:** `supabase_schema.sql` → **OUTPUT:** `src/services/supabase.ts` + `useAuth` hook → **VERIFY:** Login real persiste sessão.

### Fase 2: Performance & Build (P1)
**Foco:** Otimização para produção.

| ID | Nome da Tarefa | Agente | Skills | Prioridade | Dependências |
|---|---|---|---|---|---|
| T2.1 | Migrar Tailwind CDN para PostCSS | `frontend-specialist` | `react-best-practices` | P1 | Nenhuma |
| T2.2 | Implementar `TanStack Query` | `frontend-specialist` | `performance-profiling` | P1 | T1.3 |

**INPUT:** `index.html` → **OUTPUT:** `package.json` atualizado com scripts de build → **VERIFY:** `npm run build` gera bundle otimizado.

### Fase 3: UX/UI Pro Max (P2)
**Foco:** Refinamento estético e acessibilidade.

| ID | Nome da Tarefa | Agente | Skills | Prioridade | Dependências |
|---|---|---|---|---|---|
| T3.1 | Auditoria de Acessibilidade (Labels/Aria) | `frontend-specialist` | `web-design-guidelines` | P2 | Nenhuma |
| T3.2 | Micro-interações e Animações | `frontend-specialist` | `frontend-design` | P2 | Nenhuma |

**INPUT:** `ux_audit.py` report → **OUTPUT:** Componentes com labels e `framer-motion` → **VERIFY:** `ux_audit.py` passa sem erros críticos.

---

## ⚠️ Desafios e Soluções

| Desafio | Possível Impacto | Solução |
|---|---|---|
| **Migração de Estado** | Quebra de lógica em componentes filhos | Implementar Zustand gradualmente, começando pela navegação. |
| **Latência do DB** | UI travada durante fetch | Usar `Suspense` e `Loading Skeletons` (Diretriz `frontend-specialist`). |
| **Complexidade Auth** | Erros de RLS (Row Level Security) | Testar políticas no Supabase Dashboard antes de aplicar no código. |

---

## ✅ PHASE X: Verificação Final
- [ ] `python .agent/scripts/verify_all.py .`
- [ ] `npm run build`
- [ ] No purple hex codes in CSS.
- [ ] All inputs have semantic labels.

## ✅ PHASE X COMPLETE
- Lint: [ ]
- Security: [ ]
- Build: [ ]
- Date: 
