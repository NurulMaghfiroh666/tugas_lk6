// Ambil elemen yang diperlukan
const notificationContainer = document.getElementById('notification-container');

// untuk menu hamburger
const regForm = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const categoryInput = document.getElementById('category');
const messageInput = document.getElementById('message');
const previewName = document.getElementById('preview-name');
const previewMessage = document.getElementById('preview-message');
const submissionsList = document.getElementById('submissions');
const toggleBtn = document.getElementById('toggleBtn');
const moreContent = document.getElementById('moreContent');

// fungsi untuk menampilkan notifikasi
function showNotification(text, type = 'success', timeout = 3000) {
	const n = document.createElement('div');
	n.className = `notification ${type}`;
	n.textContent = text;
	notificationContainer.appendChild(n);

	// hilangkan notifikasi
	setTimeout(() => {
		n.style.opacity = '0';
		setTimeout(() => n.remove(), 300);
	}, timeout);
}

// preview real time
nameInput.addEventListener('input', () => {
	previewName.textContent = `Nama: ${nameInput.value || '-'} `;
});

messageInput.addEventListener('input', () => {
	previewMessage.textContent = `Pesan: ${messageInput.value || '-'} `;
});

// tombol tambahan konten
toggleBtn.addEventListener('click', () => {
	const isHidden = moreContent.style.display === 'none' || moreContent.style.display === '';
	moreContent.style.display = isHidden ? 'block' : 'none';
	toggleBtn.textContent = isHidden ? 'Sembunyikan' : 'Tampilkan lebih';
});

// masukkan form
regForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// validasi sederhana
	if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !categoryInput.value) {
		showNotification('Harap isi semua field yang wajib.', 'error');
		return;
	}

	// tambah ke daftar
	const li = document.createElement('li');
	li.textContent = `${nameInput.value} — ${categoryInput.value} — ${phoneInput.value}`;
	submissionsList.appendChild(li);

	showNotification('Pendaftaran berhasil dikirim!', 'success');

	// reset form dan preview
	regForm.reset();
	previewName.textContent = 'Nama: -';
	previewMessage.textContent = 'Pesan: -';
});

// memasukkan style notifikasi secara dinamis
(function injectNotificationStyles(){
	const s = document.createElement('style');
	s.textContent = `
		#notification-container{position:fixed;top:16px;right:16px;z-index:9999;}
		.notification{background:#0f172a;color:#fff;padding:10px 14px;border-radius:6px;margin-bottom:8px;box-shadow:0 4px 12px rgba(2,6,23,0.3);transition:opacity .3s}
		.notification.error{background:#b91c1c}
	`;
	document.head.appendChild(s);
})();