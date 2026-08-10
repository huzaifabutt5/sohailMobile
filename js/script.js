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

    sidebarLinks.forEach(link => {
        const listItem = link.closest('li');
        const linkPage = link.getAttribute('href');
        const isVendorPageActive = vendorPages.includes(currentPage) && linkPage === 'manage-vendor.html';
        const isCustomerPageActive = customerPages.includes(currentPage) && linkPage === 'manage-customer.html';
        const isCategoryPageActive = categoryPages.includes(currentPage) && linkPage === 'category-listing.html';
        const isProductPageActive = productPages.includes(currentPage) && linkPage === 'listing-product.html';
        const isStockPageActive = stockPages.includes(currentPage) && linkPage === 'stock-listing.html';

        if (linkPage === currentPage || (linkPage === 'dashboard.html' && currentPage === '') || isVendorPageActive || isCustomerPageActive || isCategoryPageActive || isProductPageActive || isStockPageActive) {
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

        // Create detail row containing the Multi-Invoices Breakdown subtable
        const detailRow = document.createElement('tr');
        detailRow.className = 'purchase-detail-row';
        
        detailRow.innerHTML = `
          <td colspan="5" style="padding: 0; border: none;">
            <div class="purchase-subtable-container">
              <div class="purchase-subtable-title">Multi-Invoices Breakdown (${vendorName})</div>
              <div class="purchase-subtable table-responsive">
                <table class="table mb-0 purchase-subtable-box">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Date</th>
                      <th>Invoice ID</th>
                      <th>Products</th>
                      <th>Purchase/Return</th>
                      <th>Transaction Type</th>
                      <th>Transaction ID</th>
                      <th>Payable Amount</th>
                      <th>Paid Amount</th>
                      <th>Open Balance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>June 15, 2026</td>
                      <td>INV-1001</td>
                      <td>3 Products</td>
                      <td><span class="purchase-report-status-badge">Purchase</span></td>
                      <td>Bank Transfer</td>
                      <td>TrX 6tgbGY7I89</td>
                      <td>PKR 125,000</td>
                      <td>PKR 100,000</td>
                      <td>PKR 25,000</td>
                      <td>
                        <div class="purchase-subtable-actions">
                          <button class="purchase-subtable-action-btn" type="button" aria-label="View details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button class="purchase-subtable-action-btn delete" type="button" aria-label="Delete entry">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                              <path d="M10 11v6"></path>
                              <path d="M14 11v6"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>June 16, 2026</td>
                      <td>INV-1002</td>
                      <td>1 Product</td>
                      <td><span class="purchase-report-status-badge">Return</span></td>
                      <td>Cash</td>
                      <td>TrX 9kL2mN4</td>
                      <td>PKR 48,500</td>
                      <td>PKR 48,500</td>
                      <td>PKR 0</td>
                      <td>
                        <div class="purchase-subtable-actions">
                          <button class="purchase-subtable-action-btn" type="button" aria-label="View details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button class="purchase-subtable-action-btn delete" type="button" aria-label="Delete entry">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                              <path d="M10 11v6"></path>
                              <path d="M14 11v6"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>June 17, 2026</td>
                      <td>INV-1003</td>
                      <td>2 Products</td>
                      <td><span class="purchase-report-status-badge">Purchase</span></td>
                      <td>Cash</td>
                      <td>TrX 2pQ8rT6</td>
                      <td>PKR 92,000</td>
                      <td>PKR 60,000</td>
                      <td>PKR 32,000</td>
                      <td>
                        <div class="purchase-subtable-actions">
                          <button class="purchase-subtable-action-btn" type="button" aria-label="View details">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button class="purchase-subtable-action-btn delete" type="button" aria-label="Delete entry">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                              <path d="M10 11v6"></path>
                              <path d="M14 11v6"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
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
    const searchInput = document.getElementById('purchaseSearchInput') || document.getElementById('searchVendor');
    if (searchInput) {
      searchInput.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase();
        document.querySelectorAll('.purchase-detail-row').forEach(el => el.remove());
        document.querySelectorAll('.purchase-report-row').forEach(row => {
          row.classList.remove('active-row');
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filter) ? '' : 'none';
        });
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const tables = Array.from(document.querySelectorAll('table.table'));

    const findRoot = (table) => {
      return table.closest('.plist-main-wrap, .vendor-panel, .inv-main-wrap, .purchase-report-card, .sdet-main-wrap, .table-card, .table-grid, .table-wrap, .purchase-report-table-wrapper') || table.parentElement;
    };

    const getPageInfoElement = (root) => {
      return Array.from(root.querySelectorAll('span, div')).find(el => /Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+entries/i.test(el.textContent.trim()));
    };

    const initDataTable = (table) => {
      let root = findRoot(table);
      if (!root) return;

      // If the nearest wrapper is the table-specific wrapper, prefer the
      // higher-level `.purchase-report-card` so controls (search/select)
      // that are siblings of the wrapper are discovered properly.
      if (root.classList && root.classList.contains('purchase-report-table-wrapper')) {
        const parentCard = root.closest('.purchase-report-card');
        if (parentCard) root = parentCard;
      }

      const disablePagination = document.body.classList.contains('dashboard-page');

      // Broader search selectors to match different pages
      let searchInput = root.querySelector('.search-box-inline input, .sdet-search-wrap input, .purchase-report-controls input, input[id*="search" i], input[class*="search" i], input[type="search"]');
      // fallback to global IDs when controls are not direct descendants
      if (!searchInput) searchInput = document.querySelector('#searchVendor') || document.querySelector('#purchaseSearchInput');

      let pageSizeSelect = root.querySelector('select.form-select.form-select-sm, select#purchaseEntriesSelect, select#entries, select[class*="entry" i], select[id*="entries" i]');
      if (!pageSizeSelect) pageSizeSelect = document.querySelector('#purchaseEntriesSelect') || document.querySelector('select.form-select.form-select-sm');
      let pageInfo = getPageInfoElement(root);
      let paginationList = root.querySelector('ul.pagination');
      const paginationButtons = root.querySelector('.page-buttons');

      // If no pagination or page-info exist, create footer controls only when page has neither
      if (!pageInfo && !paginationList && !paginationButtons) {
        const footer = document.createElement('div');
        footer.className = 'data-table-footer d-flex justify-content-between align-items-center mt-2';

        pageInfo = document.createElement('div');
        pageInfo.className = 'data-table-page-info';
        pageInfo.textContent = 'Showing 0 to 0 of 0 entries';

        const nav = document.createElement('nav');
        paginationList = document.createElement('ul');
        paginationList.className = 'pagination pagination-sm mb-0';
        nav.appendChild(paginationList);

        footer.appendChild(pageInfo);
        footer.appendChild(nav);

        const tableWrapper = findRoot(table) || table.parentElement;
        if (tableWrapper && tableWrapper.parentElement) {
          tableWrapper.parentElement.insertBefore(footer, tableWrapper.nextSibling);
        } else {
          table.parentNode.insertBefore(footer, table.nextSibling);
        }

        // refresh references
        pageInfo = getPageInfoElement(root) || pageInfo;
        paginationList = root.querySelector('ul.pagination') || paginationList;
      } else {
        // If paginationList is missing but page uses .page-buttons, keep that and only ensure pageInfo exists
        if (!pageInfo) {
          pageInfo = document.createElement('div');
          pageInfo.className = 'data-table-page-info';
          pageInfo.textContent = 'Showing 0 to 0 of 0 entries';
          if (paginationButtons && paginationButtons.parentElement) {
            paginationButtons.parentElement.insertBefore(pageInfo, paginationButtons);
          } else if (table.parentElement) {
            table.parentElement.insertBefore(pageInfo, table.nextSibling);
          }
        }
      }

      const tbody = table.tBodies[0];
      if (!tbody) return;

      const rawRows = Array.from(tbody.querySelectorAll('tr'));
      const allRows = rawRows.filter(row => !row.classList.contains('purchase-detail-row') && !row.id.startsWith('breakdown-row-') && !row.id.startsWith('report-breakdown-'));
      let filteredRows = allRows.slice();
      let currentPage = 1;
      let pageSize = pageSizeSelect ? Number(pageSizeSelect.value) || 10 : 10;

      const updateTable = () => {
        const filterText = searchInput ? searchInput.value.toLowerCase().trim() : '';
        filteredRows = allRows.filter(row => row.textContent.toLowerCase().includes(filterText));
        const totalRows = filteredRows.length;
        const totalPages = disablePagination ? 1 : Math.max(1, Math.ceil(totalRows / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;

        const start = disablePagination ? 0 : (currentPage - 1) * pageSize;
        const pageRows = disablePagination ? filteredRows : filteredRows.slice(start, start + pageSize);

        allRows.forEach(row => {
          row.style.display = pageRows.includes(row) ? '' : 'none';
        });

        if (pageInfo) {
          const from = totalRows === 0 ? 0 : (disablePagination ? 1 : start + 1);
          const to = disablePagination ? totalRows : Math.min(start + pageSize, totalRows);
          pageInfo.textContent = `Showing ${from} to ${to} of ${totalRows} entries`;
        }

        renderPagination(totalPages);
      };

      const renderPagination = (totalPages) => {
        if (disablePagination) {
          if (paginationList) paginationList.style.display = 'none';
          if (paginationButtons) paginationButtons.style.display = 'none';
          return;
        }

        if (paginationList) {
          paginationList.innerHTML = '';
          const createPageItem = (text, page, disabled, active) => {
            const li = document.createElement('li');
            li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = text;
            a.dataset.page = page;
            li.appendChild(a);
            return li;
          };

          paginationList.appendChild(createPageItem('«', currentPage - 1, currentPage === 1, false));
          for (let i = 1; i <= totalPages; i += 1) {
            paginationList.appendChild(createPageItem(i.toString(), i, false, currentPage === i));
          }
          paginationList.appendChild(createPageItem('»', currentPage + 1, currentPage === totalPages, false));
        }

        if (paginationButtons) {
          paginationButtons.innerHTML = '';

          const createButton = (text, page, disabled, active) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.page = page;
            button.className = `page-num${active ? ' active' : ''}`;
            button.disabled = disabled;
            button.textContent = text;
            return button;
          };

          const prevBtn = createButton('‹', Math.max(1, currentPage - 1), currentPage === 1, false);
          prevBtn.className = 'page-arrow';
          paginationButtons.appendChild(prevBtn);

          for (let i = 1; i <= totalPages; i += 1) {
            paginationButtons.appendChild(createButton(i.toString(), i, false, currentPage === i));
          }

          const nextBtn = createButton('›', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false);
          nextBtn.className = 'page-arrow';
          paginationButtons.appendChild(nextBtn);
        }
      };

      const changePage = (page) => {
        const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
        currentPage = Math.min(Math.max(1, page), totalPages);
        updateTable();
      };

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          currentPage = 1;
          updateTable();
        });
      }

      if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', () => {
          pageSize = Number(pageSizeSelect.value) || 10;
          currentPage = 1;
          updateTable();
        });
      }

      if (paginationList && !disablePagination) {
        paginationList.addEventListener('click', (event) => {
          const target = event.target.closest('a[data-page]');
          if (!target) return;
          event.preventDefault();
          changePage(Number(target.dataset.page));
        });
      }

      if (paginationButtons && !disablePagination) {
        paginationButtons.addEventListener('click', (event) => {
          const target = event.target.closest('button[data-page]');
          if (!target || target.disabled) return;
          changePage(Number(target.dataset.page));
        });
      }

      updateTable();
    };

    tables.forEach(initDataTable);
  });