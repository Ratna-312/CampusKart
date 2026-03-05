/* ============================================================
   CampusKart — Application Logic
   Full SPA with mock data, cart management, search, admin panel
   ============================================================ */

// ==================== MOCK DATA ====================

const CATEGORIES = [
  { id: 'pens',        name: 'Pens',              icon: '🖊️' },
  { id: 'notebooks',   name: 'Notebooks',         icon: '📓' },
  { id: 'lab-records', name: 'Lab Records',       icon: '🔬' },
  { id: 'printouts',   name: 'Printouts',         icon: '🖨️' },
  { id: 'binding',     name: 'Binding',           icon: '📎' },
  { id: 'exam-pads',   name: 'Exam Pads',         icon: '📝' },
  { id: 'calculators', name: 'Calculators',       icon: '🔢' },
  { id: 'art',         name: 'Art Supplies',      icon: '🎨' },
];

let PRODUCTS = [
  { id: 1,  name: 'Pilot V5 Pen (Blue)',       desc: 'Smooth 0.5mm liquid ink',               price: 45,   category: 'pens',        emoji: '🖊️', stock: 120, featured: true  },
  { id: 2,  name: 'Pilot V5 Pen (Black)',      desc: 'Smooth 0.5mm liquid ink',               price: 45,   category: 'pens',        emoji: '🖊️', stock: 95,  featured: false },
  { id: 3,  name: 'Cello Gripper Pack (5)',     desc: 'Comfortable grip, blue ink',            price: 60,   category: 'pens',        emoji: '✒️',  stock: 80,  featured: false },
  { id: 4,  name: 'Reynolds 045 (10-pack)',     desc: 'Classic ballpoint, fine tip',            price: 90,   category: 'pens',        emoji: '🖋️', stock: 65,  featured: true  },
  { id: 5,  name: 'Highlighter Set (6 colors)',desc: 'Neon markers for notes',                price: 120,  category: 'pens',        emoji: '🌈', stock: 40,  featured: false },
  { id: 6,  name: 'Classmate Notebook (200pg)', desc: 'Single line, spiral bound',             price: 75,   category: 'notebooks',   emoji: '📓', stock: 200, featured: true  },
  { id: 7,  name: 'Classmate Notebook (100pg)', desc: 'Single line, side stapled',             price: 40,   category: 'notebooks',   emoji: '📗', stock: 250, featured: false },
  { id: 8,  name: 'A4 Graph Notebook',          desc: '1cm grid, 100 pages',                   price: 55,   category: 'notebooks',   emoji: '📐', stock: 90,  featured: false },
  { id: 9,  name: 'Long Notebook (400pg)',       desc: 'Register-style, ruled',                 price: 120,  category: 'notebooks',   emoji: '📕', stock: 60,  featured: false },
  { id: 10, name: 'Physics Lab Record',          desc: '100 pages, interleaved, hard bound',   price: 85,   category: 'lab-records', emoji: '🔬', stock: 150, featured: true  },
  { id: 11, name: 'Chemistry Lab Record',        desc: '100 pages, interleaved, hard bound',   price: 85,   category: 'lab-records', emoji: '⚗️', stock: 140, featured: false },
  { id: 12, name: 'CSE Lab Record',              desc: '100 pages, plain, hard bound',         price: 80,   category: 'lab-records', emoji: '💻', stock: 130, featured: false },
  { id: 13, name: 'B&W Printout (per page)',     desc: 'A4 single side, quality print',        price: 3,    category: 'printouts',   emoji: '🖨️', stock: 999, featured: false },
  { id: 14, name: 'Color Printout (per page)',   desc: 'A4 single side, vivid colors',         price: 10,   category: 'printouts',   emoji: '🌈', stock: 999, featured: true  },
  { id: 15, name: 'Spiral Binding',              desc: 'Plastic spiral, up to 100 pages',      price: 30,   category: 'binding',     emoji: '📎', stock: 500, featured: false },
  { id: 16, name: 'Hard Binding',                desc: 'Professional hard cover binding',       price: 80,   category: 'binding',     emoji: '📚', stock: 200, featured: false },
  { id: 17, name: 'Soft Binding (Tape)',          desc: 'Tape binding, up to 50 pages',         price: 20,   category: 'binding',     emoji: '📑', stock: 400, featured: false },
  { id: 18, name: 'Exam Writing Pad (A4)',        desc: '80 sheets, ruled, top punched',        price: 35,   category: 'exam-pads',   emoji: '📝', stock: 300, featured: true  },
  { id: 19, name: 'Exam Pad + Supplement (5)',    desc: 'Main + 5 supplements combo',           price: 50,   category: 'exam-pads',   emoji: '📄', stock: 180, featured: false },
  { id: 20, name: 'Casio FX-991ES Plus',          desc: 'Scientific calculator, 417 functions', price: 1350, category: 'calculators', emoji: '🔢', stock: 25,  featured: true  },
  { id: 21, name: 'Casio FX-82MS',                desc: 'Basic scientific, 240 functions',      price: 750,  category: 'calculators', emoji: '🧮', stock: 35,  featured: false },
  { id: 22, name: 'Geometry Box (Camlin)',         desc: 'Complete geometry set',                price: 120,  category: 'art',         emoji: '📏', stock: 50,  featured: false },
  { id: 23, name: 'Eraser & Sharpener Combo',     desc: 'Faber-Castell, dust-free',             price: 25,   category: 'art',         emoji: '✏️', stock: 200, featured: false },
  { id: 24, name: 'A3 Drawing Sheet (10-pack)',   desc: 'Cartridge paper, 150 GSM',             price: 60,   category: 'art',         emoji: '🎨', stock: 75,  featured: false },
];

const DELIVERY_LOCATIONS = [
  { id: 'hostel-a',  name: '🏢 Hostel Block A' },
  { id: 'hostel-b',  name: '🏢 Hostel Block B' },
  { id: 'hostel-c',  name: '🏢 Hostel Block C' },
  { id: 'library',   name: '📚 Library' },
  { id: 'academic',  name: '🎓 Academic Block' },
  { id: 'canteen',   name: '🍔 Canteen Area' },
  { id: 'main-gate', name: '🚪 Main Gate' },
];

let ORDERS = [
  {
    id: 'ORD-1001',
    customer: 'Rahul Sharma',
    items: [
      { productId: 1, name: 'Pilot V5 Pen (Blue)', qty: 3, price: 45 },
      { productId: 6, name: 'Classmate Notebook (200pg)', qty: 2, price: 75 },
    ],
    total: 285,
    location: 'Hostel Block A',
    status: 'delivering',
    date: '2026-03-03T14:30:00',
    paymentId: 'pay_MockXYZ1001',
  },
  {
    id: 'ORD-1002',
    customer: 'Priya Patel',
    items: [
      { productId: 10, name: 'Physics Lab Record', qty: 1, price: 85 },
      { productId: 18, name: 'Exam Writing Pad (A4)', qty: 4, price: 35 },
    ],
    total: 235,
    location: 'Academic Block',
    status: 'packing',
    date: '2026-03-03T15:10:00',
    paymentId: 'pay_MockXYZ1002',
  },
  {
    id: 'ORD-1003',
    customer: 'Amit Kumar',
    items: [
      { productId: 20, name: 'Casio FX-991ES Plus', qty: 1, price: 1350 },
    ],
    total: 1360,
    location: 'Hostel Block C',
    status: 'delivered',
    date: '2026-03-03T10:00:00',
    paymentId: 'pay_MockXYZ1003',
  },
  {
    id: 'ORD-1004',
    customer: 'Sneha Reddy',
    items: [
      { productId: 14, name: 'Color Printout (per page)', qty: 20, price: 10 },
      { productId: 16, name: 'Hard Binding', qty: 2, price: 80 },
    ],
    total: 370,
    location: 'Library',
    status: 'placed',
    date: '2026-03-03T16:45:00',
    paymentId: 'pay_MockXYZ1004',
  },
];

// ==================== STATE ====================
let cart = [];
let selectedLocation = DELIVERY_LOCATIONS[0].id;
let currentPage = 'home';
let activeCategory = 'all';
let searchQuery = '';
let nextOrderId = 1005;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderCategoryGrid();
  renderFeaturedProducts();
  renderFilterChips();
  renderShopProducts();
  renderDeliveryLocations();
  renderAdminStats();
  renderAdminOrders();
  renderAdminInventory();
  renderAdminCategorySelect();
  renderRecentOrders();
  updateCartBadge();
  setupSearch();
  setupScrollListener();
  checkReorderVisibility();
});

// ==================== NAVIGATION ====================
function navigateTo(page) {
  currentPage = page;
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  // Update bottom nav
  document.querySelectorAll('.bnav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Update cart display when entering cart page
  if (page === 'cart') renderCart();
  if (page === 'admin') {
    renderAdminStats();
    renderAdminOrders();
    renderAdminInventory();
  }
  if (page === 'track') renderRecentOrders();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== SCROLL LISTENER ====================
function setupScrollListener() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ==================== CATEGORY GRID ====================
function renderCategoryGrid() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.id}')">
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
    </div>
  `).join('');
}

function filterByCategory(catId) {
  activeCategory = catId;
  navigateTo('shop');
  // Update filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === catId);
  });
  renderShopProducts();
}

// ==================== FEATURED PRODUCTS ====================
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredProducts');
  const featured = PRODUCTS.filter(p => p.featured);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

function productCardHTML(product) {
  return `
    <div class="product-card" id="product-${product.id}">
      <div class="product-img">${product.emoji}</div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-footer">
          <span class="product-price">₹${product.price}</span>
          <button class="product-add-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">+</button>
        </div>
      </div>
    </div>
  `;
}

// ==================== SHOP PAGE ====================
function renderFilterChips() {
  const container = document.getElementById('filterChips');
  const allChip = `<button class="filter-chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all" onclick="setFilter('all')">All</button>`;
  const chips = CATEGORIES.map(cat => `
    <button class="filter-chip ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}" onclick="setFilter('${cat.id}')">
      <span class="chip-emoji">${cat.icon}</span>
      ${cat.name}
    </button>
  `).join('');
  container.innerHTML = allChip + chips;
}

function setFilter(catId) {
  activeCategory = catId;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === catId);
  });
  renderShopProducts();
}

function renderShopProducts() {
  const grid = document.getElementById('shopProducts');
  const sortBy = document.getElementById('sortSelect').value;
  const query = document.getElementById('shopSearchInput')?.value?.toLowerCase() || '';

  let filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  // Sort
  switch (sortBy) {
    case 'price-low':  filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'name':       filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    default:           filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
  }

  document.getElementById('resultsCount').textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
  grid.innerHTML = filtered.length > 0
    ? filtered.map(p => productCardHTML(p)).join('')
    : '<div style="text-align:center;padding:60px 20px;color:var(--gray-400);grid-column:1/-1;"><div style="font-size:3rem;margin-bottom:12px;">🔍</div><p>No products found</p></div>';
}

// Shop search
document.addEventListener('DOMContentLoaded', () => {
  const shopInput = document.getElementById('shopSearchInput');
  if (shopInput) {
    shopInput.addEventListener('input', () => renderShopProducts());
  }
});

// ==================== SEARCH (NAV) ====================
function setupSearch() {
  const input = document.getElementById('navSearchInput');
  const suggestions = document.getElementById('searchSuggestions');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) {
      suggestions.classList.remove('show');
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.includes(q)
    ).slice(0, 6);

    if (matches.length === 0) {
      suggestions.innerHTML = '<div style="padding:16px;text-align:center;color:var(--gray-400);font-size:0.85rem;">No results found</div>';
    } else {
      suggestions.innerHTML = matches.map(p => `
        <div class="suggestion-item" onclick="quickAddFromSearch(${p.id})">
          <span class="sug-emoji">${p.emoji}</span>
          <div class="sug-info">
            <div class="sug-name">${highlightMatch(p.name, q)}</div>
            <div class="sug-price">₹${p.price}</div>
          </div>
        </div>
      `).join('');
    }
    suggestions.classList.add('show');
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) suggestions.classList.add('show');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      suggestions.classList.remove('show');
    }
  });
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<strong>' + text.slice(idx, idx + query.length) + '</strong>' + text.slice(idx + query.length);
}

function quickAddFromSearch(productId) {
  addToCart(productId);
  document.getElementById('searchSuggestions').classList.remove('show');
  document.getElementById('navSearchInput').value = '';
}

// ==================== CART ====================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ productId: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
  }

  saveCartToStorage();
  updateCartBadge();
  showToast(`${product.name} added to cart`, 'success');

  // Bump animation
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveCartToStorage();
  updateCartBadge();
  renderCart();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCartToStorage();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartBadge').textContent = count;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const sidebar = document.querySelector('.cart-sidebar');

  if (cart.length === 0) {
    cartContainer.style.display = 'none';
    sidebar.style.display = 'none';
    cartEmpty.style.display = 'block';
    return;
  }

  cartContainer.style.display = 'flex';
  sidebar.style.display = 'flex';
  cartEmpty.style.display = 'none';

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} each</div>
      </div>
      <div class="cart-qty-controls">
        <button class="qty-btn" onclick="updateCartQty(${item.productId}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartQty(${item.productId}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.productId})" aria-label="Remove item">✕</button>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 10;
  const total = subtotal + deliveryFee;

  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartDeliveryFee').textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  document.getElementById('cartTotal').textContent = `₹${total}`;
}

// ==================== DELIVERY LOCATIONS ====================
function renderDeliveryLocations() {
  const container = document.getElementById('locationOptions');
  container.innerHTML = DELIVERY_LOCATIONS.map(loc => `
    <div class="location-option ${loc.id === selectedLocation ? 'selected' : ''}" onclick="selectLocation('${loc.id}')">
      <span class="loc-radio"></span>
      <span>${loc.name}</span>
    </div>
  `).join('');
}

function selectLocation(locId) {
  selectedLocation = locId;
  document.querySelectorAll('.location-option').forEach(opt => {
    opt.classList.toggle('selected', opt.querySelector('span:last-child').textContent === DELIVERY_LOCATIONS.find(l => l.id === locId).name);
  });
  renderDeliveryLocations();
}

// ==================== PAYMENT ====================
function initiatePayment() {
  if (cart.length === 0) {
    showToast('Cart is empty!', 'error');
    return;
  }
  const total = getCartTotal() + (getCartTotal() > 500 ? 0 : 10);
  document.getElementById('modalPayAmount').textContent = `₹${total}`;
  document.getElementById('paymentModal').classList.add('show');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('show');
}

function selectPaymentMethod(method) {
  document.querySelectorAll('.payment-option input[type="radio"]').forEach(r => r.checked = false);
  document.querySelector(`.payment-option input[value="${method}"]`).checked = true;
}

function confirmPayment() {
  const total = getCartTotal() + (getCartTotal() > 500 ? 0 : 10);
  const location = DELIVERY_LOCATIONS.find(l => l.id === selectedLocation);
  const orderId = `ORD-${nextOrderId++}`;

  const order = {
    id: orderId,
    customer: 'You',
    items: cart.map(item => ({ productId: item.productId, name: item.name, qty: item.qty, price: item.price })),
    total: total,
    location: location ? location.name.replace(/^[^\s]+\s/, '') : 'Campus',
    status: 'placed',
    date: new Date().toISOString(),
    paymentId: `pay_Mock${Date.now()}`,
  };

  ORDERS.unshift(order);

  // Save last purchase for reorder
  localStorage.setItem('campuskart_last_order', JSON.stringify(cart));

  // Clear cart
  cart = [];
  saveCartToStorage();
  updateCartBadge();

  closePaymentModal();
  showToast(`Order ${orderId} placed! 🎉`, 'success');

  // Navigate to track
  setTimeout(() => {
    navigateTo('track');
    document.getElementById('trackInput').value = orderId;
    trackOrder();
  }, 800);

  checkReorderVisibility();
}

// ==================== REORDER ====================
function checkReorderVisibility() {
  const lastOrder = localStorage.getItem('campuskart_last_order');
  const reorderSection = document.getElementById('reorderSection');
  reorderSection.style.display = lastOrder ? 'block' : 'none';
}

function reorderLastPurchase() {
  const lastOrder = localStorage.getItem('campuskart_last_order');
  if (!lastOrder) {
    showToast('No previous order found', 'error');
    return;
  }

  const items = JSON.parse(lastOrder);
  items.forEach(item => {
    const existing = cart.find(c => c.productId === item.productId);
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push({ ...item });
    }
  });

  saveCartToStorage();
  updateCartBadge();
  showToast('Last purchase added to cart! 🔄', 'success');
  navigateTo('cart');
}

// ==================== ORDER TRACKING ====================
function trackOrder() {
  const input = document.getElementById('trackInput').value.trim().toUpperCase();
  const order = ORDERS.find(o => o.id === input);
  const resultDiv = document.getElementById('trackResult');

  if (!order) {
    resultDiv.style.display = 'none';
    if (input) showToast('Order not found', 'error');
    return;
  }

  resultDiv.style.display = 'block';
  document.getElementById('trackOrderId').textContent = order.id;
  document.getElementById('trackDate').textContent = `Placed on ${formatDate(order.date)}`;
  document.getElementById('trackLocation').textContent = order.location;
  document.getElementById('trackItems').textContent = `${order.items.reduce((s, i) => s + i.qty, 0)} items`;
  document.getElementById('trackTotal').textContent = `₹${order.total}`;
  document.getElementById('trackETA').textContent = order.status === 'delivered' ? 'Delivered ✅' : '~30 mins';

  const statusBadge = document.getElementById('trackStatusBadge');
  statusBadge.textContent = formatStatus(order.status);
  statusBadge.className = `status-badge ${order.status}`;

  renderTimeline(order.status);
}

function renderTimeline(status) {
  const steps = ['placed', 'packing', 'delivering', 'delivered'];
  const labels = ['Order Placed', 'Packing', 'Out for Delivery', 'Delivered'];
  const icons  = ['📋', '📦', '🛵', '✅'];
  const currentIdx = steps.indexOf(status);

  const timeline = document.getElementById('trackTimeline');
  timeline.innerHTML = steps.map((step, i) => {
    let cls = '';
    if (i < currentIdx) cls = 'completed';
    else if (i === currentIdx) cls = 'active';

    return `
      <div class="timeline-step ${cls}">
        <div class="timeline-dot">${icons[i]}</div>
        <div class="timeline-info">
          <div class="timeline-title">${labels[i]}</div>
          ${i <= currentIdx ? `<div class="timeline-time">${i < currentIdx ? 'Completed' : 'In progress'}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderRecentOrders() {
  const container = document.getElementById('recentOrders');
  container.innerHTML = ORDERS.slice(0, 5).map(order => `
    <div class="recent-order-card" onclick="document.getElementById('trackInput').value='${order.id}';trackOrder();">
      <div class="ro-info">
        <span class="ro-id">${order.id}</span>
        <span class="ro-details">${order.items.length} items • ₹${order.total} • ${order.location}</span>
      </div>
      <span class="status-badge ${order.status}">${formatStatus(order.status)}</span>
    </div>
  `).join('');
}

// ==================== ADMIN PANEL ====================
function renderAdminStats() {
  const today = ORDERS.length;
  const revenue = ORDERS.reduce((s, o) => s + o.total, 0);
  const pending = ORDERS.filter(o => o.status !== 'delivered').length;
  const lowStock = PRODUCTS.filter(p => p.stock < 30).length;

  const stats = [
    { label: 'Orders Today',    value: today,              change: '+12%', positive: true },
    { label: 'Revenue',         value: `₹${revenue.toLocaleString()}`, change: '+8%',  positive: true },
    { label: 'Pending Orders',  value: pending,            change: '',     positive: true },
    { label: 'Low Stock Items', value: lowStock,           change: '',     positive: false },
  ];

  document.getElementById('adminStats').innerHTML = stats.map(s => `
    <div class="stat-card">
      <span class="stat-label">${s.label}</span>
      <span class="stat-value">${s.value}</span>
      ${s.change ? `<span class="stat-change ${s.positive ? 'positive' : 'negative'}">${s.change}</span>` : ''}
    </div>
  `).join('');
}

function renderAdminOrders() {
  document.getElementById('adminOrdersBody').innerHTML = ORDERS.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.customer}</td>
      <td>${order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</td>
      <td><strong>₹${order.total}</strong></td>
      <td>${order.location}</td>
      <td><span class="status-badge ${order.status}">${formatStatus(order.status)}</span></td>
      <td>
        <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)">
          <option value="placed" ${order.status === 'placed' ? 'selected' : ''}>Placed</option>
          <option value="packing" ${order.status === 'packing' ? 'selected' : ''}>Packing</option>
          <option value="delivering" ${order.status === 'delivering' ? 'selected' : ''}>Delivering</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = ORDERS.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    renderAdminOrders();
    renderAdminStats();
    showToast(`${orderId} → ${formatStatus(newStatus)}`, 'success');
  }
}

function renderAdminInventory() {
  document.getElementById('adminInventoryBody').innerHTML = PRODUCTS.map(p => `
    <tr>
      <td><span style="margin-right:8px">${p.emoji}</span>${p.name}</td>
      <td>${CATEGORIES.find(c => c.id === p.category)?.name || p.category}</td>
      <td>₹${p.price}</td>
      <td>
        <input type="number" class="stock-input" value="${p.stock}" min="0"
               onchange="updateStock(${p.id}, parseInt(this.value))"
               style="${p.stock < 30 ? 'border-color:var(--error);color:var(--error)' : ''}" />
      </td>
      <td>
        ${p.stock < 30 ? '<span class="status-badge" style="background:var(--error-bg);color:var(--error)">Low Stock</span>' : '<span class="status-badge" style="background:var(--success-bg);color:var(--success)">In Stock</span>'}
      </td>
    </tr>
  `).join('');
}

function updateStock(productId, newStock) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    product.stock = newStock;
    renderAdminInventory();
    renderAdminStats();
    showToast(`Stock updated for ${product.name}`, 'success');
  }
}

function renderAdminCategorySelect() {
  const select = document.getElementById('newProductCategory');
  select.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
}

function addNewProduct(e) {
  e.preventDefault();
  const name = document.getElementById('newProductName').value;
  const price = parseInt(document.getElementById('newProductPrice').value);
  const stock = parseInt(document.getElementById('newProductStock').value);
  const category = document.getElementById('newProductCategory').value;
  const desc = document.getElementById('newProductDesc').value || 'No description';
  const emoji = document.getElementById('newProductEmoji').value || '📦';

  const newProduct = {
    id: PRODUCTS.length + 1,
    name, desc, price, category, emoji, stock,
    featured: false,
  };

  PRODUCTS.push(newProduct);
  renderAdminInventory();
  renderAdminStats();
  renderShopProducts();
  renderFeaturedProducts();

  document.getElementById('addProductForm').reset();
  showToast(`${name} added to inventory! 📦`, 'success');
  switchAdminTab('inventory');
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`admin-${tab}`);
  if (panel) panel.classList.add('active');
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = '') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==================== LOCAL STORAGE ====================
function saveCartToStorage() {
  localStorage.setItem('campuskart_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem('campuskart_cart');
  if (saved) {
    try { cart = JSON.parse(saved); } catch { cart = []; }
  }
}

// ==================== UTILITIES ====================
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatStatus(status) {
  const map = {
    'placed': 'Placed',
    'packing': 'Packing',
    'delivering': 'Out for Delivery',
    'delivered': 'Delivered',
  };
  return map[status] || status;
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.id === 'paymentModal') {
    closePaymentModal();
  }
});

// Keyboard shortcut: Escape closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePaymentModal();
  }
});
