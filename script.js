const canopy = document.getElementById('canopy');
const colors = ['#1a4d2e','#2d7a45','#0d2b1a','#4caf6e','#3d6b50'];

for (let i = 0; i < 30; i++) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${40+Math.random()*80}px;height:${40+Math.random()*80}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*6}s;animation-duration:${6+Math.random()*6}s;transform:rotate(${Math.random()*360}deg);`;
  canopy.appendChild(leaf);
}

const RATE = 0.3;
const startTime = Date.now();

function fieldsSinceMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setUTCHours(0,0,0,0);
  return Math.floor((now - midnight) / 1000 * RATE);
}
const todayBase = fieldsSinceMidnight();

function fmt(n) { 
  return n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); 
}

function fmtInt(n) { 
  return Math.floor(n).toLocaleString('de-DE'); 
}

const counterEl = document.getElementById('counter');
const tickMin   = document.getElementById('tick-min');
const tickHour  = document.getElementById('tick-hour');
const tickToday = document.getElementById('tick-today');

function update() {
  const elapsed = (Date.now() - startTime) / 1000;
  const fields = elapsed * RATE;
  counterEl.textContent = fmt(fields);
  const now = new Date();
  const secInMin  = now.getSeconds() + now.getMilliseconds()/1000;
  const secInHour = now.getMinutes()*60 + secInMin;
  tickMin.textContent  = fmtInt(secInMin * RATE);
  tickHour.textContent = fmtInt(secInHour * RATE);
  tickToday.textContent = fmtInt(todayBase + fields);
  requestAnimationFrame(update);
}

update();
