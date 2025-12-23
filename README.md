# 🎁 Sistema de Amigo Oculto Compartilhado

Sistema simples para realizar sorteio de amigo oculto onde todos veem o mesmo resultado.

## 📋 Funcionalidades

- ✅ Cadastro de participantes
- ✅ Sorteio automático garantindo que ninguém tire a si mesmo
- ✅ **Sorteio único compartilhado** - todos que acessam veem o mesmo resultado
- ✅ **Persistência em memória** - o sorteio fica salvo até alguém resetar
- ✅ **Botão de Reset** - fazer um novo sorteio quando quiser
- ✅ Interface simples e intuitiva
- ✅ Sem necessidade de login
- ✅ Atualização automática - se alguém fizer o sorteio, todos veem

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

O servidor iniciará em: http://localhost:3000

### 3. Fazer o sorteio

1. Acesse http://localhost:3000 no navegador
2. Adicione os nomes dos participantes
3. Clique em "Realizar Sorteio"
4. **Todos veem o resultado completo!** 🎉

### 4. Compartilhar

Compartilhe o link http://localhost:3000 com todos - qualquer pessoa que acessar verá o mesmo sorteio!

### 5. Fazer novo sorteio

Quando quiser fazer um novo sorteio, clique no botão "🔄 Novo Sorteio" no topo da página.

## 🛠️ Tecnologias

- Node.js
- Express.js
- HTML/CSS/JavaScript puro

## ⚠️ Observações

- **Sorteio único compartilhado**: Todos que acessam o site veem o mesmo resultado
- Os dados ficam armazenados na memória do servidor até alguém clicar em "Reset"
- Se o servidor for reiniciado, o sorteio será perdido
- Não há autenticação - qualquer pessoa pode acessar e ver o resultado
- Qualquer pessoa pode resetar o sorteio clicando no botão "Novo Sorteio"
- Ideal para grupos pequenos e em ambientes confiáveis

## 📝 Licença

Livre para uso pessoal

