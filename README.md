# 🏗️ Site Rogerio Alves - Construtor

Site profissional para o construtor Rogerio Alves, especialista em construção civil com mais de 30 anos de experiência em Marília/SP.

## 📋 Sobre o Projeto

Este é um site moderno e responsivo desenvolvido para apresentar os serviços de construção civil do Rogerio Alves. O site possui design profissional, otimizado para SEO e com foco na conversão de visitantes em clientes.

### 🎯 Características Principais

- **Design Responsivo**: Adaptado para todos os dispositivos (desktop, tablet, mobile)
- **SEO Otimizado**: Meta tags, structured data e otimizações para mecanismos de busca
- **Performance**: Carregamento rápido com lazy loading e otimizações
- **Acessibilidade**: Navegação por teclado e suporte a leitores de tela
- **Interatividade**: Carrossel de projetos, modal para fotos e animações suaves

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter para melhor legibilidade

## 📁 Estrutura do Projeto

```
projeto-pai/
├── index.html              # Página principal
├── style.css              # Estilos CSS
├── script.js              # JavaScript funcionalidades
├── capacete.png           # Logo/Favicon
├── image.png              # Foto do construtor
├── serviços/              # Pasta com imagens dos projetos
│   ├── antes_casa.jpg
│   ├── depois_jacuse.jpg
│   ├── fiação_arrumada.jpg
│   └── ... (outras imagens)
└── README.md              # Este arquivo
```

## 🛠️ Funcionalidades

### 🏠 Seções do Site

1. **Hero Section**: Apresentação principal com estatísticas e call-to-actions
2. **Sobre**: Biografia e experiência do construtor
3. **Serviços**: Cards com os serviços oferecidos
4. **Projetos**: Galeria interativa com carrossel
5. **Contato**: Formulário de contato e informações

### ⚡ Funcionalidades JavaScript

- **Menu Mobile**: Navegação responsiva com hambúrguer menu
- **Carrossel de Projetos**: Navegação automática e manual
- **Modal de Fotos**: Visualização ampliada das imagens
- **Smooth Scrolling**: Navegação suave entre seções
- **Formulário de Contato**: Integração com FormSubmit
- **Lazy Loading**: Carregamento otimizado de imagens
- **Animações**: Efeitos de entrada e interação

### 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch Support**: Suporte completo para gestos touch
- **Orientação**: Detecção de mudanças de orientação

## 🎨 Design e UX

### 🎯 Paleta de Cores
- **Primária**: #843E00 (Marrom construtor)
- **Secundária**: #FFD699 (Dourado)
- **Neutras**: #333, #fafafa, #fff

### 📐 Layout
- **Container**: Max-width 1200px
- **Grid System**: CSS Grid e Flexbox
- **Espaçamentos**: Sistema consistente de margens e paddings

## 🚀 Como Usar

### 📥 Instalação Local

1. **Clone ou baixe o projeto**
```bash
git clone [url-do-repositorio]
cd projeto-pai
```

2. **Abra o arquivo index.html**
```bash
# Usando Python (se instalado)
python -m http.server 8000

# Ou simplesmente abra index.html no navegador
```

3. **Acesse no navegador**
```
http://localhost:8000
```

### 🌐 Deploy

O site pode ser facilmente hospedado em:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Qualquer serviço de hospedagem estática**

## 📧 Configuração do Formulário

O formulário de contato está configurado para usar o **FormSubmit**:

```html
<form action="https://formsubmit.co/SEU_EMAIL" method="POST">
```

Para configurar:
1. Substitua `SEU_EMAIL` pelo seu endereço de email
2. Configure as opções do FormSubmit conforme necessário

## 🖼️ Galeria de Projetos

A pasta `serviços/` contém todas as imagens dos projetos realizados:

### 📸 Tipos de Projetos
- **Construção de Jacuse**: Antes e depois
- **Reforma de Casa**: Telhado, corredor e portão
- **Portão de Aço**: Instalação completa
- **Reforma de Corredor**: Acabamentos
- **Reforma de Telhado**: Com telas de alumínio
- **Instalação Elétrica**: Fiação organizada

### 🎯 Estrutura das Imagens
- `antes_*.jpg`: Fotos do estado inicial
- `depois_*.jpg`: Fotos do resultado final
- `*_meio_*.jpg`: Fotos do processo (quando aplicável)

## 📱 Recursos Mobile

- **Menu Hambúrguer**: Navegação otimizada para mobile
- **Touch Gestures**: Suporte a swipe no carrossel
- **Responsive Images**: Imagens otimizadas para cada dispositivo
- **Fast Loading**: Carregamento rápido em conexões lentas

## 🔧 Personalização

### 🎨 Alterar Cores
Edite as variáveis CSS no arquivo `style.css`:

```css
:root {
  --primary-color: #843E00;
  --secondary-color: #FFD699;
  --text-color: #333;
}
```

### 📝 Alterar Conteúdo
- **Textos**: Edite diretamente no `index.html`
- **Imagens**: Substitua as imagens na pasta `serviços/`
- **Contatos**: Atualize telefone e email no HTML

### ⚙️ Configurações JavaScript
Principais configurações no `script.js`:

```javascript
// Tempo do autoplay do carrossel (em ms)
this.autoPlayDelay = 5000;

// Configurações de animação
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
```

## 📊 SEO e Performance

### 🔍 Otimizações SEO
- **Meta Tags**: Title, description, keywords
- **Open Graph**: Para redes sociais
- **Structured Data**: Schema.org para negócios locais
- **Canonical URL**: Para evitar conteúdo duplicado

### ⚡ Performance
- **Lazy Loading**: Carregamento sob demanda das imagens
- **Minificação**: CSS e JS otimizados
- **Compressão**: Imagens otimizadas
- **Caching**: Headers apropriados

## 🛡️ Segurança

- **Formulário**: Proteção contra spam com honeypot
- **HTTPS**: Recomendado para produção
- **Validação**: Validação client-side e server-side

## 📞 Contato e Suporte

### 👷‍♂️ Construtor
- **Nome**: Rogerio Alves
- **Telefone**: (14) 99703-5509
- **Email**: rogerioconstrutor.rr@gmail.com
- **Localização**: Marília/SP

### 👨‍💻 Desenvolvedor
- **Nome**: Felipe Alves
- **Instagram**: [@dev.felipinho](https://www.instagram.com/dev.felipinho/)

## 📄 Licença

Este projeto é propriedade do Rogerio Alves - Construtor. Todos os direitos reservados.

## 🔄 Atualizações Futuras

### 🚀 Próximas Funcionalidades
- [ ] Sistema de blog para notícias
- [ ] Calculadora de orçamento online
- [ ] Chat ao vivo
- [ ] Integração com Google Maps
- [ ] Testimonials de clientes
- [ ] Sistema de agendamento

### 🐛 Correções Conhecidas
- Nenhuma correção pendente no momento

---

**Desenvolvido com ❤️ para Rogerio Alves - Construtor**

*Site profissional, moderno e otimizado para conversão de clientes.*
