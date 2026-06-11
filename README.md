# SmartDine-RMS
SmartDine represents my very first software development project, built to demonstrate how enterprise-level workflows can be fully executed directly inside a browser. It is a framework-independent, serverless, client-centric Single Page Application (SPA) designed to modernize restaurant operations with sub-100ms interface interaction profiles and absolute local data autonomy. Developed using a native web stack—HTML5, mobile-first CSS3 with glassmorphism UI tokens, and vanilla JavaScript (ES6+)—the entire system runs smoothly on the client side using structured localStorage arrays without requiring an external database.

The architecture isolates all essential restaurant workflows across three unified, interactive layers:

**Customer Ordering Portal:** Handles automated table tracking via URL parameters (URLSearchParams), interactive digital menus across 5 distinct categories, real-time shopping cart calculation loops, and a live tracking engine driven by 3-digit checkout tokens.

**Staff POS Terminal:** A secure operator workspace accessed via an on-screen client-side numeric keypad grid. It validates input parameters against local master credentials to update order statuses and manage active internal billing tickets.

**Admin Dashboard:** Features a dynamic Kanban kitchen pipeline moving orders across live operational swimlanes, real-time localized sales volume analytics, and a brand customization sandbox running an accessibility-focused relative perceived luminance contrast algorithm.

## 🚀 Key Features
- **Dynamic Customer Portal:** Automated table tracking utilizing native URL parameter parsing (`URLSearchParams`), complete with live checkout cart calculation loops.
- **Secure Staff POS Terminal:** Client-side operator credential validation driven by an event-mapped numeric keypad grid.
- **Admin Management Canvas:** Real-time Kanban kitchen swimlane display alongside a dynamic brand customizer that calculates relative perceived luminance to adjust typographical contrast.

## 🛠️ Technical Stack
- **Structure & Layout:** Semantic HTML5
- **Presentation Layer:** CSS3 (Mobile-first design featuring Glassmorphism UI tokens)
- **Application Logic:** Vanilla JavaScript (ES6+ Monolithic State Controller)
- **Data Persistence:** Web Storage API (`localStorage` parsing & serialization arrays)
- **Vector Assets:** Font Awesome 6.0 CDN
