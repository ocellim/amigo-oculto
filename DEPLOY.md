# 🚀 Deploy no Vercel

O projeto está pronto para deploy! Siga um dos métodos abaixo:

## Método 1: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta (GitHub, GitLab ou Email)
3. Clique em "Add New..." → "Project"
4. Importe este projeto:
   - Se o projeto estiver no GitHub: selecione o repositório
   - Se não: use "Import Git Repository" ou faça upload manual

5. Configure o projeto (as configurações já estão no `vercel.json`):
   - Framework Preset: Other
   - Build Command: (deixe vazio)
   - Output Directory: public
   - Install Command: npm install

6. Clique em "Deploy"
7. Aguarde alguns segundos e seu projeto estará no ar! 🎉

## Método 2: Via Terminal (se houver Vercel CLI instalado)

```bash
# Instale o Vercel CLI globalmente (se necessário)
npm install -g vercel

# Faça o deploy
vercel --prod
```

## Método 3: Conectar com GitHub

1. Crie um repositório no GitHub
2. Adicione o remote e faça push:
```bash
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```
3. No Vercel, importe o repositório do GitHub
4. Cada push na branch `main` fará deploy automático!

## ✅ Configurações já incluídas

- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.gitignore` - Arquivos ignorados
- ✅ URLs dinâmicas - Funciona em produção e local
- ✅ Servidor Express configurado

## 📝 Após o Deploy

Após o deploy, você receberá uma URL como:
- `https://amigo-oculto-xxxxx.vercel.app`

Use essa URL para acessar seu sistema de amigo oculto!

## ⚠️ Importante

⚠️ **AVISO**: Os sorteios ficam armazenados na memória do servidor.
- No Vercel, a memória é limpa quando a função serverless é reiniciada
- Para uso permanente, considere adicionar um banco de dados (MongoDB, PostgreSQL, etc.)
- Para uso temporário/eventos pontuais, funciona perfeitamente!

