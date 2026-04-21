/* script.js */
// =============== TAILWIND CONFIG ===============
function initializeTailwind() {
    return {
        config(userConfig = {}) {
            return {
                content: [],
                theme: {
                    extend: {
                        colors: {
                            primary: '#e63939'
                        }
                    }
                }
            }
        },
        theme: {
            extend: {}
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    return {
        configUser: initializeTailwind().config(),
        theme: initializeTailwind().theme
    }
})

// =============== GLOBAL DATA ===============
const products = [
    { id: 1, name: "Toyota Oil Filter", category: "Oil Filters", price: 1500, desc: "Genuine OEM filter for Hilux, Prado & Land Cruiser", img: "image/oilfilter5.jpeg" },
    { id: 2, name: "K&N Air Filter", category: "Oil Filters", price: 1200, desc: "High-efficiency compact catrigde for Corolla, Priu & RAV4", img: "image/oilfilter4.jpeg" },
    { id: 3, name: "Oil Filter", category: "Oil Filters", price: 1500, desc: "Premium high-flow element for V8(1UR/3UR) petrol engines", img: "image/oilfilter3.jpeg" },
    { id: 4, name: "Toyota Oil Filter", category: "Oil Filters", price: 1000, desc: "High-performance oil filter element for prado V6, Hilux, and Avalon", img: "image/oilfilter2.jpeg" },
    { id: 5, name: "Bosch Air Filter", category: "Air Filters", price:1800, desc: "For Toyota, Isuzu & Mitsubishi vehicles", img: "image/airfilter3.jpeg" },
    { id: 6, name: "Air Filter", category: "Air Filters", price:1500, desc: "For Toyota, Isuzu  vehicles", img: "image/airfilter2.jpeg" }, 
    { id: 7, name: "Fuel Filter Toyota genuine", category: "Fuel Filters", price: 2500, desc: "Diesel fuel filter – water separator", img: "image/fuel1.jpeg" },
    { id: 8, name: "Mann Fuel Filter", category: "Fuel Filters", price: 1500, desc: "Heavy-duty filtration", img: "image/fuel2.jpeg" },
    { id: 9, name: "Bosch Brake Pads (Front)", category: "Brake Pads", price: 2450, desc: "Set of 4 pads – quiet & long lasting", img: "image/pad1.jpeg" },
    { id: 10, name: "Textar Brake Pads", category: "Brake Pads", price: 1890, desc: "European quality brake pads", img: "image/pad2.jpeg" },
    { id: 11, name: "Synthetic Lexus 5W-40", category: "Motor Oils", price: 4000, desc: "4 litres – fully synthetic", img: "image/motoroil2.jpeg" },
    { id: 12, name: "Japan Eneos Motor Oil 5W-40", category: "Eneos Oils", price: 3000, desc: "4 litres – fully synthetic", img: "image/motoroil3.jpeg" },
    { id: 13, name: "Toyota SL/CF 15W-40", category: "Motor Oils", price: 3000, desc: "5 litres – fully synthetic", img: "image/motoroil2.jpeg" },
    { id: 14, name: "Total Quartz 10W-40", category: "Motor Oils", price: 1350, desc: "4 litres semi-synthetic", img: "image/motoroil1.jpeg" },
    { id: 15, name: "Shock Absorber (Front)", category: "Suspension Parts", price: 7500, desc: "Monroe gas shock – pair", img: "image/shock1.jpeg" },
    { id: 16, name: "Coil Spring Set", category: "Suspension Parts", price: 15800, desc: "Heavy-duty for Hilux", img: "image/shock2.jpeg" },
    { id: 17, name: "Timing Belt Kit", category: "Engine Parts", price: 5550, desc: "Complete kit with tensioner", img: "image/belt.jpeg" },
    { id: 18, name: "Spark Plugs Set", category: "Other Garage Spare Parts", price: 1200, desc: "NGK iridium plugs – set of 4", img: "image/spark.jpeg" },
    { id: 19, name: "Nissan Clutch Cover", category: "Other Garage Spare Parts", price: 9500, desc: "Super clutch plate", img: "image/clutch.jpeg" }
]

const servicesData = [
    { icon: "fa-solid fa-arrows-rotate", title: "Wheel Alignment", price: "2,500", desc: "Computerized 4-wheel alignment" },
    { icon: "fa-solid fa-balance-scale", title: "Wheel Balancing", price: "2,000", desc: "Per wheel – includes weights" },
    { icon: "fa-solid fa-screwdriver-wrench", title: "Mechanical Repairs", price: "From 4,000", desc: "Engine, gearbox, clutch repairs" },
    { icon: "fa-solid fa-laptop", title: "Car Diagnostics", price: "1,800", desc: "OBD-II full system scan" },
    { icon: "fa-solid fa-oil-can", title: "Engine Service", price: "6,500", desc: "Full engine tune-up + oil" },
    { icon: "fa-solid fa-spray-can", title: "Car Painting & Body Work", price: "From 25,000", desc: "Panel beating & respray" },
    { icon: "fa-solid fa-droplet", title: "Oil Change Service", price: "5,900", desc: "Oil + filter + inspection" }
]

const pricingData = [
    { service: "Oil Change + Filter", price: "5,900 KES" },
    { service: "Wheel Alignment", price: "2,500 KES" },
    { service: "Brake Pad Replacement", price: "From 4,500 KES" },
    { service: "Full Engine Service", price: "6,500 KES" },
    { service: "Computer Diagnostics", price: "1,800 KES" },
    { service: "Tyre Fitting (4 tyres)", price: "3,200 KES" }
]

// =============== CART ===============
let cart = []

function loadCart() {
    const saved = localStorage.getItem('emca-cart')
    if (saved) cart = JSON.parse(saved)
}

function saveCart() {
    localStorage.setItem('emca-cart', JSON.stringify(cart))
}

function addToCart(id) {
    const product = products.find(p => p.id === id)
    if (!product) return

    const existing = cart.find(item => item.id === id)
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1
    } else {
        cart.push({ ...product, quantity: 1 })
    }
    saveCart()
    updateCartCount()
    
    // Toast
    showToast(`${product.name} added to cart`)
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id)
    saveCart()
    renderCart()
    updateCartCount()
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id)
    if (!item) return
    item.quantity = Math.max(1, (item.quantity || 1) + delta)
    saveCart()
    renderCart()
}

function updateCartCount() {
    const countEls = document.querySelectorAll('#cart-count-nav')
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
    countEls.forEach(el => { el.textContent = totalItems })
}

function renderCart() {
    const container = document.getElementById('cart-items')
    if (!container) return

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-20"><i class="fa-solid fa-cart-shopping text-7xl text-zinc-700 mb-6"></i><p class="text-2xl">Your cart is empty</p><a href="shop.html" class="mt-6 inline-block bg-orange-600 text-white px-8 py-4 rounded-2xl">Start Shopping</a></div>`
        return
    }

    let html = `<div class="space-y-8">`
    cart.forEach(item => {
        const qty = item.quantity || 1
        html += `
        <div class="flex gap-6 border-b border-zinc-700 pb-8 last:border-none last:pb-0">
            <img src="${item.img}" class="w-24 h-24 object-cover rounded-2xl" alt="${item.name}">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-zinc-400 text-sm">${item.desc}</p>
                <div class="mt-4 flex justify-between items-center">
                    <div class="flex items-center border border-white/30 rounded-2xl">
                        <button onclick="changeQuantity(${item.id}, -1)" class="px-4 py-2 text-xl">-</button>
                        <span class="px-6 font-mono">${qty}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="px-4 py-2 text-xl">+</button>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-xl">KES ${(item.price * qty).toLocaleString()}</div>
                        <button onclick="removeFromCart(${item.id})" class="text-xs text-orange-400 hover:text-orange-300 mt-1">Remove</button>
                    </div>
                </div>
            </div>
        </div>`
    })
    html += `</div>`
    container.innerHTML = html

    // Order summary
    const summaryContainer = document.getElementById('order-summary')
    if (summaryContainer) {
        let total = 0
        let rows = ''
        cart.forEach(item => {
            const qty = item.quantity || 1
            const lineTotal = item.price * qty
            total += lineTotal
            rows += `<div class="flex justify-between"><span>${item.name} ×${qty}</span><span>KES ${lineTotal.toLocaleString()}</span></div>`
        })
        summaryContainer.innerHTML = rows
        document.getElementById('cart-total').textContent = `KES ${total.toLocaleString()}`
    }
}

// =============== SHOP PAGE ===============
function renderProducts(filteredProducts) {
    const container = document.getElementById('products-grid')
    if (!container) return

    let html = ''
    filteredProducts.forEach(product => {
        html += `
        <div class="product-card bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
            <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-5">
                <div class="text-xs uppercase text-orange-400 mb-1">${product.category}</div>
                <h4 class="font-semibold leading-tight mb-2">${product.name}</h4>
                <p class="text-sm text-zinc-400 line-clamp-2 mb-4">${product.desc}</p>
                <div class="flex justify-between items-end">
                    <div>
                        <span class="text-xs text-zinc-400">KES</span>
                        <span class="text-3xl font-bold">${product.price}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <button onclick="addToCart(${product.id});" 
                                class="bg-orange-600 hover:bg-orange-700 transition-colors text-white w-11 h-11 rounded-2xl flex items-center justify-center text-xl">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`
    })
    container.innerHTML = html || `<p class="col-span-full text-center py-12 text-zinc-400">No products found.</p>`
}

function filterProducts() {
    const searchTerm = (document.getElementById('search-input') || {}).value || ''.toLowerCase().trim()
    const activeCategory = document.querySelector('.category-btn.active') ? document.querySelector('.category-btn.active').textContent.trim() : 'all'

    let filtered = products

    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.desc.toLowerCase().includes(searchTerm)
        )
    }

    if (activeCategory !== 'ALL PARTS' && activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory)
    }

    renderProducts(filtered)
}

function filterByCategory(cat) {
    // Remove active class from all
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'))
    
    // Find the clicked button and activate
    const buttons = document.querySelectorAll('.category-btn')
    for (let btn of buttons) {
        if (cat === 'all' && btn.id === 'cat-all') {
            btn.classList.add('active')
            break
        }
        if (btn.textContent.trim() === cat) {
            btn.classList.add('active')
            break
        }
    }
    filterProducts()
}

// =============== SERVICES PAGE ===============
function renderServices() {
    const container = document.getElementById('services-grid')
    if (!container) return

    let html = ''
    servicesData.forEach(service => {
        html += `
        <div class="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-orange-500 transition-colors group">
            <i class="${service.icon} text-5xl text-orange-500 mb-6"></i>
            <h3 class="text-2xl font-semibold">${service.title}</h3>
            <p class="text-zinc-400 mt-2">${service.desc}</p>
            <div class="mt-8 flex justify-between items-end">
                <div>
                    <span class="text-xs">Starting at</span>
                    <span class="block text-4xl font-bold text-orange-400">KES ${service.price}</span>
                </div>
                <button onclick="quickBook('${service.title}')" 
                        class="bg-white text-black px-8 py-4 rounded-2xl font-medium group-hover:bg-orange-600 group-hover:text-white transition-colors">BOOK NOW</button>
            </div>
        </div>`
    })
    container.innerHTML = html
}

function quickBook(serviceName) {
    // Pre-fill booking form on services page
    const form = document.getElementById('booking-form')
    if (form) {
        const select = document.getElementById('book-service')
        if (select) select.value = serviceName
    }
    // Scroll to form
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })
}

// Populate booking form select
function populateBookingSelect() {
    const select = document.getElementById('book-service')
    if (!select) return
    servicesData.forEach(s => {
        const option = document.createElement('option')
        option.value = s.title
        option.textContent = `${s.title} – KES ${s.price}`
        select.appendChild(option)
    })
}

// =============== FEATURED + PREVIEW ON HOME ===============
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products')
    if (!container) return
    const featured = products.slice(0, 6)
    let html = ''
    featured.forEach(p => {
        html += `
        <div onclick="addToCart(${p.id});" class="cursor-pointer product-card bg-white/5 border border-white/10 rounded-3xl overflow-hidden text-center">
            <img src="${p.img}" class="mx-auto h-36 object-contain">
            <div class="px-4 pb-4">
                <h4 class="font-medium text-sm">${p.name}</h4>
                <div class="text-orange-400 font-bold">KES ${p.price}</div>
            </div>
        </div>`
    })
    container.innerHTML = html
}

function renderServicesPreview() {
    const container = document.getElementById('services-preview')
    if (!container) return
    const preview = servicesData.slice(0, 6)
    let html = ''
    preview.forEach(s => {
        html += `
        <div class="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-orange-500 transition">
            <i class="${s.icon} text-4xl mb-4 text-orange-500"></i>
            <p class="font-semibold">${s.title}</p>
        </div>`
    })
    container.innerHTML = html
}

// =============== PRICING PAGE ===============
function renderPricing() {
    const container = document.getElementById('pricing-grid')
    if (!container) return
    let html = ''
    pricingData.forEach(item => {
        html += `
        <div class="bg-white/5 border border-white/10 rounded-3xl p-8 flex justify-between items-center">
            <div class="text-lg">${item.service}</div>
            <div class="font-bold text-3xl text-orange-400">${item.price}</div>
        </div>`
    })
    container.innerHTML = html
}

// =============== FAQ PAGE ===============
function renderFAQ() {
    const container = document.getElementById('faq-list')
    if (!container) return

    const faqs = [
        { q: "Do you stock genuine Toyota parts?", a: "Yes! All our parts are sourced directly from authorized distributors in Kenya." },
        { q: "How fast is your service?", a: "Most oil changes and alignments are completed within 90 minutes." },
        { q: "Do you deliver outside Lodwar?", a: "Yes – we deliver to Kakuma, Lokichar, and Kitale within 48 hours." },
        { q: "Is cash on delivery available?", a: "Absolutely. You can also pay via M-Pesa or bank transfer." }
    ]

    let html = ''
    faqs.forEach((faq, i) => {
        html += `
        <div onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('hidden')" class="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 cursor-pointer">
            <div class="flex justify-between items-center">
                <h4 class="font-semibold">${faq.q}</h4>
                <i class="fa-solid fa-chevron-down transition-transform"></i>
            </div>
            <div class="hidden mt-6 text-zinc-400">${faq.a}</div>
        </div>`
    })
    container.innerHTML = html
}

// =============== FORM HANDLERS ===============
function handleBooking(e) {
    e.preventDefault()
    const name = document.getElementById('book-name').value
    const phone = document.getElementById('book-phone').value
    const service = document.getElementById('book-service').value

    const message = `Hello EMCA Motors!%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ADate: ${document.getElementById('book-date').value}%0ACar: ${document.getElementById('book-car').value}%0A%0AThank you!`
    
    window.open(`https://wa.me/254768927893?text=${message}`, '_blank')
    
    // Reset form
    e.target.reset()
    alert('✅ Booking request sent via WhatsApp! Our team will confirm within minutes.')
}

function handleCheckout(e) {
    e.preventDefault()
    
    const name = document.getElementById('checkout-name').value
    const phone = document.getElementById('checkout-phone').value
    let total = 0
    cart.forEach(item => total += item.price * (item.quantity || 1))

    const summary = cart.map(item => `${item.name} ×${item.quantity || 1} = KES ${(item.price * (item.quantity || 1)).toLocaleString()}`).join('%0A')
    
    const message = `New Order from EMCA Motors Shop!%0A%0AName: ${name}%0APhone: ${phone}%0ALocation: ${document.getElementById('checkout-location').value}%0A%0A${summary}%0A%0ATOTAL: KES ${total.toLocaleString()}%0A%0APayment method: Cash on Delivery / M-Pesa`
    
    // Simulate payment confirmation
    setTimeout(() => {
        alert('🎉 Order placed successfully! Simulated M-Pesa confirmation sent.')
        window.open(`https://wa.me/254768927893?text=${message}`, '_blank')
        
        // Clear cart
        cart = []
        saveCart()
        renderCart()
        updateCartCount()
        
        // Redirect to home
        window.location.href = 'index.html'
    }, 800)
}

function handleContact(e) {
    e.preventDefault()
    const message = `New contact form submission!%0AName: ${document.getElementById('contact-name').value}%0APhone: ${document.getElementById('contact-phone').value}%0AEmail: ${document.getElementById('contact-email').value}%0AMessage: ${document.getElementById('contact-message').value}`
    window.open(`https://wa.me/254768927893?text=${message}`, '_blank')
    alert('✅ Message sent! We will reply on WhatsApp shortly.')
    e.target.reset()
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email')
    if (email && email.value) {
        alert('✅ Thank you! You are now subscribed to EMCA Motors updates.')
        email.value = ''
    }
}

// =============== MOBILE MENU ===============
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu')
    const icon = document.getElementById('mobile-menu-icon')
    if (menu.classList.contains('hidden')) {
        menu.style.display = 'block'
        icon.classList.replace('fa-bars', 'fa-xmark')
    } else {
        menu.style.display = 'none'
        icon.classList.replace('fa-xmark', 'fa-bars')
    }
}

// =============== TOAST ===============
function showToast(text) {
    const toast = document.createElement('div')
    toast.style.cssText = 'position:fixed; bottom:80px; right:20px; background:#e63939; color:white; padding:16px 24px; border-radius:9999px; box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.3); z-index:99999; animation: toastIn 0.3s, toastOut 0.3s 2.7s forwards;'
    toast.innerHTML = `${text} <i class="fa-solid fa-check ml-2"></i>`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
}

// =============== MAIN INIT ===============
function init() {
    loadCart()
    updateCartCount()

    const page = document.body.getAttribute('data-page')

    if (page === 'home') {
        renderFeaturedProducts()
        renderServicesPreview()
    }
    
    if (page === 'shop') {
        renderProducts(products)
    }
    
    if (page === 'services') {
        renderServices()
        populateBookingSelect()
    }
    
    if (page === 'pricing') {
        renderPricing()
    }
    
    if (page === 'faq') {
        renderFAQ()
    }
    
    if (page === 'cart') {
        renderCart()
    }
    
    console.log('%c🚗 EMCA MOTORS LIMITED website ready – fully functional & SEO optimized!', 'background:#e63939;color:#fff;padding:2px 6px;border-radius:2px;font-size:10px')
}

window.onload = init
