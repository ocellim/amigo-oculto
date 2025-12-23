# 🎁 Sistema de Amigo Oculto

Sistema simples para realizar sorteios de amigo oculto e compartilhar links individuais com cada participante.

## 📋 Funcionalidades

- ✅ Cadastro de participantes
- ✅ Sorteio automático garantindo que ninguém tire a si mesmo
- ✅ Geração de links únicos para cada pessoa
- ✅ Interface simples e intuitiva
- ✅ Sem necessidade de login

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
4. Copie e compartilhe cada link com a respectiva pessoa

### 4. Ver resultado

Cada pessoa deve acessar o link único que você compartilhou para ver quem tirou no amigo oculto.

## 🛠️ Tecnologias

- Node.js
- Express.js
- HTML/CSS/JavaScript puro

## ⚠️ Observações

- Os dados ficam armazenados na memória do servidor
- Se o servidor for reiniciado, os sorteios anteriores serão perdidos
- Não há autenticação - qualquer pessoa com o link pode ver o resultado
- Para uso temporário e em ambientes confiáveis

## 📝 Licença

Livre para uso pessoal

