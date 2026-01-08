// assets/js/kasir.js
// Fokus: form kasir — hitung subtotal, simpan transaksi ke localStorage (tanpa render tabel).
// storageKey harus sama dengan yang dipakai di recap.js

(function () {
  const storageKey = 'op3_transactions_v1';
  const txForm = document.getElementById('txForm');
  if (!txForm) return;

  const buyerEl = document.getElementById('buyer');
  const dateEl = document.getElementById('date');
  const serviceEl = document.getElementById('service');
  const pagesEl = document.getElementById('pages');
  const unitPriceEl = document.getElementById('unitPrice');
  const discountEl = document.getElementById('discount');
  const notesEl = document.getElementById('notes');
  const subtotalEl = document.getElementById('subtotal');
  const toast = document.getElementById('toast');

  function formatIDR(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  }

  function computeSubtotal() {
    const qty = Number(pagesEl.value) || 0;
    const unit = Number(unitPriceEl.value) || 0;
    const disc = Number(discountEl.value) || 0;
    const total = Math.max(0, qty * unit - disc);
    subtotalEl.textContent = formatIDR(total);
    return total;
  }

  function loadTransactions() {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Gagal memuat transaksi:', e);
      return [];
    }
  }

  function saveTransactions(list) {
    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  function showToast(msg, timeout = 1500) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    if (typeof anime !== 'undefined') {
      anime({
        targets: toast,
        opacity: [0,1],
        translateY: [-8,0],
        duration: 350,
        easing: 'easeOutCubic'
      });
    }
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      if (typeof anime !== 'undefined') {
        anime({
          targets: toast,
          opacity: [1,0],
          translateY: [0,-8],
          duration: 300,
          easing: 'easeInCubic',
          complete: () => toast.classList.add('hidden')
        });
      } else {
        toast.classList.add('hidden');
      }
    }, timeout);
  }

  // initial setup: set today's date
  function setToday() {
    const today = new Date().toISOString().slice(0,10);
    dateEl.value = today;
  }

  pagesEl.addEventListener('input', computeSubtotal);
  unitPriceEl.addEventListener('input', computeSubtotal);
  discountEl.addEventListener('input', computeSubtotal);

  txForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const pages = Math.max(1, Number(pagesEl.value) || 0);
    const unitPrice = Math.max(0, Number(unitPriceEl.value) || 0);
    const discount = Math.max(0, Number(discountEl.value) || 0);
    const total = Math.max(0, pages * unitPrice - discount);

    const tx = {
      id: uid(),
      date: dateEl.value,
      buyer: (buyerEl.value || '').trim(),
      service: serviceEl.value,
      pages,
      unitPrice,
      discount,
      total,
      notes: (notesEl.value || '').trim()
    };

    const list = loadTransactions();
    list.unshift(tx);
    saveTransactions(list);

    // small animation to indicate action
    if (typeof anime !== 'undefined') {
      anime({
        targets: txForm,
        scale: [1, 0.995, 1],
        duration: 450,
        easing: 'easeOutElastic(1,.6)'
      });
    }

    showToast('Transaksi ditambahkan');

    txForm.reset();
    setToday();
    computeSubtotal();
  });

  txForm.addEventListener('reset', () => {
    setTimeout(() => {
      setToday();
      computeSubtotal();
    }, 0);
  });

  // init
  setToday();
  computeSubtotal();
})();
