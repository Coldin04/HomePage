// 只保留横幅提示，去掉弹窗
function checkAndShowAnnouncement() {
    const referrer = document.referrer || '';
    const currentHost = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const isFromParam = urlParams.get('from') === 'coldin.top';

    const isOldDomain = currentHost === 'coldin.top' || currentHost === 'www.coldin.top';
    const fromColdintop = referrer.includes('coldin.top') || isOldDomain || isFromParam;

    const banner = document.getElementById('announcement-banner');
    const closeBanner = document.getElementById('close-banner');

    const COUNT_KEY = 'announcement-close-count';
    const MAX_COUNT = 3;

    if (fromColdintop) {
        localStorage.setItem(COUNT_KEY, '0');
    }

    let closeCount = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10);
    const shouldShow = fromColdintop || closeCount < MAX_COUNT;

    if (shouldShow && banner) {
        banner.style.display = 'flex';
    }

    const incrementCount = () => {
        if (!fromColdintop) {
            closeCount += 1;
            localStorage.setItem(COUNT_KEY, closeCount.toString());
        }
    };

    if (closeBanner) {
        closeBanner.addEventListener('click', () => {
            banner.style.display = 'none';
            incrementCount();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        checkAndShowAnnouncement();
        initScrollAnimations();
    });
} else {
    checkAndShowAnnouncement();
    initScrollAnimations();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            } else {
                // 离开视口时移除类，这样下次回来可以再次触发动画
                entry.target.classList.remove('scroll-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-hidden').forEach((el) => {
        observer.observe(el);
    });
}
