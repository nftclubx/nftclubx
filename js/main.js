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

// Earnings Calculator
const commissions = {
    1: 0.25,    // 25%
    2: 0.10,    // 10%
    3: 0.10,    // 10%
    4: 0.05,    // 5%
    5: 0.049,   // 4.9%
    6: 0.041    // 4.1% each for levels 6-16
};

function calculateEarnings() {
    let totalProfit = 0;
    let totalEarn = 0;

    // Calculate for levels 1-5
    for (let i = 1; i <= 5; i++) {
        const volInput = document.getElementById(`vol${i}`);
        if (volInput) {
            const volume = parseFloat(volInput.value) || 0;
            const profit = volume * 0.01; // 1% profit
            const earnings = profit * commissions[i];

            document.getElementById(`profit${i}`).textContent = profit.toFixed(2);
            document.getElementById(`earn${i}`).textContent = earnings.toFixed(2);

            totalProfit += profit;
            totalEarn += earnings;
        }
    }

    // Calculate for levels 6-16 (11 levels × 4.1% each)
    const vol6Input = document.getElementById('vol6');
    if (vol6Input) {
        const volume = parseFloat(vol6Input.value) || 0;
        const profitPerLevel = volume * 0.01; // 1% profit per level
        const totalProfitLevels6to16 = profitPerLevel * 11; // 11 levels
        const earningsPerLevel = profitPerLevel * commissions[6];
        const totalEarningsLevels6to16 = earningsPerLevel * 11;

        document.getElementById('profit6').textContent = totalProfitLevels6to16.toFixed(2);
        document.getElementById('earn6').textContent = totalEarningsLevels6to16.toFixed(2);

        totalProfit += totalProfitLevels6to16;
        totalEarn += totalEarningsLevels6to16;
    }

    // Update totals
    document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
    document.getElementById('totalEarn').textContent = totalEarn.toFixed(2);
}

// Add event listeners to all volume inputs for referral calculator
document.querySelectorAll('.calculator-table .volume-input').forEach(input => {
    input.addEventListener('input', calculateEarnings);
});

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', calculateEarnings);

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
