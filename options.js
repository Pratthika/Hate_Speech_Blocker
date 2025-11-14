document.addEventListener('DOMContentLoaded', function() {
    const statusToggle = document.getElementById('statusToggle');
    const statusText = document.getElementById('statusText');

    // --- CHANGED: Add event listeners for tabs and links ---
    document.getElementById('dashboard-tab').addEventListener('click', () => showTab('dashboard'));
    document.getElementById('history-tab').addEventListener('click', () => showTab('history'));
    
    document.getElementById('youtube-button').addEventListener('click', () => openSite('https://www.youtube.com'));
    document.getElementById('facebook-button').addEventListener('click', () => openSite('https://www.facebook.com'));
    document.getElementById('instagram-button').addEventListener('click', () => openSite('https://www.instagram.com'));

    // Load settings and data
    loadSettings();
    loadStats();
    loadActivityLog();
    loadHistoryLog();

    // Event Listeners
    statusToggle.addEventListener('change', function() {
        const isEnabled = statusToggle.checked;
        statusText.textContent = isEnabled ? 'Enabled' : 'Disabled';
        chrome.storage.local.set({ enabled: isEnabled });
    });

    document.getElementById('historySearch').addEventListener('input', filterHistory);
    document.getElementById('historyFilter').addEventListener('change', filterHistory);
});

// --- Tab Switching ---
// CHANGED: This function now takes the tabName as an argument
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    
    // CHANGED: Set the correct button to active
    if (tabName === 'dashboard') {
        document.getElementById('dashboard-tab').classList.add('active');
    } else if (tabName === 'history') {
        document.getElementById('history-tab').classList.add('active');
    }
}

// --- Quick Links ---
function openSite(url) {
    chrome.tabs.create({ url: url });
}

// --- Data Loading and Management ---
function loadSettings() {
    chrome.storage.local.get({ enabled: true }, function(data) {
        document.getElementById('statusToggle').checked = data.enabled;
        document.getElementById('statusText').textContent = data.enabled ? 'Enabled' : 'Disabled';
    });
}

function loadStats() {
    chrome.storage.local.get({ stats: { today: 0, week: 0, total: 0 } }, function(data) {
        document.getElementById('blockedToday').textContent = data.stats.today;
        document.getElementById('blockedWeek').textContent = data.stats.week;
        document.getElementById('blockedTotal').textContent = data.stats.total;
    });
}

function loadActivityLog() {
    chrome.storage.local.get({ activityLog: [] }, function(data) {
        const logContent = document.getElementById('activityLogContent');
        const log = data.activityLog.slice(-5).reverse(); // Get last 5 entries, newest first
        if (log.length === 0) {
            logContent.innerHTML = '<p>No recent activity.</p>';
            return;
        }
        logContent.innerHTML = log.map(entry => `
            <div class="log-entry">
                <strong>${entry.platform}:</strong> "${entry.comment.substring(0, 50)}..." - Detected by ${entry.reason}
            </div>
        `).join('');
    });
}

function loadHistoryLog() {
    filterHistory();
}

function filterHistory() {
    chrome.storage.local.get({ history: [] }, function(data) {
        const searchTerm = document.getElementById('historySearch').value.toLowerCase();
        const filterPlatform = document.getElementById('historyFilter').value;
        const historyContent = document.getElementById('historyLogContent');

        let filteredHistory = data.history.filter(entry => {
            const matchesSearch = entry.comment.toLowerCase().includes(searchTerm);
            const matchesFilter = filterPlatform === 'all' || entry.platform === filterPlatform;
            return matchesSearch && matchesFilter;
        }).reverse(); // Show newest first

        if (filteredHistory.length === 0) {
            historyContent.innerHTML = '<p>No history matches your criteria.</p>';
            return;
        }

        historyContent.innerHTML = filteredHistory.map(entry => `
            <div class="log-entry">
                <strong>${new Date(entry.timestamp).toLocaleString()}</strong> - 
                <strong>${entry.platform}:</strong> "${entry.comment}" - Detected by ${entry.reason}
            </div>
        `).join('');
    });
}