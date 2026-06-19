const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', '-translate-y-2');
        }, 10);
        line1.style.transform = 'rotate(45deg) translate(2px, 0.5px)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg) translate(2px, -0.5px)';
    } else {
        mobileMenu.classList.add('opacity-0', '-translate-y-2');
        line1.style.transform = 'none';
        line2.style.opacity = '1';
        line3.style.transform = 'none';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

function switchTab(type) {
    const tabDailyBtn = document.getElementById('tab-daily-btn');
    const tabMonthlyBtn = document.getElementById('tab-monthly-btn');
    const tabDaily = document.getElementById('tab-daily');
    const tabMonthly = document.getElementById('tab-monthly');

    if (type === 'daily') {
        tabDailyBtn.className = 'px-6 py-2.5 rounded-full text-xs tracking-widest transition-all duration-300 bg-brand-rose text-white font-medium';
        tabMonthlyBtn.className = 'px-6 py-2.5 rounded-full text-xs tracking-widest transition-all duration-300 text-brand-textLight hover:text-brand-rose font-medium';

        tabMonthly.classList.add('opacity-0');
        setTimeout(() => {
            tabMonthly.classList.add('hidden');
            tabDaily.classList.remove('hidden');
            setTimeout(() => {
                tabDaily.classList.remove('opacity-0');
            }, 50);
        }, 300);
    } else {
        tabMonthlyBtn.className = 'px-6 py-2.5 rounded-full text-xs tracking-widest transition-all duration-300 bg-brand-rose text-white font-medium';
        tabDailyBtn.className = 'px-6 py-2.5 rounded-full text-xs tracking-widest transition-all duration-300 text-brand-textLight hover:text-brand-rose font-medium';

        tabDaily.classList.add('opacity-0');
        setTimeout(() => {
            tabDaily.classList.add('hidden');
            tabMonthly.classList.remove('hidden');
            setTimeout(() => {
                tabMonthly.classList.remove('opacity-0');
            }, 50);
        }, 300);
    }
}

function toggleFaq(index) {
    const ans = document.getElementById(`faq-ans-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);

    if (ans.classList.contains('hidden')) {
        ans.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        ans.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

const bookingModal = document.getElementById('booking-modal');
const bookingModalBody = document.getElementById('booking-modal-body');
const bookingTypeSelect = document.getElementById('booking-type');
const modalTitle = document.getElementById('modal-title');

function openBookingModal(presetType = 'table') {
    if (presetType === 'class') {
        bookingTypeSelect.value = 'class-monthly';
        modalTitle.innerText = '預約花藝手作課程';
    } else {
        bookingTypeSelect.value = 'table';
        modalTitle.innerText = '線上即時預約訂位';
    }

    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex');
    setTimeout(() => {
        bookingModalBody.classList.remove('scale-95', 'opacity-0');
        bookingModalBody.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeBookingModal() {
    bookingModalBody.classList.remove('scale-100', 'opacity-100');
    bookingModalBody.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        bookingModal.classList.remove('flex');
        bookingModal.classList.add('hidden');
    }, 300);
}

function openMallModal() {
    showToast('系統通知', '已為您開闢專屬花禮諮詢通道！請留下預約，我們將由花藝師與您一對一討論花禮客製。');
    setTimeout(() => {
        openBookingModal('table');
    }, 1800);
}

function handleBookingSubmit(event) {
    event.preventDefault();
    closeBookingModal();

    setTimeout(() => {
        showToast('預約成功', '已為您保留席次，確認簡訊已發送至您的手機。期待與您的相遇！');
        document.getElementById('booking-form').reset();
    }, 400);
}

function showToast(title, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-msg').innerText = msg;

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.remove('h-20');
        header.classList.add('h-16', 'shadow-sm', 'bg-white/95');
    } else {
        header.classList.remove('h-16', 'shadow-sm', 'bg-white/95');
        header.classList.add('h-20');
    }
});

window.toggleMobileMenu = toggleMobileMenu;
window.switchTab = switchTab;
window.toggleFaq = toggleFaq;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openMallModal = openMallModal;
window.handleBookingSubmit = handleBookingSubmit;
window.showToast = showToast;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    });
});
