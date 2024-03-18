# Sistema de Finanças Safeguard

## Visão Geral

O Sistema de Finanças Safeguard é um sistema de gerenciamento de transações financeiras que prioriza a segurança da informação. Desenvolvido para simular operações típicas de uma instituição financeira, o projeto destaca-se pela implementação de práticas avançadas de segurança, garantindo a proteção dos dados sensíveis dos usuários.

## Estrutura do Projeto

```
safeguard-finance-system
├── src
│   ├── api
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   └── index.js
│   ├── config
│   │   ├── auth.js
│   │   ├── database.js
│   │   ├── security.js
│   │   └── securityMiddleware.js
│   ├── services
│   │   ├── authenticationService.js
│   │   ├── encryptionService.js
│   │   ├── securityLogService.js
│   │   └── transactionService.js
│   └── index.js
├── tests
│   ├── penetrationTests
│   │   ├── sqlInjection.test.js
│   │   ├── xss.test.js
│   │   └── sessionTheft.test.js
│   └── unitTests
│       ├── authenticationService.test.js
│       ├── encryptionService.test.js
│       ├── transactionService.test.js
│       └── securityLogService.test.js
├── .gitignore
├── package.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .env
```

## Configuração do Ambiente

1. **Git:**

   - Configure o Git e adicione o repositório remoto:

     ```bash
     git init
     git add .
     git commit -m "chore: configuração inicial do projeto"
     git remote add origin <url-do-repositorio-no-git>
     git push -u origin master
     ```

2. **Variáveis de Ambiente:**

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

     ```
     JWT_SECRET=segredo_jwt
     ENCRYPTION_KEY=chave_de_criptografia
     ```

## Dependências

O projeto utiliza diversas dependências para garantir a segurança e funcionamento adequado. Certifique-se de instalar todas as dependências executando o comando:

```bash
npm install
```

## Scripts Úteis

- **Iniciar o Servidor:**

  ```bash
  npm start
  ```

- **Executar Testes Unitários:**

  ```bash
  npm test
  ```

- **Executar Testes de Penetração:**

  ```bash
  npm run penetration-test
  ```

## Proteções Implementadas

1. **Autenticação e Autorização:**

   - Utilização de OAuth e JWT para autenticação segura.
   - Controle de acesso aos endpoints da API.

2. **Testes de Penetração:**

   - Simulação de ataques de segurança para identificar vulnerabilidades.

3. **Criptografia de Dados:**

   - Proteção de informações sensíveis, como dados de transações.

4. **Práticas de Segurança Recomendadas:**

   - Prevenção contra SQL Injection, Cross-Site Scripting (XSS) e outros ataques comuns.

5. **Conformidade com Regulamentações:**

   - Adesão a padrões como PCI DSS e GDPR.

6. **Integração com Framework de Segurança Web (Helmet):**

   - Melhoria da segurança da aplicação web através de políticas HTTP.

7. **Módulo de Log de Segurança:**
   - Registro de eventos significativos relacionados à segurança.

## Simulação de Ataques

- Para simular ataques de segurança, utilize os testes de penetração fornecidos em `tests/penetrationTests`.
- Certifique-se de entender completamente as implicações antes de realizar simulações em ambientes de produção.

## Contribuição

Sinta-se à vontade para contribuir! Consulte as [diretrizes de contribuição](CONTRIBUTING.md).

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
