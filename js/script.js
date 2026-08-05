// Sidebar toggle: clicking the button will collapse/open the sidebar by toggling
// the `sidebar-collapsed` class on the wrapper.
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('sidebarToggle');
    const wrapper = document.querySelector('.dashboard-wrapper');
    const main = document.querySelector('.main-content');

    if (!toggleBtn || !wrapper) return;

    // Responsive toggle logic:
    // - Desktop (>=992px): toggle collapsed (show/hide sidebar inline)
    // - Mobile (<992px): toggle overlay open/close (full-width sidebar)
    toggleBtn.addEventListener('click', function (e) {
        if (window.innerWidth >= 992) {
            // desktop: simply toggle collapsed state
            wrapper.classList.toggle('sidebar-collapsed');
            wrapper.classList.remove('sidebar-overlay-active');
        } else {
            // mobile: toggle overlay
            if (wrapper.classList.contains('sidebar-overlay-active')) {
                wrapper.classList.remove('sidebar-overlay-active');
            } else {
                wrapper.classList.add('sidebar-overlay-active');
                wrapper.classList.remove('sidebar-collapsed');
            }
        }
    });

    // Ensure sidebar is visible when resizing to desktop
    // Close overlay when clicking on main content or pressing ESC
    if (main) {
        main.addEventListener('click', function () {
            if (wrapper.classList.contains('sidebar-overlay-active')) {
                wrapper.classList.remove('sidebar-overlay-active');
                wrapper.classList.add('sidebar-collapsed');
            }
        });
    }

    // Highlight the current page in the sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
    const currentPage = window.location.pathname.split('/').pop();
    const vendorPages = ['manage-vendor.html', 'add-new-vendor.html'];

    sidebarLinks.forEach(link => {
        const listItem = link.closest('li');
        const linkPage = link.getAttribute('href');
        const isVendorPageActive = vendorPages.includes(currentPage) && linkPage === 'manage-vendor.html';

        if (linkPage === currentPage || (linkPage === 'dashboard.html' && currentPage === '') || isVendorPageActive) {
            listItem.classList.add('active');
        } else {
            listItem.classList.remove('active');
        }

        link.addEventListener('click', function () {
            sidebarLinks.forEach(item => item.closest('li').classList.remove('active'));
            listItem.classList.add('active');
        });
    });

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && wrapper.classList.contains('sidebar-overlay-active')) {
            wrapper.classList.remove('sidebar-overlay-active');
            wrapper.classList.add('sidebar-collapsed');
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            wrapper.classList.remove('sidebar-collapsed');
            wrapper.classList.remove('sidebar-overlay-active');
        }
    });
});
