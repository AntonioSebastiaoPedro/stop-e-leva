const qs=(s,el=document)=>el.querySelector(s);const qsa=(s,el=document)=>[...el.querySelectorAll(s)];
const currency = v => v.toLocaleString('pt-AO',{style:'currency',currency:'AOA'}).replace('AOA','Kz');

const CART_KEY='se_cart_v1';
const loadCart=()=>{try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]}};
const saveCart=(c)=>localStorage.setItem(CART_KEY,JSON.stringify(c));
let cart=loadCart();

const updateCartCount=()=>{
  const count=cart.reduce((a,i)=>a+i.qty,0);
  const el=qs('#cartCount');
  if(el) el.textContent=String(count);
};

const addToCart=(product,qty=1)=>{
  const existing=cart.find(i=>i.id===product.id);
  if(existing){existing.qty+=qty}else{cart.push({id:product.id,name:product.name,price:product.price,image:product.image,qty})}
  saveCart(cart);updateCartCount();
  
  // Show feedback toast
  showToast(`✅ ${product.name} adicionado ao carrinho!`, 'success');
};

// Toast notification system
const showToast = (message, type = 'info') => {
  // Remove existing toast
  const existingToast = qs('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.add('toast--show');
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('toast--show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
};

const removeFromCart=(id)=>{cart=cart.filter(i=>i.id!==id);saveCart(cart);updateCartCount()};
const setQty=(id,qty)=>{const it=cart.find(i=>i.id===id);if(!it)return;if(qty<=0){removeFromCart(id)}else{it.qty=qty;saveCart(cart);updateCartCount()}};

const productCardHTML=(p)=>`
  <div class="product-card">
    ${p.promo ? '<span class="badge badge--promo">Promo</span>' : ''}
    <img src="${p.image}" alt="${p.name}" />
    <div class="product-card__info">
      <div>${p.name}</div>
      <div class="price">${currency(p.price)}</div>
      <div class="card-actions"><a class="btn btn--primary" href="#" data-add="${p.id}">Adicionar ao carrinho</a> <a class="btn btn--outline" href="product.html?id=${p.id}">Detalhes</a></div>
    </div>
  </div>`;

const renderFeatured=()=>{
  const el=qs('#featuredGrid');
  if(!el) return;
  const top=PRODUCTS.slice(0,4);
  el.innerHTML=top.map(productCardHTML).join('');
  el.addEventListener('click',e=>{
    const btn=e.target.closest('[data-add]');
    if(!btn) return; e.preventDefault();
    const id=Number(btn.getAttribute('data-add'));
    const p=PRODUCTS.find(p=>p.id===id); if(p) addToCart(p,1);
  });
};

const renderProducts=()=>{
  const grid=qs('#productsGrid');
  if(!grid) return;
  const params=new URLSearchParams(location.search);
  const initialCat=params.get('cat')||'';
  const filterCategory=qs('#filterCategory');
  const filterPromo=qs('#filterPromo');
  const filterMax=qs('#filterMax');
  const searchInput=qs('#searchInput');
  const clearFiltersBtn=qs('#clearFilters');
  
  if(initialCat && filterCategory) filterCategory.value=initialCat;

  const apply=()=>{
    let list=[...PRODUCTS];
    const cat=filterCategory.value.trim();
    const promo=filterPromo.checked;
    const max=parseFloat(filterMax.value);
    const q=(searchInput.value||'').toLowerCase();
    
    if(cat) list=list.filter(p=>p.category===cat);
    if(promo) list=list.filter(p=>p.promo);
    if(!isNaN(max)) list=list.filter(p=>p.price<=max);
    if(q) list=list.filter(p=>p.name.toLowerCase().includes(q));
    
    grid.innerHTML=list.map(productCardHTML).join('');
    qs('#emptyState').classList.toggle('hidden',list.length>0);
    
    // Update results counter
    const resultsText = list.length === 1 ? '1 produto encontrado' : `${list.length} produtos encontrados`;
    let counter = qs('#resultsCounter');
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'resultsCounter';
      counter.className = 'results-counter';
      grid.parentElement.insertBefore(counter, grid);
    }
    counter.textContent = resultsText;
  };

  const clearFilters=()=>{
    filterCategory.value='';
    filterPromo.checked=false;
    filterMax.value='';
    searchInput.value='';
    apply();
  };

  [filterCategory,filterPromo,filterMax,searchInput].forEach(el=>el&&el.addEventListener('input',apply));
  clearFiltersBtn&&clearFiltersBtn.addEventListener('click',clearFilters);
  
  grid.addEventListener('click',e=>{
    const btn=e.target.closest('[data-add]');
    if(!btn) return; e.preventDefault();
    const id=Number(btn.getAttribute('data-add'));
    const p=PRODUCTS.find(p=>p.id===id); if(p) addToCart(p,1);
  });

  apply();
};

const renderProductDetail=()=>{
  const wrap=qs('#productDetail');
  if(!wrap) return;
  const params=new URLSearchParams(location.search);
  const id=Number(params.get('id'));
  const p=PRODUCTS.find(p=>p.id===id);
  if(!p){wrap.innerHTML='<div class="empty">Produto não encontrado.</div>';return}
  wrap.innerHTML=`
    <div>
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="product-detail__info">
      <h1>${p.name}</h1>
      <div class="price">${currency(p.price)}</div>
      <p>Descrição curta do produto.</p>
      <div>
        <label>Quantidade</label>
        <input id="qty" type="number" min="1" value="1" style="width:100px;padding:8px;border:1px solid #ddd;border-radius:8px" />
      </div>
      <div>
        <button id="addBtn" class="btn btn--primary">Adicionar ao carrinho</button>
      </div>
    </div>`;
  qs('#addBtn').addEventListener('click',()=>{
    const qty=Math.max(1,parseInt(qs('#qty').value)||1);
    addToCart(p,qty);
  });
};

const renderCart=()=>{
  const list=qs('#cartItems');
  if(!list) return;
  const draw=()=>{
    if(cart.length===0){
      list.innerHTML=`
        <div class="empty">
          <div style="font-size: 64px; margin-bottom: 16px;">🛒</div>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos para continuar com sua compra</p>
          <a href="products.html" class="btn btn--primary">Ver Produtos</a>
        </div>`;
      qs('#cartTotal').textContent=currency(0);
      return;
    }
    
    list.innerHTML=cart.map(it=>`
      <div class="cart-item">
        <img src="${it.image}" alt="${it.name}">
        <div>
          <div style="font-weight: 600;">${it.name}</div>
          <div style="font-size: 14px; color: #6c757d;">Preço unitário: ${currency(it.price)}</div>
        </div>
        <div class="price">${currency(it.price * it.qty)}</div>
        <div>
          <input data-qty="${it.id}" type="number" min="1" value="${it.qty}" />
        </div>
        <div>
          <button class="btn btn--outline" data-remove="${it.id}">🗑️ Remover</button>
        </div>
      </div>`).join('');
    
    const total=cart.reduce((a,i)=>a+i.price*i.qty,0);
    qs('#cartTotal').textContent=currency(total);
  };
  list.addEventListener('input',e=>{
    const inp=e.target.closest('[data-qty]'); if(!inp) return;
    const id=Number(inp.getAttribute('data-qty'));
    const qty=Math.max(1,parseInt(inp.value)||1);
    setQty(id,qty); draw();
  });
  list.addEventListener('click',e=>{
    const btn=e.target.closest('[data-remove]'); if(!btn) return;
    const id=Number(btn.getAttribute('data-remove'));
    removeFromCart(id); draw();
  });
  const checkout=qs('#checkoutBtn');
  checkout&&checkout.addEventListener('click',()=>{
    alert('Pedido recebido! (simulação)');
    cart=[];saveCart(cart);updateCartCount();draw();
  });
  draw();
};

// Interactive FX
const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const enableTiltCards = () => {
  if(prefersReducedMotion()) return;
  const cards = qsa('.product-card');
  cards.forEach(card => {
    let rect;
    const onEnter = () => { rect = card.getBoundingClientRect(); card.style.willChange = 'transform'; };
    const onMove = (e) => {
      if(!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - y) * 10; // tilt up/down
      const rotY = (x - 0.5) * 12; // tilt left/right
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    };
    const onLeave = () => { card.style.transform = ''; card.style.willChange = ''; };
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
};

const enableHeroParallax = () => {
  if(prefersReducedMotion()) return;
  const heroImg = qs('.hero__image img');
  if(!heroImg) return;
  const onMove = (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 12;
    const y = (e.clientY / h - 0.5) * 12;
    heroImg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  window.addEventListener('mousemove', onMove);
};

// Form enhancements
const enhanceFormInputs = () => {
  const inputs = qsa('.form__group input, .form__group textarea, .login-form input, .login-form textarea');
  
  inputs.forEach(input => {
    const group = input.closest('.form__group');
    if (!group) return;
    
    // Add focus classes for better styling
    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      group.classList.remove('focused');
      checkInputState(input, group);
    });
    
    // Check on input change
    input.addEventListener('input', () => {
      checkInputState(input, group);
    });
    
    // Check initial state
    checkInputState(input, group);
  });
};

// Helper function to check input state
const checkInputState = (input, group) => {
  if (input.value.trim() !== '' || input.matches(':focus')) {
    group.classList.add('filled');
  } else {
    group.classList.remove('filled');
  }
};

// Contact form submission with feedback
const handleContactForm = () => {
  const form = qs('#contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const button = form.querySelector('.btn--primary');
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Enviando...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      button.innerHTML = '✅ Enviado com sucesso!';
      button.style.background = 'var(--action)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = '';
        
        // Reset form states
        qsa('.form__group').forEach(group => {
          group.classList.remove('filled', 'focused');
        });
      }, 2000);
    }, 1500);
  });
};

// Login form submission with feedback
const handleLoginForm = () => {
  const form = qs('#loginForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const email = qs('#loginEmail').value;
    const password = qs('#loginPassword').value;
    const remember = qs('#rememberMe').checked;
    
    // Add loading state
    const button = form.querySelector('.btn--login');
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Entrando...';
    button.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
      // Store login state (simplified)
      if (remember) {
        localStorage.setItem('se_user_logged', 'true');
        localStorage.setItem('se_user_email', email);
      } else {
        sessionStorage.setItem('se_user_logged', 'true');
        sessionStorage.setItem('se_user_email', email);
      }
      
      button.innerHTML = '✅ Login realizado!';
      button.style.background = 'var(--action)';
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }, 1500);
  });
  
  // Social login buttons
  const googleBtn = qs('.btn--google');
  const facebookBtn = qs('.btn--facebook');
  
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      alert('Login com Google seria integrado aqui (funcionalidade futura)');
    });
  }
  
  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
      alert('Login com Facebook seria integrado aqui (funcionalidade futura)');
    });
  }
  
  // Signup link
  const signupLink = qs('#signupLink');
  if (signupLink) {
    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Página de cadastro seria criada aqui (funcionalidade futura)');
    });
  }
};

// Check if user is logged in and update UI
const updateLoginState = () => {
  const isLoggedIn = localStorage.getItem('se_user_logged') || sessionStorage.getItem('se_user_logged');
  const userEmail = localStorage.getItem('se_user_email') || sessionStorage.getItem('se_user_email');
  const loginBtn = qs('#loginBtn');
  
  if (isLoggedIn && loginBtn) {
    const userName = userEmail ? userEmail.split('@')[0] : 'Usuário';
    loginBtn.innerHTML = `👤 ${userName}`;
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Deseja fazer logout?')) {
        localStorage.removeItem('se_user_logged');
        localStorage.removeItem('se_user_email');
        sessionStorage.removeItem('se_user_logged');
        sessionStorage.removeItem('se_user_email');
        location.reload();
      }
    });
  }
};

// Smooth scroll for anchor links
const enableSmoothScroll = () => {
  qsa('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = qs(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

const init=()=>{
  updateCartCount();
  updateLoginState();
  
  const page=document.body.dataset.page;
  
  if(page==='home') renderFeatured();
  if(page==='products') renderProducts();
  if(page==='product') renderProductDetail();
  if(page==='cart') renderCart();
  if(page==='contact') {
    enhanceFormInputs();
    handleContactForm();
  }
  if(page==='login') {
    handleLoginForm();
  }
  
  // Enable global enhancements
  enableSmoothScroll();
  
  // Enable interactions after content
  if(page==='home' || page==='products') enableTiltCards();
  if(page==='home') enableHeroParallax();
};

document.addEventListener('DOMContentLoaded',init);
