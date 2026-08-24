(() => {
  const S=window.SITE;
  const products=[
    {id:'alu-window',name:'Aluminium Window',price:1850,img:'/images/project-08.jpeg',desc:'Sample aluminium framed window unit for residential installations.'},
    {id:'glass-door',name:'Aluminium Glass Door',price:3200,img:'/images/project-12.jpeg',desc:'Modern aluminium framed glass door for homes and offices.'},
    {id:'folding-door',name:'Folding Glass Door',price:6800,img:'/images/project-11.jpeg',desc:'Premium folding aluminium and glass door system.'},
    {id:'balustrade',name:'Glass Balustrade Panel',price:1450,img:'/images/project-05.jpeg',desc:'Sample glass balustrade panel with aluminium fittings.'},
    {id:'shower',name:'Shower Glass Panel',price:2400,img:'/images/project-03.jpeg',desc:'Sample toughened shower glass panel for bathroom upgrades.'}
  ];
  const grid=document.querySelector('#storeGrid');
  const drawer=document.querySelector('#cartDrawer');
  const cartItems=document.querySelector('#cartItems');
  const totalEl=document.querySelector('#cartTotal');
  const countEl=document.querySelector('#cartCount');
  let cart=JSON.parse(localStorage.getItem('aluglass-demo-cart')||'[]');
  const money=n=>'R'+Number(n).toLocaleString('en-ZA');
  const save=()=>localStorage.setItem('aluglass-demo-cart',JSON.stringify(cart));
  const renderProducts=()=>{grid.innerHTML=products.map(p=>`<article class="card storeCard lift"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="storeCardBody"><h3>${p.name}</h3><p>${p.desc}</p><div class="storePrice">${money(p.price)}</div><button class="btn primary addCart" data-id="${p.id}">Add to Cart</button></div></article>`).join('');document.querySelectorAll('.addCart').forEach(b=>b.onclick=()=>{const p=products.find(x=>x.id===b.dataset.id);const item=cart.find(x=>x.id===p.id);if(item)item.qty++;else cart.push({...p,qty:1});save();renderCart();drawer.classList.add('open');});};
  const renderCart=()=>{countEl.textContent=cart.reduce((a,b)=>a+b.qty,0);if(!cart.length){cartItems.innerHTML='<p class="emptyCart">Your cart is empty.</p>';totalEl.textContent='R0';return;}cartItems.innerHTML=cart.map(x=>`<div class="cartRow"><img src="${x.img}" alt="${x.name}"><div><b>${x.name}</b><small>${money(x.price)} each</small><div class="qtyRow"><button data-act="minus" data-id="${x.id}">−</button><span>${x.qty}</span><button data-act="plus" data-id="${x.id}">+</button><button class="removeItem" data-act="remove" data-id="${x.id}">Remove</button></div></div><strong>${money(x.price*x.qty)}</strong></div>`).join('');totalEl.textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));cartItems.querySelectorAll('button').forEach(b=>b.onclick=()=>{const item=cart.find(x=>x.id===b.dataset.id);if(b.dataset.act==='plus')item.qty++;if(b.dataset.act==='minus'){item.qty--;if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id)}if(b.dataset.act==='remove')cart=cart.filter(x=>x.id!==item.id);save();renderCart();});};
  document.querySelector('#cartFab').onclick=()=>drawer.classList.add('open');document.querySelector('#cartClose').onclick=()=>drawer.classList.remove('open');document.querySelector('#clearCart').onclick=()=>{cart=[];save();renderCart();};
  document.querySelector('#checkoutBtn').onclick=()=>{if(!cart.length)return alert('Your cart is empty.');const total=cart.reduce((s,x)=>s+x.price*x.qty,0);const lines=cart.map(x=>`- ${x.name} x${x.qty} = ${money(x.price*x.qty)}`).join('\n');const msg=`Hello ${S.name}, I would like to place a demo store order.\n\n${lines}\n\nTotal: ${money(total)}\n\nPlease confirm availability, final pricing and installation/delivery details.`;window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');};
  renderProducts();renderCart();
})();
