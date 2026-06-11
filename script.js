/* --- SMARTDINE CENTRAL STATE & ROUTER REGISTRY --- */
let appState = {
    currentTable: null,
    activeView: 'home-view',
    cart: JSON.parse(localStorage.getItem('royal_cart')) || [],
    activeServer: null
};
let activeCustomerTicketId = null; 

/* --- CENTRAL MOCK DATABASE ARRAY (ALL CATEGORIES) --- */
const MENU_DATA = [
    // STARTERS
    {
        id: "start_01",
        name: "Truffle-Parmesan Fries",
        category: "starters",
        price: 950,
        desc: "Crispy skin-on fries tossed in white truffle oil, grated Grana Padano, and fresh herbs.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "start_02",
        name: "Crispy Chicken Wings",
        category: "starters",
        price: 1250,
        desc: "Deep-fried marinated wings coated with house-made spicy bourbon glaze and pickled red onions.",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "start_03",
        name: "Stuffed Mushroom Chicken",
        category: "starters",
        price: 890,
        desc: "Roasted chicken with cheese paired with savory mushroom cream cheese, garlic infusion, and golden breadcrumbs.",
        image: "https://images.unsplash.com/photo-1677051707481-d0d4447ccd6c?q=80&w=870&auto=format&fit=crop"
    },
    {
        id: "start_04",
        name: "Cheesy Garlic Strips",
        category: "starters",
        price: 790,
        desc: "Warm artisanal flatbread brushed with seasoned herb butter, loaded with melted mozzarella.",
        image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=500&auto=format&fit=crop"
    },
    // MAINS
    {
        id: "main_01",
        name: "The Smokehouse Burger",
        category: "mains",
        price: 1650,
        desc: "Prime beef patty, smoked provolone, crispy onions, candied jalapeño bacon, and a signature whiskey BBQ sauce on a brioche bun.",
        image: "https://images.unsplash.com/photo-1680352857479-2a560bbb98bc?q=80&w=387&auto=format&fit=crop"
    },
    {
        id: "main_02",
        name: "Battered Fish & Chips",
        category: "mains",
        price: 1550,
        desc: "Wild-caught cod dipped in a house IPA batter, served with malt vinegar fries and charred lemon caper remoulade.",
        image: "https://images.unsplash.com/photo-1706711053549-f52f73a8960c?q=80&w=875&auto=format&fit=crop"
    },
    {
        id: "main_03",
        name: "Charbroiled Tarragon Chicken",
        category: "mains",
        price: 1490,
        desc: "Flame-grilled chicken fillets drizzled in smooth, velvety french tarragon cream reduction.",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "main_04",
        name: "Premium Alfred Pasta",
        category: "mains",
        price: 1390,
        desc: "Fettuccine noodles tossed in rich butter, heavy cream, parmesan shavings, and seasoned pan-seared strips.",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=500&auto=format&fit=crop"
    },
    // DESSERTS
    {
        id: "des_01",
        name: "Skillet Cookie Sundae",
        category: "desserts",
        price: 850,
        desc: "Warm chocolate chip skillet cookie topped with vanilla bean ice cream and salted caramel drizzle.",
        image: "https://images.unsplash.com/photo-1633981823231-2a2a7c9b014c?q=80&w=870&auto=format&fit=crop"
    },
    {
        id: "des_02",
        name: "Molten Lava Chocolate Cake",
        category: "desserts",
        price: 790,
        desc: "Decadent dark chocolate shell holding a hot liquid fudge center, served alongside premium cream scoop.",
        image: "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=580&auto=format&fit=crop"
    },
    {
        id: "des_03",
        name: "Traditional Pista Kheer",
        category: "desserts",
        price: 450,
        desc: "Slow-churned aromatic cardamom rice pudding thick with crushed pistachios, almonds, and silver vark.",
        image: "https://images.unsplash.com/photo-1708782340713-02d0c39ea404?q=80&w=580&auto=format&fit=crop"
    },
    // BEVERAGES
    {
        id: "bev_01",
        name: "Mint Margarita",
        category: "drinks",
        price: 390,
        desc: "A refreshing blend of fresh mint leaves, lime juice, and crushed ice topped with soda.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "bev_02",
        name: "Classic Cold Coffee",
        category: "drinks",
        price: 490,
        desc: "Rich espresso blended with chilled milk, sugar, and a scoop of velvety vanilla ice cream.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "bev_03",
        name: "Fresh Seasonal Juice",
        category: "drinks",
        price: 450,
        desc: "Pure, cold-pressed seasonal fruits served chilled without any added artificial sweeteners.",
        image: "https://plus.unsplash.com/premium_photo-1663091544172-794c537af00c?q=80&w=387&auto=format&fit=crop"
    }
    ,
    {
        id: "bev_04",
        name: "Peach Iced Tea",
        category: "drinks",
        price: 350,
        desc: "Brewed black tea infused with natural peach syrup, served over cracked ice with fresh lemon.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "bev_05",
        name: "Blue Lagoon Mocktail",
        category: "drinks",
        price: 420,
        desc: "A vibrant blend of blue curaçao syrup, lemon juice, and clear sparkling spritz.",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: "bev_06",
        name: "Green Tea",
        category: "drinks",
        price: 290,
        desc: "Steeped organic jasmine green tea leaves served hot with fresh mint and a side of local honey.",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=500&auto=format&fit=crop"
    }
];

/* --- APPLICATION INITIALIZATION BOOTSTRAP --- */
document.addEventListener('DOMContentLoaded', () => {
    initAppRouting();
    initNavigationListeners();
    syncCartBadgeCount();
    renderMenuCatalog('all');
    initLayoutModeToggles();
    initCartDrawerAnimations();
    renderKitchenDashboardLanes();

    const checkoutFormElement = document.getElementById('checkout-shipping-gateway-form');
    if (checkoutFormElement) {
        checkoutFormElement.addEventListener('submit', window.processFinalOrderDispatch);
    }
});

/* --- CORE CUSTOMER CATALOG DESIGN BUILDER --- */
function renderMenuCatalog(filteredCategory = 'all') {
    const catalogCanvas = document.getElementById('menu-grid-catalog');
    if (!catalogCanvas) return;

    const itemsToDisplay = filteredCategory === 'all'
        ? MENU_DATA
        : MENU_DATA.filter(item => item.category === filteredCategory);

    catalogCanvas.innerHTML = itemsToDisplay.map(item => `
        <div class="product-item-card">
            <div class="image-wrapper-frame">
                <img src="${item.image}" alt="${item.name}">
                <div class="floating-price-tag">PKR ${item.price}</div>
                <button class="quick-add-cart-btn" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="product-info-block">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join('');

    const indicatorText = document.getElementById('items-found-indicator');
    if (indicatorText) {
        indicatorText.innerText = `${filteredCategory.toUpperCase()} COLLECTION (${itemsToDisplay.length} Items Available)`;
    }
}

window.filterMenuCatalog = function (category, buttonElement) {
    document.querySelectorAll('#menu-view .category-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');
    renderMenuCatalog(category);
};

window.setCatalogLayoutMode = function (mode) {
    const catalogCanvas = document.getElementById('menu-grid-catalog');
    const gridBtn = document.getElementById('toggle-grid-btn');
    const listBtn = document.getElementById('toggle-list-btn');

    if (!catalogCanvas) return;

    if (mode === 'grid') {
        catalogCanvas.className = 'grid-layout-activated';
        if (gridBtn) gridBtn.classList.add('active-toggle-btn');
        if (listBtn) listBtn.classList.remove('active-toggle-btn');
    } else {
        catalogCanvas.className = 'list-layout-activated';
        if (listBtn) listBtn.classList.add('active-toggle-btn');
        if (gridBtn) gridBtn.classList.remove('active-toggle-btn');
    }
};

function initAppRouting() {
    const urlParameters = new URLSearchParams(window.location.search);
    const tableId = urlParameters.get('table');

    const publicNavbarLinks = document.getElementById('public-links');
    const qrTableBadgeElement = document.getElementById('table-badge');
    const dynamicHeroGreeting = document.getElementById('customer-greeting');

    if (tableId) {
        appState.currentTable = tableId;
        if (publicNavbarLinks) publicNavbarLinks.style.display = 'none';
        if (qrTableBadgeElement) {
            qrTableBadgeElement.classList.remove('hidden-element');
            qrTableBadgeElement.innerText = `Table #${tableId}`;
        }
        if (dynamicHeroGreeting) {
            dynamicHeroGreeting.innerHTML = `Welcome to Table <span>#${tableId}</span>`;
        }
        switchActivePortalView('menu-view');
    } else {
        switchActivePortalView('home-view');
    }
}

function initNavigationListeners() {
    document.querySelectorAll('.nav-trigger').forEach(triggerBtn => {
        triggerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionStringId = triggerBtn.getAttribute('data-view');
            if (targetSectionStringId) switchActivePortalView(targetSectionStringId);
        });
    });
}

window.switchActivePortalView = function (targetViewId) {
    document.querySelectorAll('.view-section').forEach(sectionBlock => sectionBlock.classList.remove('active'));

    const targetDestinationDomNode = document.getElementById(targetViewId);
    if (targetDestinationDomNode) {
        appState.activeView = targetViewId;
        targetDestinationDomNode.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-trigger').forEach(el => {
        if (el.getAttribute('data-view') === targetViewId) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
};

function initLayoutModeToggles() {
    const gridBtn = document.getElementById('toggle-grid-btn');
    const listBtn = document.getElementById('toggle-list-btn');
    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => window.setCatalogLayoutMode('grid'));
        listBtn.addEventListener('click', () => window.setCatalogLayoutMode('list'));
    }
}

/* --- DRIVER FLYOUT BASKET SYSTEM LOGIC --- */
function initCartDrawerAnimations() {
    const cartIconWidget = document.getElementById('cart-icon');
    const closeDrawerTrigger = document.getElementById('close-drawer-trigger-btn');
    const maskOverlay = document.getElementById('drawer-backdrop-mask');
    const flyoutDrawer = document.getElementById('global-flyout-drawer');

    if (cartIconWidget && closeDrawerTrigger && maskOverlay && flyoutDrawer) {
        cartIconWidget.addEventListener('click', () => {
            maskOverlay.classList.add('active-mask');
            flyoutDrawer.classList.add('active-drawer');
            renderDrawerBasketContents();
        });

        const closeDrawer = () => {
            maskOverlay.classList.remove('active-mask');
            flyoutDrawer.classList.remove('active-drawer');
        };

        closeDrawerTrigger.addEventListener('click', closeDrawer);
        maskOverlay.addEventListener('click', closeDrawer);
    }
}

window.addToCart = (itemName, itemPrice) => {
    const existingMatch = appState.cart.find(el => el.name === itemName);
    if (existingMatch) {
        existingMatch.quantity += 1;
    } else {
        appState.cart.push({ id: Date.now(), name: itemName, price: itemPrice, quantity: 1 });
    }
    localStorage.setItem('royal_cart', JSON.stringify(appState.cart));
    syncCartBadgeCount();
    document.getElementById('cart-icon').click();
};

window.removeBasketItem = (itemIdToStrip) => {
    appState.cart = appState.cart.filter(el => el.id !== itemIdToStrip);
    localStorage.setItem('royal_cart', JSON.stringify(appState.cart));
    syncCartBadgeCount();
    renderDrawerBasketContents();
};

function syncCartBadgeCount() {
    const trackingBadgeCounter = document.getElementById('cart-count');
    if (trackingBadgeCounter) {
        trackingBadgeCounter.innerText = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function renderDrawerBasketContents() {
    const bodyPane = document.getElementById('active-cart-items-list');
    const totalAccumulationElement = document.getElementById('cart-total-accumulation-amount');

    if (!bodyPane) return;

    if (appState.cart.length === 0) {
        bodyPane.innerHTML = `<p style="text-align:center; padding: 40px 0; color: var(--text-muted);">No items staged in cart yet.</p>`;
        if (totalAccumulationElement) totalAccumulationElement.innerText = `PKR 0`;
        return;
    }

    bodyPane.innerHTML = appState.cart.map(item => `
        <div class="cart-item-row" style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(0,0,0,0.05);">
            <div>
                <h4>${item.name}</h4>
                <p style="font-size:0.85rem; color: var(--text-muted);">Qty: ${item.quantity} &times; PKR ${item.price}</p>
            </div>
            <div style="text-align:right;">
                <span style="font-weight:bold; display:block;">PKR ${item.price * item.quantity}</span>
                <button onclick="removeBasketItem(${item.id})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.1rem;">&times;</button>
            </div>
        </div>
    `).join('');

    const calculatedBillSum = appState.cart.reduce((sum, el) => sum + (el.price * el.quantity), 0);
    if (totalAccumulationElement) totalAccumulationElement.innerText = `PKR ${calculatedBillSum.toLocaleString()}`;
}

/* --- SIMULATED KITCHEN DATA STORAGE LINES --- */
let kitchenTicketsPipeline = [
    { id: 101, table: "BYOD-Table 04", items: ["1x Classic Smokehouse Burger"], status: "prep" },
    { id: 102, table: "BYOD-Table 12", items: ["2x Premium Alfred Pasta"], status: "cooking" }
];

window.renderKitchenDashboardLanes = function() {
    const prepContainer = document.getElementById('queue-prep-cards');
    const cookingContainer = document.getElementById('queue-cooking-cards');
    if (!prepContainer || !cookingContainer) return;

    prepContainer.innerHTML = '';
    cookingContainer.innerHTML = '';

    let countPrep = 0, countCooking = 0;

    kitchenTicketsPipeline.forEach(ticket => {
        const cardElement = document.createElement('div');
        cardElement.className = 'kitchen-ticket-card';
        cardElement.style = "background: var(--bg-pill-inactive); padding:15px; border-radius:10px; margin-bottom:12px; border:1px solid var(--border-subtle);";

        let itemsListHTML = ticket.items.map(i => `<li>${i}</li>`).join('');

        cardElement.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:10px; border-bottom:1px dashed rgba(0,0,0,0.1); padding-bottom:5px;">
                <span>Ref: #${ticket.id}</span>
                <span>${ticket.table}</span>
            </div>
            <ul style="margin-left:15px; margin-bottom:12px; font-size:0.9rem;">${itemsListHTML}</ul>
            <button onclick="advanceTicketState(${ticket.id})" style="width:100%; padding:8px; border-radius:6px; background:var(--bg-card); border:1px solid var(--text-muted); cursor:pointer; font-weight:600; font-family:inherit;">
                ${ticket.status === 'prep' ? '🔥 Push to Cookline' : '✅ Ready to Serve'}
            </button>
        `;

        if (ticket.status === 'prep') {
            prepContainer.appendChild(cardElement);
            countPrep++;
        } else if (ticket.status === 'cooking') {
            cookingContainer.appendChild(cardElement);
            countCooking++;
        }
    });

    if (document.getElementById('count-pending')) document.getElementById('count-pending').innerText = countPrep;
    if (document.getElementById('count-cooking')) document.getElementById('count-cooking').innerText = countCooking;
};

window.advanceTicketState = function (ticketId) {
    let ticket = kitchenTicketsPipeline.find(t => t.id === ticketId);
    if (!ticket) return;

    if (ticket.status === 'prep') {
        ticket.status = 'cooking';

        if (ticketId === activeCustomerTicketId) {
            const stepPrep = document.getElementById('step-prep');
            const stepCooking = document.getElementById('step-cooking');
            if (stepPrep) stepPrep.className = 'timeline-step completed-step';
            if (stepCooking) stepCooking.className = 'timeline-step active-step';
        }
    } else if (ticket.status === 'cooking') {
        kitchenTicketsPipeline = kitchenTicketsPipeline.filter(t => t.id !== ticketId);

        if (ticketId === activeCustomerTicketId) {
            const stepCooking = document.getElementById('step-cooking');
            const stepReady = document.getElementById('step-ready');
            if (stepCooking) stepCooking.className = 'timeline-step completed-step';
            if (stepReady) stepReady.className = 'timeline-step active-step';

            setTimeout(() => {
                alert("🍽️ Your order has arrived at your table! Enjoy your meal.");
            }, 600);
        }
    }
    renderKitchenDashboardLanes();
};

window.triggerStaffGate = function () {
    window.switchActivePortalView('staff-gate-view');
    window.clearPinDisplay();
};

/* --- WEB CUSTOMER SIGN SHIPPING DISPATCH --- */
window.executeCartCheckout = function () {
    if (appState.cart.length === 0) return alert("Staged cart is empty!");

    const mask = document.getElementById('drawer-backdrop-mask');
    const drawer = document.getElementById('global-flyout-drawer');
    if (mask && drawer) {
        mask.classList.remove('active-mask');
        drawer.classList.remove('active-drawer');
    }

    window.switchActivePortalView('checkout-page-view');

    const summaryContainer = document.getElementById('checkout-summary-items-list');
    if (summaryContainer) {
        let totalSum = 0;
        summaryContainer.innerHTML = appState.cart.map(item => {
            totalSum += (item.price * item.quantity);
            return `<li style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.95rem;">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>PKR ${(item.price * item.quantity).toLocaleString()}</span>
                    </li>`;
        }).join('');
        document.getElementById('checkout-page-grand-total').innerText = `PKR ${totalSum.toLocaleString()}`;
    }

    const sub = document.getElementById('checkout-context-subtitle');
    const addWrap = document.getElementById('address-input-wrapper');
    const addIn = document.getElementById('page-cust-address');

    if (appState.currentTable) {
        if (sub) sub.innerText = `📍 Live Station Dining: BYOD-Table #${appState.currentTable}`;
        if (addWrap) addWrap.style.display = 'none';
        if (addIn) addIn.required = false;
    } else {
        if (sub) sub.innerText = "📦 Online Order Delivery Gateway Module";
        if (addWrap) addWrap.style.display = 'flex';
        if (addIn) addIn.required = true;
    }
};

window.returnToCatalogMenu = function () { window.switchActivePortalView('menu-view'); };
window.handleReservationSubmit = function (event) {
    event.preventDefault();
    const guestName = document.getElementById('res-name').value;
    alert(`📅 Thank you ${guestName}! Your table reservation request has been booked successfully.`);
    event.target.reset();
    window.switchActivePortalView('home-view');
};  

window.processFinalOrderDispatch = function (event) {
    event.preventDefault();

    // Safe fallbacks to prevent errors if elements aren't present in the DOM yet
    const nameInputEl = document.getElementById('page-cust-name');
    const guestName = nameInputEl ? nameInputEl.value.trim() : "Valued Guest";

    const guestPhone = document.getElementById('page-cust-phone').value.trim();
    const guestAddress = document.getElementById('page-cust-address') ? document.getElementById('page-cust-address').value.trim() : "";

    const uniqueTrackingToken = Math.floor(100 + Math.random() * 900);
    let dynamicLocationLabel = "";
    let alertReceiptMessage = "";

    if (appState.currentTable) {
        dynamicLocationLabel = `BYOD-Table ${appState.currentTable} (${guestName})`;
        alertReceiptMessage = `🍽️ Table Order Dispatched Successfully!\n──────────────────\n👤 Guest Name: ${guestName}\n📱 Phone Contact: ${guestPhone}\n📍 Location: Table #${appState.currentTable}\n🎟️ Ticket Ref: #${uniqueTrackingToken}`;
    } else {
        dynamicLocationLabel = `Web Order (${guestName})`;
        alertReceiptMessage = `🎉 Website Order Placed Successfully!\n──────────────────\n👤 Customer Name: ${guestName}\n📱 Phone Contact: ${guestPhone}\n🏠 Address: ${guestAddress}\n📦 Order Number: #WEB-${uniqueTrackingToken}`;
    }

    const compiledItemsList = appState.cart.map(item => `${item.quantity}x ${item.name}`);

    kitchenTicketsPipeline.push({
        id: uniqueTrackingToken,
        table: dynamicLocationLabel,
        items: compiledItemsList,
        status: "prep"
    });

    activeCustomerTicketId = uniqueTrackingToken;
    const trackerBox = document.getElementById('customer-live-tracker');
    if (trackerBox) {
        const trackIdText = document.getElementById('track-ticket-id');
        if (trackIdText) trackIdText.innerText = appState.currentTable ? `#${uniqueTrackingToken}` : `#WEB-${uniqueTrackingToken}`;
        trackerBox.style.display = 'block';

        // Reset steps view back to baseline state metrics tracking parameters
        const stepPrep = document.getElementById('step-prep');
        const stepCooking = document.getElementById('step-cooking');
        const stepReady = document.getElementById('step-ready');
        if (stepPrep) stepPrep.className = 'timeline-step active-step';
        if (stepCooking) stepCooking.className = 'timeline-step';
        if (stepReady) stepReady.className = 'timeline-step';
    }

    // Clean cart and data variables
    appState.cart = [];
    localStorage.removeItem('royal_cart');

    // Adjusted form reference ID to safely match 'checkout-shipping-gateway-form' seamlessly
    const activeForm = document.getElementById('checkout-shipping-gateway-form');
    if (activeForm) activeForm.reset();

    if (typeof syncCartBadgeCount === 'function') syncCartBadgeCount();

    window.returnToCatalogMenu();
    alert(alertReceiptMessage);

    if (typeof renderKitchenDashboardLanes === 'function') renderKitchenDashboardLanes();
};

/* ==========================================================================
   --- SECURITY PASSKEY INPUT & CRITICAL POS ROUTING LINKS ---
   ========================================================================== */
let transientPinBuffer = "";

window.pressPinKey = function (digit) {
    const pinDisplay = document.getElementById('staff-pin-display');
    if (!pinDisplay || transientPinBuffer.length >= 4) return;
    transientPinBuffer += digit;
    pinDisplay.value = transientPinBuffer;
};

window.clearPinDisplay = function () {
    const pinDisplay = document.getElementById('staff-pin-display');
    if (pinDisplay) { transientPinBuffer = ""; pinDisplay.value = ""; }
};

window.verifyStaffCredentials = function(event) {
    if (event) event.preventDefault();
    
    const selectedServer = document.getElementById('staff-server-name').value;
    if (!selectedServer) {
        alert("❌ Please select your employee profile account identity.");
        return;
    }
    
    if (transientPinBuffer === "1234") {
        appState.activeServer = selectedServer;
        alert(`🔓 Terminal Unlocked. Welcome, ${appState.activeServer}!`);
        
        window.clearPinDisplay();
        
        // Formally route inside the fully responsive POS Workspace Terminal
        window.switchActivePortalView('pos-terminal-view');
        
        const nameDisplayNode = document.getElementById('pos-server-name-display');
        if (nameDisplayNode) nameDisplayNode.innerText = appState.activeServer;
        
        window.renderPOSMenu('all');
    } else {
        alert("❌ Invalid PIN. (Hint: Use 1234)");
        window.clearPinDisplay();
    }
};

window.logoutFromPOS = function () {
    appState.activeServer = null;
    alert("🔒 POS Node Session Locked.");
    window.switchActivePortalView('home-view');
};

/* ==========================================================================
   --- CENTRAL RESPONSIVE COMPACT POINT OF SALE LOGIC ENGINE ---
   ========================================================================= */
let posCart = [];

window.renderPOSMenu = function (category = 'all') {
    const container = document.getElementById('pos-grid-container');
    if (!container) return;

    const items = category === 'all' ? MENU_DATA : MENU_DATA.filter(item => item.category === category);

    container.innerHTML = items.map(item => `
        <div class="product-item-card" style="background: var(--bg-pill-inactive); padding: 10px; border-radius:12px; cursor: pointer; border: 1px solid var(--border-subtle);" onclick="window.addToPOSCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
            <div style="height:100px; width:100%; border-radius:8px; overflow:hidden; margin-bottom:8px;">
                <img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h4 style="font-size:0.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</h4>
            <span style="font-size:0.8rem; font-weight:bold; color:var(--primary-accent);">PKR ${item.price}</span>
        </div>
    `).join('');
};

window.filterPOSMenu = function (category, buttonElement) {
    document.querySelectorAll('#pos-terminal-view .category-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');
    window.renderPOSMenu(category);
};

window.addToPOSCart = function (itemName, itemPrice) {
    const existingItem = posCart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        posCart.push({ id: Date.now(), name: itemName, price: itemPrice, quantity: 1 });
    }
    window.renderPOSCart();
};

window.renderPOSCart = function () {
    const cartContainer = document.getElementById('pos-cart-items');
    const totalElement = document.getElementById('pos-cart-total');
    if (!cartContainer) return;

    if (posCart.length === 0) {
        cartContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">No items added yet</p>';
        if (totalElement) totalElement.innerText = 'PKR 0';
        return;
    }

    cartContainer.innerHTML = posCart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border-subtle); font-size:0.9rem;">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">PKR ${item.price} &times; ${item.quantity}</div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-weight:bold;">PKR ${item.price * item.quantity}</span>
                <button onclick="window.removeFromPOSCart(${item.id})" style="background:none; border:none; color:#ef4444; font-weight:bold; cursor:pointer; font-size:1.1rem;">&times;</button>
            </div>
        </div>
    `).join('');

    const total = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalElement) totalElement.innerText = `PKR ${total.toLocaleString()}`;
};

window.removeFromPOSCart = function (itemId) {
    posCart = posCart.filter(item => item.id !== itemId);
    window.renderPOSCart();
};

window.clearPOSCart = function () {
    if (posCart.length === 0) return;
    if (confirm('Clear entire counter ticket?')) { posCart = []; window.renderPOSCart(); }
};

window.submitPOSOrderToKitchen = function () {
    if (posCart.length === 0) return alert("Cannot submit an empty ticket configurations mapping.");

    const ticketId = Math.floor(100 + Math.random() * 900);
    const itemsList = posCart.map(item => `${item.quantity}x ${item.name}`);

    kitchenTicketsPipeline.push({
        id: ticketId,
        table: `POS Terminal (Server: ${appState.activeServer || 'Unknown'})`,
        items: itemsList,
        status: "prep"
    });

    alert(`✅ Order Ticket #${ticketId} dispatched directly to kitchen layout pipelines! Switching to kitchen tracking dashboard screen view immediately...`);

    // Reset loop
    posCart = [];
    window.renderPOSCart();
    window.renderKitchenDashboardLanes();

    // Core step workflow feature link redirection: route straight to kitchen monitor lane dashboards instantly!
    window.switchActivePortalView('kitchen-view');
};

/* --- SECURE ADMINISTRATIVE MULTI-VIEW STATE LOGIC FLAGGING --- */
let isAdminAuthenticated = false;

window.switchActivePortalView = function (targetViewId) {
    appState.activeView = targetViewId;

    // Remove active markers across view layers completely
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => {
        v.classList.remove('active');
        v.style.display = 'none';
    });

    const target = document.getElementById(targetViewId);
    if (target) {
        target.classList.add('active');
        if (targetViewId === 'pos-terminal-view') {
            target.style.display = 'grid';
        } else {
            target.style.display = 'block';
        }
    }

    // Synchronize layout navigation tracking headers
    document.querySelectorAll('.nav-trigger').forEach(link => {
        if (link.getAttribute('data-view') === targetViewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ONE-WAY ISOLATION RULE CONTROLLER INTERCEPTOR
    // If a standard customer views the menu or home screen, guarantee the admin floating switch is hidden
    const floatingSwitchPanel = document.getElementById('admin-floating-toggle-switch-panel');
    if (floatingSwitchPanel) {
        if (isAdminAuthenticated && (targetViewId === 'admin-dashboard-view' || targetViewId === 'menu-view')) {
            floatingSwitchPanel.style.display = 'flex';
            
            // Adjust current styling highlighting state on the float switch buttons
            const toDashBtn = document.getElementById('switch-to-dashboard-action-btn');
            const toMenuBtn = document.getElementById('switch-to-menu-action-btn');
            if (targetViewId === 'admin-dashboard-view') {
                toDashBtn.classList.add('active-state');
                toMenuBtn.classList.remove('active-state');
            } else {
                toDashBtn.classList.remove('active-state');
                toMenuBtn.classList.add('active-state');
            }
        } else {
            floatingSwitchPanel.style.display = 'none';
        }
    }
};

/**
 * ADMINISTRATIVE LOGIN CREDENTIAL VERIFICATION SEQUENCE
 */
window.executeAdminAuthenticationGate = function(event) {
    if (event) event.preventDefault();
    
    const adminUser = document.getElementById('admin-username-field')?.value;
    const adminPass = document.getElementById('admin-password-field')?.value;
    
    // Set your presentation master validation keys here
    if (adminUser === "admin" && adminPass === "smartdine2026") {
        isAdminAuthenticated = true;
        
        // Securely wipe login credentials input caches immediately
        document.getElementById('admin-username-field').value = '';
        document.getElementById('admin-password-field').value = '';
        
        // Push view presentation layer straight to Dashboard home
        window.switchActivePortalView('admin-dashboard-view');
        window.renderAdminDashboardKitchenLanes();
    } else {
        alert("🚨 Access Violation: Invalid master administrator login parameters.");
    }
};

/**
 * ADMIN CONSOLE INTERNAL EXPLICIT ROUTING HOOK
 */
window.adminNavigateToView = function(targetViewId) {
    if (!isAdminAuthenticated) return;
    window.switchActivePortalView(targetViewId);
    if (targetViewId === 'admin-dashboard-view') {
        window.renderAdminDashboardKitchenLanes();
    }
};

window.terminateAdminSessionSecurely = function() {
    isAdminAuthenticated = false;
    window.switchActivePortalView('admin-login-view');
};

/**
 * ADMIN PIPELINE INTERACTIVE ENGINE REALTIME MONITOR
 * Pulls active order records and updates layout grids instantly
 */
window.renderAdminDashboardKitchenLanes = function() {
    const prepContainer = document.getElementById('dashboard-lane-prep-stack');
    const cookingContainer = document.getElementById('dashboard-lane-cooking-stack');
    
    if (!prepContainer || !cookingContainer) return;
    
    prepContainer.innerHTML = '';
    cookingContainer.innerHTML = '';
    
    let itemsInPrep = 0;
    let itemsInCooking = 0;
    
    kitchenTicketsPipeline.forEach(ticket => {
        const ticketCard = document.createElement('div');
        ticketCard.style.cssText = "background: var(--bg-canvas); border-left: 5px solid var(--secondary-pop); padding: 14px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);";
        ticketCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.85rem; margin-bottom:6px; border-bottom:1px solid var(--border-subtle); padding-bottom:4px;">
                <span>ID: #${ticket.id}</span>
                <span style="color:var(--primary-accent); font-size:0.75rem;">${ticket.table}</span>
            </div>
            <div style="font-size:0.9rem; font-weight:500; color:var(--text-main); margin-bottom:10px;">${ticket.items.join(', ')}</div>
            <button onclick="window.advanceTicketStageFromAdminConsole(${ticket.id})" style="width:100%; background:var(--primary-accent); color:white; border:none; padding:6px 12px; font-weight:bold; border-radius:4px; font-size:0.75rem; font-family: 'Poppins'; cursor:pointer;">
                ${ticket.status === 'prep' ? 'Push to Cookline' : 'Serve & Clear Order'}
            </button>
        `;
        
        if (ticket.status === 'prep') {
            prepContainer.appendChild(ticketCard);
            itemsInPrep++;
        } else if (ticket.status === 'cooking') {
            cookingContainer.appendChild(ticketCard);
            itemsInCooking++;
        }
    });
    
    if (itemsInPrep === 0) prepContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:30px 0; font-style:italic; font-size:0.85rem;">Pipeline clear.</p>';
    if (itemsInCooking === 0) cookingContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:30px 0; font-style:italic; font-size:0.85rem;">Burners empty.</p>';
};

window.advanceTicketStageFromAdminConsole = function(ticketId) {
    const targetTicket = kitchenTicketsPipeline.find(t => t.id === ticketId);
    if (!targetTicket) return;
    
    if (targetTicket.status === 'prep') {
        targetTicket.status = 'cooking';
    } else if (targetTicket.status === 'cooking') {
        kitchenTicketsPipeline = kitchenTicketsPipeline.filter(t => t.id !== ticketId);
    }
    
    // Synchronize both layout views at once
    window.renderAdminDashboardKitchenLanes();
    if (typeof window.renderKitchenDashboard === 'function') {
        window.renderKitchenDashboard();
    }
};