let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
let autoSlideInterval;
const hasCarousel = slides.length > 0 && indicators.length > 0;

function showSlide(n) {
	if (!hasCarousel) return;
	slides[currentSlide].classList.remove('active');
	indicators[currentSlide].classList.remove('active');
	
	currentSlide = (n + slides.length) % slides.length;
	
	slides[currentSlide].classList.add('active');
	indicators[currentSlide].classList.add('active');
}

function changeSlide(direction) {
	showSlide(currentSlide + direction);
	resetAutoSlide();
}

function goToSlide(n) {
	showSlide(n);
	resetAutoSlide();
}

function autoSlide() {
	showSlide(currentSlide + 1);
}

function resetAutoSlide() {
	clearInterval(autoSlideInterval);
	if (hasCarousel) {
		autoSlideInterval = setInterval(autoSlide, 5000);
	}
}

if (hasCarousel) {
	autoSlideInterval = setInterval(autoSlide, 5000);
}

const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

if (userProfile && profileDropdown) {
	userProfile.addEventListener('click', (e) => {
		e.stopPropagation();
		profileDropdown.classList.toggle('active');
	});

	document.addEventListener('click', () => {
		profileDropdown.classList.remove('active');
	});
}

const header = document.getElementById('header');
if (header) {
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

const serviceToggles = document.querySelectorAll('.service-toggle');
serviceToggles.forEach(button => {
	button.addEventListener('click', (e) => {
		e.stopPropagation();
		const card = button.closest('.feature-card');
		if (!card) return;
		card.classList.toggle('open');
	});
});

const serviceCheckboxes = document.querySelectorAll('.service-option input[type="checkbox"]');
const serviceTotalEl = document.getElementById('serviceTotal');
const serviceClearBtn = document.getElementById('serviceClear');

function formatCurrency(value) {
	return '₱' + value.toLocaleString('en-PH', { maximumFractionDigits: 0 });
}

function updateServiceTotal() {
	if (!serviceTotalEl || serviceCheckboxes.length === 0) return;
	let total = 0;
	serviceCheckboxes.forEach(input => {
		if (input.checked) {
			const price = Number(input.dataset.price || '0');
			if (!Number.isNaN(price)) {
				total += price;
			}
		}
	});
	serviceTotalEl.textContent = formatCurrency(total);
}

if (serviceTotalEl && serviceCheckboxes.length > 0) {
	serviceCheckboxes.forEach(input => {
		input.addEventListener('change', updateServiceTotal);
	});
	updateServiceTotal();
}

if (serviceClearBtn && serviceCheckboxes.length > 0) {
	serviceClearBtn.addEventListener('click', () => {
		serviceCheckboxes.forEach(input => {
			input.checked = false;
		});
		updateServiceTotal();
	});
}