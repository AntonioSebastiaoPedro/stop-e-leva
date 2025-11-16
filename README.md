# 🛒 **Stop & Leva** - Loja de Conveniência Online

> Uma plataforma moderna de e-commerce focada em praticidade e experiência do usuário, adaptada para o mercado angolano.

## 📋 **Visão Geral**

**Stop & Leva** é uma loja de conveniência online que oferece produtos essenciais com entrega rápida em Angola. A plataforma foi desenvolvida com foco na simplicidade, confiabilidade e uma experiência de usuário excepcional.

### ✨ **Características Principais**

- 🎨 **Design moderno** com animações suaves e efeitos visuais
- 📱 **Totalmente responsivo** para desktop, tablet e mobile
- 🛍️ **Carrinho de compras** funcional com persistência de dados
- 🔐 **Sistema de login** simulado com estado de usuário
- 🔍 **Busca e filtros** avançados para produtos
- 💰 **Preços em Kwanzas** adaptados ao mercado angolano
- 📧 **Formulários interativos** com validação e feedback visual

## 🏗️ **Estrutura do Projeto**

```
stop-e-leva/
├── index.html          # Página inicial
├── products.html       # Catálogo de produtos
├── product.html        # Detalhes do produto
├── cart.html          # Carrinho de compras
├── contact.html       # Formulário de contato
├── about.html         # Sobre a empresa
├── login.html         # Página de login
├── assets/
│   ├── css/
│   │   └── style.css  # Estilos principais
│   └── js/
│       ├── app.js     # Funcionalidades principais
│       └── data.js    # Dados dos produtos
└── README.md          # Este arquivo
```

## 🚀 **Funcionalidades Implementadas**

### 🏠 **Página Inicial (index.html)**
- Header com navegação sticky e efeito glass
- Banner hero com animações de parallax
- Categorias de produtos com hover effects
- Produtos em destaque com cards interativos
- Footer informativo com links úteis

### 🛍️ **Catálogo de Produtos (products.html)**
- Sistema de filtros por categoria, preço e promoções
- Barra de busca com ícone integrado
- Contador de resultados dinâmico
- Botão "Limpar filtros" para reset rápido
- Cards de produtos com efeitos 3D no hover

### 🔍 **Detalhes do Produto (product.html)**
- Imagem em destaque do produto
- Informações detalhadas e preços
- Seletor de quantidade
- Botão de adicionar ao carrinho

### 🛒 **Carrinho de Compras (cart.html)**
- Lista de produtos com imagens e preços
- Controle de quantidade individual
- Cálculo automático de totais
- Botão de finalização de compra
- Estado vazio personalizado com call-to-action

### 📞 **Contato (contact.html)**
- Formulário elegante com validação
- Feedback visual de envio
- Informações de contato locais (Angola)
- Mapa integrado do Google Maps

### 👤 **Login (login.html)**
- Formulário de autenticação limpo
- Opções de login social (Google/Facebook)
- Sistema "Lembrar-me"
- Feedback de loading e sucesso
- Integração com estado global da aplicação

### ℹ️ **Sobre (about.html)**
- História e missão da empresa
- Informações adaptadas para Angola
- Design consistente com o resto da plataforma

## 💎 **Design System**

### 🎨 **Paleta de Cores**
```css
--brand: #FF6B35      /* Laranja principal */
--accent: #FFD93D     /* Amarelo de destaque */
--action: #00C853     /* Verde para ações */
--text: #333333       /* Texto principal */
--bg: #FFFFFF         /* Fundo */
--muted: #F4F4F4      /* Cinza claro */
```

### 📝 **Tipografia**
- **Fonte principal**: Poppins (Google Fonts)
- **Pesos**: 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Hierarquia clara** com tamanhos responsivos

### 🎯 **Componentes UI**
- **Botões**: Gradientes, sombras e animações hover
- **Cards**: Efeitos de elevação e inclinação 3D
- **Formulários**: Estados de foco, erro e sucesso
- **Inputs**: Bordas suaves, transições e validação visual

## 💻 **Funcionalidades JavaScript**

### 🛒 **Gestão do Carrinho**
```javascript
// Adicionar produto ao carrinho
addToCart(product, quantity)

// Atualizar quantidade
setQty(id, newQuantity)

// Remover produto
removeFromCart(id)

// Persistência no localStorage
saveCart(cartData)
```

### 👤 **Sistema de Autenticação**
```javascript
// Login simulado
handleLoginForm()

// Gestão de estado do usuário
updateLoginState()

// Logout
clearUserSession()
```

### 🔍 **Busca e Filtros**
```javascript
// Filtros dinâmicos
applyFilters(category, promo, maxPrice, searchQuery)

// Contador de resultados
updateResultsCounter(count)

// Reset de filtros
clearAllFilters()
```

### ✨ **Efeitos Interativos**
```javascript
// Cards 3D com inclinação no hover
enableTiltCards()

// Parallax no hero
enableHeroParallax()

// Formulários com feedback visual
enhanceFormInputs()
```

## 📱 **Responsividade**

### 📊 **Breakpoints**
- **Desktop**: > 980px (layout completo)
- **Tablet**: ≤ 980px (adaptação de grid)
- **Mobile**: ≤ 768px (layout vertical)

### 🔧 **Adaptações Móveis**
- Menu de navegação otimizado
- Cards em grid responsivo (4→2→1 colunas)
- Formulários com padding reduzido
- Botões com área de toque adequada

## 💰 **Localização para Angola**

### 🏪 **Produtos**
12 produtos com imagens reais e preços em Kwanzas:
- **Bebidas**: Refrigerantes, Água, Energético, Café
- **Lanches**: Sanduíches, Chocolates
- **Snacks**: Biscoitos, Chips, Barras de cereal
- **Higiene**: Kits de viagem, Sabonetes
- **Outros**: Pilhas e utilitários

### 📍 **Informações Locais**
- **Endereço**: Luanda, Angola
- **Telefone**: (+244) 923 456 789
- **E-mail**: contato@stopeleva.co.ao
- **Moeda**: Kwanza (Kz)

## 🚀 **Como Executar**

### 📋 **Pré-requisitos**
- Navegador web moderno
- Servidor HTTP local (opcional)

### ⚡ **Execução Local**

1. **Clone ou baixe o projeto**
```bash
git clone [URL_DO_REPOSITORIO]
cd stop-e-leva
```

2. **Inicie um servidor local**
```bash
# Python 3
python3 -m http.server 8080

# Node.js (se tiver live-server instalado)
npx live-server

# PHP (se disponível)
php -S localhost:8080
```

3. **Abra no navegador**
```
http://localhost:8080
```

### 🌐 **Ou abra diretamente**
Você pode abrir o arquivo `index.html` diretamente no navegador, mas algumas funcionalidades podem ter limitações devido às políticas de CORS.

## 🎯 **Funcionalidades de Demonstração**

### 🛒 **Fluxo de Compras**
1. Navegue pelos produtos na página inicial
2. Use os filtros na página de produtos
3. Adicione itens ao carrinho
4. Visualize o carrinho e ajuste quantidades
5. Simule a finalização da compra

### 👤 **Sistema de Login**
1. Clique em "Login" no header
2. Preencha o formulário (qualquer email/senha)
3. Observe a mudança no header após login
4. Clique no nome do usuário para fazer logout

### 📧 **Formulário de Contato**
1. Acesse a página de contato
2. Preencha o formulário
3. Observe o feedback visual de envio
4. Veja a confirmação de sucesso

## 🛠️ **Tecnologias Utilizadas**

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, Variáveis CSS, Animações
- **JavaScript ES6+**: Modules, Arrow Functions, Classes
- **Google Fonts**: Poppins
- **Unsplash**: Imagens de produtos
- **LocalStorage**: Persistência de dados do carrinho

## 📈 **Performance e Otimizações**

### ⚡ **Carregamento**
- Fonts pré-carregadas com `preconnect`
- Imagens otimizadas via Unsplash
- CSS minificado e organizado
- JavaScript modular

### 🎨 **Animações**
- Suporte a `prefers-reduced-motion`
- Transições CSS otimizadas
- GPU-accelerated transforms
- Animações condicionais

### 📱 **Acessibilidade**
- Labels adequados em formulários
- Contraste de cores adequado
- Navegação por teclado
- Estrutura semântica

## 🔮 **Roadmap Futuro**

### 🚀 **Próximas Funcionalidades**
- [ ] Integração com API de pagamentos
- [ ] Sistema de avaliações de produtos
- [ ] Wishlist de produtos favoritos
- [ ] Sistema de cupons de desconto
- [ ] Notificações push
- [ ] Chat de suporte ao cliente
- [ ] Programa de fidelidade
- [ ] Multi-idiomas (Português/Inglês)

### 🔧 **Melhorias Técnicas**
- [ ] PWA (Progressive Web App)
- [ ] Service Workers para cache
- [ ] Lazy loading de imagens
- [ ] Compressão de assets
- [ ] CDN para assets estáticos

## 📄 **Licença**

Este projeto foi desenvolvido como demonstração de uma plataforma de e-commerce moderna. Todos os direitos reservados.

## 👥 **Contribuição**

Este é um projeto de demonstração. Para sugestões ou melhorias, entre em contato através dos canais disponíveis na página de contato.

---

### 📞 **Contato**
- **Website**: [Stop & Leva](http://localhost:8080)
- **E-mail**: contato@stopeleva.co.ao
- **WhatsApp**: (+244) 923 456 789
- **Endereço**: Luanda, Angola

---

**Stop & Leva** - *Praticidade a um clique* 🚀