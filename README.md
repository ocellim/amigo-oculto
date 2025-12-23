# 🎁 Sistema de Amigo Oculto

Sistema simples para realizar sorteio de amigo oculto com links individuais.

## 📋 Funcionalidades

- ✅ Cadastro de participantes
- ✅ Sorteio automático garantindo que ninguém tire a si mesmo
- ✅ **Sorteio único persistido** - um sorteio por vez mantido em memória
- ✅ **Links individuais** - cada pessoa recebe um link único
- ✅ **Privacidade** - cada pessoa vê apenas quem ELA tirou
- ✅ **Botão de Reset** - fazer um novo sorteio quando quiser
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
4. **Copie e compartilhe cada link** com a respectiva pessoa 🎉

### 4. Ver resultado

Cada pessoa acessa seu link individual e vê apenas quem ELA tirou (privacidade garantida!)

### 5. Fazer novo sorteio

Para fazer um novo sorteio:
- Acesse http://localhost:3000
- Clique no botão "🔄 Novo Sorteio"
- Refaça o processo

## 🛠️ Tecnologias

- Node.js
- Express.js
- HTML/CSS/JavaScript puro

## ⚠️ Observações

- **Sorteio único**: Apenas um sorteio ativo por vez
- **Privacidade**: Cada pessoa vê apenas quem ela tirou através de seu link individual
- Os dados ficam armazenados na memória do servidor até alguém clicar em "Reset"
- Se o servidor for reiniciado, o sorteio será perdido
- Não há autenticação - qualquer pessoa com o link pode ver seu resultado
- Qualquer pessoa que acessa a página principal pode resetar o sorteio
- **Importante**: Guarde os links! Se perdê-los, terá que resetar e fazer novo sorteio
- Ideal para grupos pequenos e em ambientes confiáveis

## 📝 Licença

Livre para uso pessoal

