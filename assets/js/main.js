(function () {
  // Live kill feed simulation in the hero terminal.
  var events = [
    { method: 'POST', path: "/rest/user/login", payload: "' OR 1=1--",            killed: true,  reason: 'sqli',         ms: 38 },
    { method: 'GET',  path: '/api/products',    payload: '?q=shoes',              killed: false, reason: 'benign',       ms: 12 },
    { method: 'POST', path: '/comments',        payload: '<scr'+'ipt>steal()<\/scr'+'ipt>', killed: true, reason: 'xss', ms: 33 },
    { method: 'POST', path: '/rest/user/login', payload: 'admin',                 killed: false, reason: 'benign',       ms: 9  },
    { method: 'GET',  path: '/api/search',      payload: '?q=UNION+SELECT+pwd',   killed: true,  reason: 'sqli',         ms: 41 },
    { method: 'POST', path: '/rest/feedback',   payload: 'great service',         killed: false, reason: 'benign',       ms: 11 },
    { method: 'GET',  path: '/api/fetch',       payload: '?url=169.254.169.254',  killed: true,  reason: 'ssrf',         ms: 29 },
    { method: 'POST', path: '/api/register',    payload: "name=O'Brian",          killed: false, reason: 'benign',       ms: 15 },
    { method: 'GET',  path: '/api/orders',      payload: '?id=1;DROP TABLE',      killed: true,  reason: 'sqli',         ms: 36 },
    { method: 'POST', path: '/api/ping',        payload: 'host=8.8.8.8;rm -rf',   killed: true,  reason: 'cmd-injection',ms: 31 },
    { method: 'GET',  path: '/assets/logo.svg', payload: '',                      killed: false, reason: 'benign',       ms: 4  },
    { method: 'POST', path: '/rest/user/login', payload: '%27%20OR%201%3D1',      killed: true,  reason: 'sqli',         ms: 44 },
    { method: 'POST', path: '/api/login',       payload: 'user=root,pass=...',    killed: true,  reason: 'cred-stuff',   ms: 27 }
  ];

  var ips = ['185.220.101.4', '94.142.241.111', '45.155.205.233', '203.0.113.7', '198.51.100.42', '172.245.16.88'];
  var feed = document.getElementById('feed');
  if (!feed) return;
  var maxRows = 7;
  var i = 0;

  function fmtTime(d) {
    var h = String(d.getHours()).padStart(2, '0');
    var m = String(d.getMinutes()).padStart(2, '0');
    var s = String(d.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function makeRow(ev) {
    var ip = ips[Math.floor(Math.random() * ips.length)];
    var div = document.createElement('div');
    div.className = 'term-line row';
    var verdict = ev.killed
      ? '<span class="killed">KILL</span>'
      : '<span class="passed">PASS</span>';
    var pathDisplay = (ev.path + ev.payload).slice(0, 42);
    div.innerHTML =
      '<span class="ts">' + fmtTime(new Date()) + '</span>' +
      '<span class="ip">' + ip + '</span>' +
      '<span class="method">' + ev.method + '</span>' +
      '<span class="path">' + pathDisplay + '</span>' +
      verdict +
      '<span class="ms">' + ev.ms + 'ms · ' + ev.reason + '</span>';
    return div;
  }

  function tick() {
    var ev = events[i % events.length];
    i++;
    var row = makeRow(ev);
    feed.appendChild(row);
    requestAnimationFrame(function () { row.classList.add('show'); });
    while (feed.children.length > maxRows) {
      feed.removeChild(feed.firstChild);
    }
  }

  // Pre-populate a few rows so it doesn't look empty on load
  for (var k = 0; k < 4; k++) tick();
  setInterval(tick, 1800);
})();
