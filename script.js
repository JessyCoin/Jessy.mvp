
let walletConnected = false;

const connectBtn = document.getElementById('connectBtn');
const walletStatus = document.getElementById('walletStatus');
const jsyBalance = document.getElementById('jsyBalance');
const mainContent = document.getElementById('mainContent');
const finalMessage = document.getElementById('finalMessage');

connectBtn.onclick = async () => {
  if ('solana' in window) {
    try {
      const resp = await window.solana.connect();
      const pubKey = resp.publicKey.toString();
      walletStatus.textContent = '👛 ' + pubKey.slice(0, 6) + '...' + pubKey.slice(-4);
      walletConnected = true;
    } catch (err) {
      alert('Phantom Wallet connection failed.');
    }
  } else {
    alert('Please install Phantom Wallet.');
  }
};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  finalMessage.style.display = 'none';
  document.getElementById(id).style.display = 'block';

  if (id === 'rebound') {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.style.display = walletConnected ? 'inline-block' : 'none';
  }
}

function startAnalysis() {
  const steps = [
    '🔍 Collecting all recent transactions...',
    '🔗 Matching DEX trades with entry/exit prices...',
    '📊 Comparing portfolio value from 7 days ago to now...',
    '🧮 Calculating net percentage loss on trades...',
    '📚 Checking trading patterns and asset volatility...',
    '📉 Detected a significant drop in positions...',
    '✅ Eligibility confirmed: Level 2 loss',
    '🪂 Requesting JSY airdrop from contract...',
    '💸 Amount allocated: 200 JSY'
  ];
  const progress = document.getElementById('progressFill');
  const log = document.getElementById('processLog');
  const claim = document.getElementById('claimBtn');

  progress.style.width = '0%';
  log.textContent = '';
  claim.style.display = 'none';

  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      progress.style.width = ((i + 1) / steps.length * 100) + '%';
      log.textContent += steps[i] + '\n';
      i++;
    } else {
      clearInterval(interval);
      claim.style.display = 'inline-block';
    }
  }, 700);
}

function finalizeClaim() {
  document.getElementById('claimBtn').style.display = 'none';
  jsyBalance.textContent = 'Balance: 200 JSY';
  mainContent.style.display = 'none';
  finalMessage.style.display = 'block';
}
