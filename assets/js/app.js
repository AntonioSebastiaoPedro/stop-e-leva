const qs=(s,el=document)=>el.querySelector(s);const qsa=(s,el=document)=>[...el.querySelectorAll(s)];
const currency = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

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
};

const removeFromCart=(id)=>{cart=cart.filter(i=>i.id!==id);saveCart(cart);updateCartCount()};
const setQty=(id,qty)=>{const it=cart.find(i=>i.id===id);if(!it)return;if(qty<=0){removeFromCart(id)}else{it.qty=qty;saveCart(cart);updateCartCount()}};

const productCardHTML=(p)=>`
  <div class="product-card">
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
  };

  [filterCategory,filterPromo,filterMax,searchInput].forEach(el=>el&&el.addEventListener('input',apply));
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
    if(cart.length===0){list.innerHTML='<div class="empty">Seu carrinho está vazio.</div>';qs('#cartTotal').textContent=currency(0);return}
    list.innerHTML=cart.map(it=>`
      <div class="cart-item">
        <img src="${it.image}" alt="${it.name}">
        <div>${it.name}</div>
        <div class="price">${currency(it.price)}</div>
        <div>
          <input data-qty="${it.id}" type="number" min="1" value="${it.qty}" style="width:80px;padding:8px;border:1px solid #ddd;border-radius:8px" />
        </div>
        <div>
          <button class="btn btn--outline" data-remove="${it.id}">Remover</button>
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

const init=()=>{
  updateCartCount();
  const page=document.body.dataset.page;
  if(page==='home') renderFeatured();
  if(page==='products') renderProducts();
  if(page==='product') renderProductDetail();
  if(page==='cart') renderCart();
};

document.addEventListener('DOMContentLoaded',init);
