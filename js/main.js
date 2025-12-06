// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 5, 17, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.background = 'rgba(5, 5, 17, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Simple Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.feature-card, .info-card, .referral-level');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for reveal elements
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);

// Referral Earnings Calculator
const commissions = {
    1: 0.25,    // 25%
    2: 0.10,    // 10%
    3: 0.10,    // 10%
    4: 0.05,    // 5%
    5: 0.049,   // 4.9%
    6: 0.041    // 4.1% each for levels 6-16
};

function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateReferralEarnings() {
    const refCountInput = document.getElementById('refCount');
    const refTradeInput = document.getElementById('refTrade');
    const refPerPersonInput = document.getElementById('refPerPerson');

    if (!refCountInput || !refTradeInput || !refPerPersonInput) return;

    const refCount = parseInt(refCountInput.value) || 0;
    const tradeAmount = parseFloat(refTradeInput.value) || 0;
    const refPerPerson = parseInt(refPerPersonInput.value) || 1;

    let totalEarn = 0;
    let currentPeople = refCount;

    // Calculate for levels 1-5
    for (let i = 1; i <= 5; i++) {
        const volume = currentPeople * tradeAmount;
        const profit = volume * 0.01; // 1% profit from trades
        const earnings = profit * commissions[i];

        document.getElementById(`vol${i}`).textContent = formatNumber(volume);
        document.getElementById(`earn${i}`).textContent = formatNumber(earnings);

        totalEarn += earnings;
        currentPeople = currentPeople * refPerPerson; // Multiply for next level
    }

    // Calculate for levels 6-16 (11 levels × 4.1% each)
    let level6to16Total = 0;
    let level6to16Volume = 0;
    for (let i = 6; i <= 16; i++) {
        const volume = currentPeople * tradeAmount;
        const profit = volume * 0.01;
        const earnings = profit * commissions[6];

        level6to16Total += earnings;
        level6to16Volume += volume;
        currentPeople = currentPeople * refPerPerson;
    }

    document.getElementById('vol6').textContent = formatNumber(level6to16Volume);
    document.getElementById('earn6').textContent = formatNumber(level6to16Total);
    totalEarn += level6to16Total;

    // Update total
    document.getElementById('totalEarn').textContent = formatNumber(totalEarn);
}

// Add event listeners to referral calculator inputs
document.getElementById('refCount')?.addEventListener('input', calculateReferralEarnings);
document.getElementById('refTrade')?.addEventListener('input', calculateReferralEarnings);
document.getElementById('refPerPerson')?.addEventListener('input', calculateReferralEarnings);

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', calculateReferralEarnings);

// Compounding Calculator
function calculateCompounding() {
    const volumeInput = document.getElementById('tradeVolume');
    const daysInput = document.getElementById('tradeDays');

    if (!volumeInput || !daysInput) return;

    const volume = parseFloat(volumeInput.value) || 0;
    const days = parseInt(daysInput.value) || 0;

    // Daily profit is 1% of trade volume
    const dailyProfitRate = 0.01;
    const dailyProfit = volume * dailyProfitRate;

    // Simple total (no compounding): daily profit × days
    const simpleTotal = dailyProfit * days;

    // Compound total: volume × (1 + rate)^days - volume
    // This assumes you reinvest your profit each day
    const compoundTotal = volume * (Math.pow(1 + dailyProfitRate, days) - 1);

    // Bonus from compounding
    const compoundBonus = compoundTotal - simpleTotal;

    // Update display
    document.getElementById('dailyProfit').textContent = '$' + dailyProfit.toFixed(2);
    document.getElementById('simpleTotal').textContent = '$' + simpleTotal.toFixed(2);
    document.getElementById('compoundTotal').textContent = '$' + compoundTotal.toFixed(2);
    document.getElementById('compoundBonus').textContent = '+$' + compoundBonus.toFixed(2);
}

// Add event listeners for compounding calculator
document.getElementById('tradeVolume')?.addEventListener('input', calculateCompounding);
document.getElementById('tradeDays')?.addEventListener('input', calculateCompounding);

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', calculateCompounding);
