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
const productPages = ['listing-product.html', 'add-new-product.html', 'add-product-view.html'];
    const stockPages = ['stock-listing.html', 'stock-listing-panels.html'];
    const pnlReportPages = ['pnl-report.html', 'pnl-report-select.html'];
    const rolePages = ['manage-roles.html', 'add-new-role.html'];

    sidebarLinks.forEach(link => {
        const listItem = link.closest('li');
        const linkPage = link.getAttribute('href');
        const isVendorPageActive = vendorPages.includes(currentPage) && linkPage === 'manage-vendor.html';
        const isCustomerPageActive = customerPages.includes(currentPage) && linkPage === 'manage-customer.html';
        const isCategoryPageActive = categoryPages.includes(currentPage) && linkPage === 'category-listing.html';
        const isProductPageActive = productPages.includes(currentPage) && linkPage === 'listing-product.html';
        const isStockPageActive = stockPages.includes(currentPage) && linkPage === 'stock-listing.html';
        const isPnlReportPageActive = pnlReportPages.includes(currentPage) && linkPage === 'pnl-report.html';
        const isRolePageActive = rolePages.includes(currentPage) && linkPage === 'manage-roles.html';

        if (linkPage === currentPage || (linkPage === 'dashboard.html' && currentPage === '') || isVendorPageActive || isCustomerPageActive || isCategoryPageActive || isProductPageActive || isStockPageActive || isPnlReportPageActive || isRolePageActive) {
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

if (tagInput && tagWrapper) {

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

}




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
}


    console.log("Apex section started");

const chartElement = document.querySelector("#salesChart");
console.log(chartElement);

if (chartElement) {
    new ApexCharts(chartElement, options).render();
    console.log("Chart Rendered");
}

});



const calendarBtn = document.getElementById("calendarBtn");
const modalElement = document.getElementById("dateFilterModal");

if (calendarBtn && modalElement) {

    const dateModal = new bootstrap.Modal(modalElement);

    calendarBtn.addEventListener("click", function () {
        dateModal.show();
    });

}


// Stock Listing DT Invoice

function toggleBreakdown(rowId) {
            const breakdownRow = document.getElementById(`breakdown-row-${rowId}`);
            if (!breakdownRow) return;

            // Check if currently hidden
            const isHidden = breakdownRow.classList.contains('d-none');

            // Hide all breakdown rows first and remove active class from all rows
            document.querySelectorAll('[id^="breakdown-row-"]').forEach(el => {
                el.classList.add('d-none');
            });
            document.querySelectorAll('.sdet-clickable-row').forEach(el => {
                el.classList.remove('active-row');
            });

            // If it was hidden, show it and highlight clicked row
            if (isHidden) {
                breakdownRow.classList.remove('d-none');
                event.currentTarget.classList.add('active-row');
            }
        }


        // Sales Report DT Invoice



        function toggleReportBreakdown(rowId) {
            const breakdownRow = document.getElementById(`report-breakdown-${rowId}`);
            if (!breakdownRow) return;

            const isHidden = breakdownRow.classList.contains('d-none');

            // Hide all breakdowns and remove active states
            document.querySelectorAll('[id^="report-breakdown-"]').forEach(el => {
                el.classList.add('d-none');
            });
            document.querySelectorAll('.srep-clickable-row').forEach(el => {
                el.classList.remove('active-row');
            });

            // Toggle target row
            if (isHidden) {
                breakdownRow.classList.remove('d-none');
                event.currentTarget.classList.add('active-row');
            }
        }





        document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.purchase-report-row');

    rows.forEach(row => {
      row.addEventListener('click', function() {
        const vendorName = this.getAttribute('data-vendor');
        const existingDetailRow = this.nextElementSibling;

        // If the next row is already an open breakdown row, toggle it off (hide and remove)
        if (existingDetailRow && existingDetailRow.classList.contains('purchase-detail-row')) {
          existingDetailRow.remove();
          this.classList.remove('active-row');
          return;
        }

        // Close any other open breakdown rows first
        document.querySelectorAll('.purchase-detail-row').forEach(el => el.remove());
        document.querySelectorAll('.purchase-report-row').forEach(el => el.classList.remove('active-row'));

        // Highlight current row
        this.classList.add('active-row');

        // Create detail row containing the exact Multi-Invoices Breakdown subtable
        const detailRow = document.createElement('tr');
        detailRow.className = 'purchase-detail-row';
        
        detailRow.innerHTML = `
          <td colspan="5" style="padding: 0; border: none;">
            <div class="purchase-subtable-container">
              <div class="purchase-subtable-title">Multi-Invoices Breakdown (${vendorName})</div>
              <div class="purchase-subtable table-responsive">
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Date</th>
                      <th>Invoice ID</th>
                      <th>Products</th>
                      <th>Purchase/Return</th>
                      <th>Transaction Type</th>
                      <th>Transection ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>June 15, 2026</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>Bank Transfer</td>
                      <td>TrX 6tgbGY7I89</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>June 15, 2026</td>
                      <td><span class="dot-indicator"></span>Invoice - 0001</td>
                      <td>3 Products</td>
                      <td><span class="purchase-report-status-badge">Purchase</span></td>
                      <td>Cash</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>June 15, 2026</td>
                      <td>Invoice - 0001</td>
                      <td>1 Product</td>
                      <td><span class="purchase-report-status-badge">Purchase</span></td>
                      <td>Cash</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        `;

        // Insert right below the clicked row
        this.parentNode.insertBefore(detailRow, this.nextSibling);
      });
    });

    // Search filter
    const searchInput = document.getElementById('purchaseSearchInput');
    searchInput.addEventListener('keyup', function() {
      const filter = this.value.toLowerCase();
      document.querySelectorAll('.purchase-detail-row').forEach(el => el.remove());
      document.querySelectorAll('.purchase-report-row').forEach(row => {
        row.classList.remove('active-row');
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  });




  const manageRolesDeleteModal = document.getElementById("manageRolesDeleteModal");
const manageRolesCancelDelete = document.getElementById("manageRolesCancelDelete");
const manageRolesConfirmDelete = document.getElementById("manageRolesConfirmDelete");

const manageRolesDeleteButtons = document.querySelectorAll(
    ".manage-roles-delete-btn"
);

manageRolesDeleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        manageRolesDeleteModal.classList.add("show");
    });

});

manageRolesCancelDelete.addEventListener("click", function () {
    manageRolesDeleteModal.classList.remove("show");
});

manageRolesConfirmDelete.addEventListener("click", function () {
    manageRolesDeleteModal.classList.remove("show");
});


const changePasswordForm = document.getElementById('changePasswordForm');
  const passwordError = document.getElementById('passwordError');
  const changePasswordModalEl = document.getElementById('changePasswordModal');
  const changePasswordModal = new bootstrap.Modal(changePasswordModalEl);

  changePasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      passwordError.style.display = 'block';
      return;
    }

    passwordError.style.display = 'none';

    // ===== Replace this block with your actual API call =====
    console.log('Updating password:', { currentPassword, newPassword });

    // Example fetch call:
    // fetch('/api/change-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ currentPassword, newPassword })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     changePasswordModal.hide();
    //     changePasswordForm.reset();
    //   })
    //   .catch(err => console.error(err));

    changePasswordModal.hide();
    changePasswordForm.reset();
  });

  // Reset form + hide error whenever modal is closed
  changePasswordModalEl.addEventListener('hidden.bs.modal', function () {
    changePasswordForm.reset();
    passwordError.style.display = 'none';
  });