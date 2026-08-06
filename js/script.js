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
const vendorPages = ['manage-vendor.html', 'add-new-vendor.html', 'vendor-list.html'];
    const customerPages = ['manage-customer.html', 'add-new-customer.html', 'customer-list.html'];
    const categoryPages = ['category-listing.html', 'add-new-category.html'];

    sidebarLinks.forEach(link => {
        const listItem = link.closest('li');
        const linkPage = link.getAttribute('href');
        const isVendorPageActive = vendorPages.includes(currentPage) && linkPage === 'manage-vendor.html';
        const isCustomerPageActive = customerPages.includes(currentPage) && linkPage === 'manage-customer.html';
        const isCategoryPageActive = categoryPages.includes(currentPage) && linkPage === 'category-listing.html';

        if (linkPage === currentPage || (linkPage === 'dashboard.html' && currentPage === '') || isVendorPageActive || isCustomerPageActive || isCategoryPageActive) {
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


const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");

if (payBtn && paymentModal && closeModal) {

    payBtn.addEventListener("click", () => {
        paymentModal.classList.add("show");
    });

    closeModal.addEventListener("click", () => {
        paymentModal.classList.remove("show");
    });

    paymentModal.addEventListener("click", (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove("show");
        }
    });

}

let tagInput = document.getElementById("tagInput");
let tagWrapper = document.getElementById("tagWrapper");

tagInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        e.preventDefault();

        let tagValue = tagInput.value.trim();

        if (tagValue === "") return;

        let tagItem = document.createElement("div");
        tagItem.className = "tag-item";

        tagItem.innerHTML = `
            <span>${tagValue}</span>
            <button class="tag-remove-btn" onclick="this.parentElement.remove()">&times;</button>
        `;

        tagWrapper.appendChild(tagItem);

        tagInput.value = "";
    }

});

// ===================
// Apex Chart (Paste Here)
// ===================

document.addEventListener("DOMContentLoaded", function () {


var options = {
    chart: {
        type: 'area',
        height: 420,
        toolbar: {
            show: false
        }
    },

    series: [
        {
            name: 'Sales',
            data: [45,35,48,30,52,47,55,40,58,54,49,60]
        },
        {
            name: 'Purchase',
            data: [12,20,18,28,25,23,31,29,26,35,34,25]
        },
        {
            name: 'Expense',
            data: [15,30,28,25,42,39,38,50,36,55,44,25]
        },
        {
            name: 'PnL',
            data: [3,10,2,12,8,5,7,8,7,15,10,6]
        }
    ],

    colors: [
        '#3b82f6',
        '#8b5cf6',
        '#f59e0b',
        '#22c55e'
    ],

    stroke: {
        curve: 'smooth',
        width: 3
    },

    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.35,
            opacityTo: 0.05
        }
    },

    dataLabels: {
        enabled: false
    },

    grid: {
        borderColor: '#e5e7eb'
    },

    xaxis: {
        categories: [
            'Jan','Feb','Mar','Apr','May','Jun',
            'Jul','Aug','Sep','Oct','Nov','Dec'
        ]
    }
};

new ApexCharts(document.querySelector("#salesChart"), options).render();

});

const calendarBtn = document.getElementById("calendarBtn");

if(calendarBtn){

    const dateModal = new bootstrap.Modal(
        document.getElementById("dateFilterModal")
    );

    calendarBtn.addEventListener("click",function(){
        dateModal.show();
    });

}