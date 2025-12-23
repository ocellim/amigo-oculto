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

// Armazenamento em memória
const sorteios = {};

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

// Rota para criar um novo sorteio
app.post('/api/sortear', (req, res) => {
  const { pessoas } = req.body;
  
  if (!pessoas || pessoas.length < 2) {
    return res.status(400).json({ erro: 'É necessário pelo menos 2 pessoas' });
  }
  
  try {
    const sorteados = realizarSorteio(pessoas);
    const sorteioId = uuidv4();
    
    // Criar tokens únicos para cada pessoa
    const participantes = pessoas.map((pessoa, index) => {
      const token = uuidv4();
      return {
        nome: pessoa,
        tirou: sorteados[index],
        token: token
      };
    });
    
    sorteios[sorteioId] = {
      participantes: participantes,
      dataCriacao: new Date()
    };
    
    // Retornar os links
    const baseUrl = getBaseUrl(req);
    const links = participantes.map(p => ({
      nome: p.nome,
      link: `${baseUrl}/revelar.html?token=${p.token}&sorteio=${sorteioId}`
    }));
    
    res.json({ 
      sucesso: true,
      sorteioId: sorteioId,
      links: links
    });
    
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Rota para revelar quem a pessoa tirou
app.get('/api/revelar', (req, res) => {
  const { token, sorteio } = req.query;
  
  if (!token || !sorteio) {
    return res.status(400).json({ erro: 'Token e sorteio são obrigatórios' });
  }
  
  const sorteioData = sorteios[sorteio];
  
  if (!sorteioData) {
    return res.status(404).json({ erro: 'Sorteio não encontrado' });
  }
  
  const participante = sorteioData.participantes.find(p => p.token === token);
  
  if (!participante) {
    return res.status(404).json({ erro: 'Participante não encontrado' });
  }
  
  res.json({
    nome: participante.nome,
    tirou: participante.tirou
  });
});

app.listen(PORT, () => {
  console.log(`🎁 Servidor rodando em http://localhost:${PORT}`);
});

