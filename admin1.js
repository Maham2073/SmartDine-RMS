/**
 * ==========================================================================
 * --- 1. CORE DATA BASELINES & STRUCTURAL PORTAL REGISTRIES ---
 * ==========================================================================
 */
const INITIAL_SANDBOX_MENU = [
    { itemId: "p1", name: "Gourmet Smokehouse Burger", price: 1650, category: "Mains", icon: "fa-hamburger" },
    { itemId: "p2", name: "Truffle Parmesan Fries", price: 950, category: "Starters", icon: "fa-hotdog" },
    { itemId: "p3", name: "Mint Margarita Fizz", price: 390, category: "Beverages", icon: "fa-glass-martini-alt" },
    { itemId: "p4", name: "Molten Fudge Lava Cake", price: 790, category: "Desserts", icon: "fa-ice-cream" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Run initialization loops smoothly
    initDashboardRouter();
    initMobileDrawerControls();
    initThemePersistEngine();
    initBrandSandboxEngine();
    initLogoutSessionHook();
});

/**
 * ==========================================================================
 * --- 2. MULTI-VIEW ROUTER & VIEWPORT COMPONENT CONTROLLER ---
 * ==========================================================================
 */
function initDashboardRouter() {
    const navLinks = document.querySelectorAll('.nav-link');
    const workspaceTitle = document.getElementById('workspace-view-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetSectionId = this.getAttribute('data-target');
            if (!targetSectionId) return;

            // 1. Shift Active Link Highlight
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // 2. Animate and Switch View Panels
            document.querySelectorAll('.tab-content').forEach(section => {
                section.classList.remove('active-viewport-section');
            });
            
            const destinationSection = document.getElementById(targetSectionId);
            if (destinationSection) {
                destinationSection.classList.add('active-viewport-section');
            }

            // 3. Update Title Header Bar Cleanly
            const labelTextNode = this.querySelector('span');
            if (workspaceTitle && labelTextNode) {
                workspaceTitle.innerText = labelTextNode.innerText;
            }

            // 4. Close Mobile Drawer Menu if open
            const sidebarDrawer = document.getElementById('sidebar');
            if (sidebarDrawer) sidebarDrawer.classList.remove('active-drawer');
        });
    });
}

/**
 * ==========================================================================
 * --- 3. MOBILE RESPONSIVE HAMBURGER NAVIGATION OVERLAY ---
 * ==========================================================================
 */
function initMobileDrawerControls() {
    const menuToggleBtn = document.getElementById('menu-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarDrawer = document.getElementById('sidebar');

    if (menuToggleBtn && sidebarDrawer) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebarDrawer.classList.add('active-drawer');
        });
    }

    if (closeSidebarBtn && sidebarDrawer) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebarDrawer.classList.remove('active-drawer');
        });
    }

    // Intercept clicks outside the viewport drawer layer to collapse effortlessly
    document.addEventListener('click', (event) => {
        if (sidebarDrawer && sidebarDrawer.classList.contains('active-drawer')) {
            if (!sidebarDrawer.contains(event.target) && !menuToggleBtn.contains(event.target)) {
                sidebarDrawer.classList.remove('active-drawer');
            }
        }
    });
}

/**
 * ==========================================================================
 * --- 4. PERSISTENT THEME ENGINE SWITCH MODULE ---
 * ==========================================================================
 */
function initThemePersistEngine() {
    const checkboxToggle = document.getElementById('theme-toggle-checkbox');
    const themeIcon = document.getElementById('theme-mode-icon');
    const themeText = document.getElementById('theme-mode-text');
    
    // Retrieve stored preferences, default directly to system dark configuration baseline
    const cachedActiveTheme = localStorage.getItem('smartdine_admin_theme') || 'dark';
    
    // Apply initial state configurations natively
    document.body.setAttribute('data-theme', cachedActiveTheme);
    if (checkboxToggle) {
        checkboxToggle.checked = (cachedActiveTheme === 'dark');
    }
    updateThemeLabelComponents(cachedActiveTheme);

    if (checkboxToggle) {
        checkboxToggle.addEventListener('change', function() {
            const selectedTheme = this.checked ? 'dark' : 'light';
            document.body.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('smartdine_admin_theme', selectedTheme);
            updateThemeLabelComponents(selectedTheme);
        });
    }

    function updateThemeLabelComponents(currentTheme) {
        if (!themeIcon || !themeText) return;
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeText.innerText = 'Dark Mode';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeText.innerText = 'Light Mode';
        }
    }
}

/**
 * ==========================================================================
 * --- 5. REAL-TIME BRAND VISUAL PREVIEW SANDBOX MECHANICS ---
 * ==========================================================================
 */
function initBrandSandboxEngine() {
    const nameInput = document.getElementById('input-name');
    const colorInput = document.getElementById('input-color');
    const layoutInput = document.getElementById('input-layout');
    
    const previewLogoText = document.getElementById('preview-logo-text');
    const previewNavbarElement = document.getElementById('preview-nav');
    const previewMenuContainer = document.getElementById('preview-menu-container');

    // Trigger initial render of card layouts into mock sandbox environment frame
    renderSandboxItems();

    if (nameInput && previewLogoText) {
        nameInput.addEventListener('input', function() {
            previewLogoText.innerText = this.value.trim() !== "" ? this.value.trim() : "The Royal Palate";
        });
    }

    if (colorInput && previewNavbarElement) {
        colorInput.addEventListener('input', function() {
            const localizedHexValue = this.value;
            previewNavbarElement.style.backgroundColor = localizedHexValue;
            
            // Adjust contrast dynamically: if background is yellow/light, ensure text stands out cleanly
            const colorRgb = hexToRgb(localizedHexValue);
            if (colorRgb) {
                const luminance = (0.299 * colorRgb.r + 0.587 * colorRgb.g + 0.114 * colorRgb.b) / 255;
                previewNavbarElement.style.color = luminance > 0.5 ? '#000000' : '#ffffff';
            }
        });
    }

    if (layoutInput && previewMenuContainer) {
        layoutInput.addEventListener('change', function() {
            if (this.value === 'grid') {
                previewMenuContainer.className = 'preview-grid-density';
            } else {
                previewMenuContainer.className = 'preview-list-density';
            }
        });
    }

  function renderSandboxItems() {
    if (!previewMenuContainer) return;
    
    previewMenuContainer.innerHTML = INITIAL_SANDBOX_MENU.map(item => `
        <div class="sample-item" style="background: var(--bg-surface-solid); border: 1px solid var(--border-subtle); color: var(--text-main); transition: all 0.3s ease;">
            <i class="fas ${item.icon}" style="color: var(--primary-accent); font-size: 1.4rem; margin-bottom: 8px; display: block;"></i>
            <h4 style="font-size: 0.85rem; margin-bottom: 4px; font-weight: 600;">${item.name}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted);">PKR ${item.price.toLocaleString()}</p>
        </div>
    `).join('');
}
    // Helper utility to decode input hexadecimal structures smoothly
    function hexToRgb(hexString) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const normalizedHex = hexString.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

/**
 * ==========================================================================
 * --- 6. AUTHENTICATION PROTECTION TERMINATION INTERCEPTOR ---
 * ==========================================================================
 */
function initLogoutSessionHook() {
    const logoutTrigger = document.getElementById('admin-logout-trigger');
    if (logoutTrigger) {
        logoutTrigger.addEventListener('click', function(event) {
            event.preventDefault();
            
            const confirmExit = confirm("Are you sure you want to exit the management portal dashboard interface securely?");
            if (confirmExit) {
                alert("Security credentials cleared. Simulating session wipe sequence...");
                // Ready for redirect linkage when authentication modules arrive!
                window.location.reload(); 
            }
        });
    }
}