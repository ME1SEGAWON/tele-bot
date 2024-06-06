document.addEventListener('DOMContentLoaded', () => {
    // ... kode sebelumnya ...
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }
    toggleSwitch.addEventListener('change', switchTheme, false);

    const coinButton = document.getElementById('coin-button');
    const moneyDisplay = document.getElementById('money');
    const userId = new URLSearchParams(window.location.search).get('user');
    const usernameDisplay = document.getElementById('username');
    let autoClickInterval;

    let username = '';

    if (!userId) {
        alert('User ID tidak ditemukan!');
        return;
    }

    let money = 0;
    let isClickAllowed = true; // Variabel untuk mengatur delay klik

    // Fungsi untuk memperbarui tampilan uang
    function updateMoneyDisplay() {
        moneyDisplay.textContent = `Money: ${money}`;
    }
    function updateUsernameDisplay() {
        usernameDisplay.textContent = `Username: ${username}`;
    }
    

    
    // Fungsi untuk mengambil data uang dari server
    async function fetchMoney() {
        try {
            const response = await fetch(`/api/getMoney?user=${userId}`);
            const data = await response.json();
            money = data.money;
            username = data.username; // Asumsi bahwa server mengirimkan nama pengguna dalam respons
            updateMoneyDisplay();
            updateUsernameDisplay(); // Memperbarui tampilan nama pengguna
        } catch (error) {
            console.error('Error fetching money:', error);
        }
    }

    // Fungsi untuk memperbarui uang di server
    async function updateMoney() {
        try {
            const response = await fetch(`/api/updateMoney`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: userId, money: money })
            });
            const data = await response.json();
            money = data.diamond;
            updateMoneyDisplay();
        } catch (error) {
            console.error('Error updating money:', error);
        }
    }

    // Fungsi untuk mengatur cooldown tombol
    function startCooldown() {
        isClickAllowed = false;
        coinButton.textContent = 'Sedang cooldown...';
        coinButton.classList.add('loading');
        setTimeout(() => {
            isClickAllowed = true;
            coinButton.textContent = '💰 Click Me!';
            coinButton.classList.remove('loading');
        }, 1000);
    }

    // Event listener untuk klik tombol koin
    coinButton.addEventListener('click', () => {
        if (isClickAllowed) {
            money += 1;
            updateMoneyDisplay();
            startCooldown();
        }
    });

    // Ambil data uang saat halaman dimuat
    fetchMoney();

    // Kirim data uang ke server setiap 5 detik
    setInterval(updateMoney, 5000);
});