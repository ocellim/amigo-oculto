const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// URL base - usa VERCEL_URL em produção ou localhost em desenvolvimento
const getBaseUrl = (req) => {
  // Se estiver no Vercel, usa o host da requisição
  if (process.env.VERCEL) {
    return `https://${req.get('host')}`;
  }
  // Em desenvolvimento local
  return `http://localhost:${PORT}`;
};

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Armazenamento em memória - SORTEIO ÚNICO GLOBAL
let sorteioGlobal = {
  pessoas: [],
  participantes: [], // Array com {nome, tirou, token}
  dataCriacao: null
};

// Rota raiz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Função para embaralhar array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Função para fazer o sorteio garantindo que ninguém tire a si mesmo
function realizarSorteio(pessoas) {
  let tentativas = 0;
  const maxTentativas = 100;
  
  while (tentativas < maxTentativas) {
    const embaralhado = shuffle(pessoas);
    let valido = true;
    
    for (let i = 0; i < pessoas.length; i++) {
      if (pessoas[i] === embaralhado[i]) {
        valido = false;
        break;
      }
    }
    
    if (valido) {
      return embaralhado;
    }
    
    tentativas++;
  }
  
  throw new Error('Não foi possível realizar o sorteio');
}

// Rota para verificar se existe sorteio
app.get('/api/sorteio', (req, res) => {
  res.json({
    existe: sorteioGlobal.pessoas.length > 0,
    pessoas: sorteioGlobal.pessoas,
    dataCriacao: sorteioGlobal.dataCriacao
  });
});

// Rota para criar/atualizar o sorteio único
app.post('/api/sortear', (req, res) => {
  const { pessoas } = req.body;
  
  if (!pessoas || pessoas.length < 2) {
    return res.status(400).json({ erro: 'É necessário pelo menos 2 pessoas' });
  }
  
  try {
    const sorteados = realizarSorteio(pessoas);
    
    // Criar tokens únicos para cada pessoa
    const participantes = pessoas.map((pessoa, index) => {
      const token = uuidv4();
      return {
        nome: pessoa,
        tirou: sorteados[index],
        token: token
      };
    });
    
    // Atualizar sorteio global
    sorteioGlobal = {
      pessoas: pessoas,
      participantes: participantes,
      dataCriacao: new Date()
    };
    
    // Retornar os links
    const baseUrl = getBaseUrl(req);
    const links = participantes.map(p => ({
      nome: p.nome,
      link: `${baseUrl}/revelar.html?token=${p.token}`
    }));
    
    res.json({ 
      sucesso: true,
      links: links
    });
    
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Rota para revelar quem a pessoa tirou
app.get('/api/revelar', (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ erro: 'Token é obrigatório' });
  }
  
  if (sorteioGlobal.participantes.length === 0) {
    return res.status(404).json({ erro: 'Nenhum sorteio foi realizado ainda' });
  }
  
  const participante = sorteioGlobal.participantes.find(p => p.token === token);
  
  if (!participante) {
    return res.status(404).json({ erro: 'Token inválido' });
  }
  
  res.json({
    nome: participante.nome,
    tirou: participante.tirou
  });
});

// Rota para resetar o sorteio
app.post('/api/reset', (req, res) => {
  sorteioGlobal = {
    pessoas: [],
    participantes: [],
    dataCriacao: null
  };
  
  res.json({ 
    sucesso: true,
    mensagem: 'Sorteio resetado com sucesso'
  });
});


// Exportar o app para o Vercel
module.exports = app;

// Iniciar servidor apenas em desenvolvimento local (não no Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🎁 Servidor rodando em http://localhost:${PORT}`);
  });
}

