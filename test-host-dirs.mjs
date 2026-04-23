import { JSDOM } from 'jsdom';
import http from 'http';

async function fetchStr(url) {
  return new Promise((res, rej) => {
    http.get(url, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks).toString('utf8')));
      r.on('error', rej);
    });
  });
}

async function run(port, label) {
  const html = await fetchStr(`http://localhost:${port}/`);
  const errors = [];
  const logs = [];
  const dom = new JSDOM(html, {
    url: `http://localhost:${port}/host-directives`,
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  });
  dom.window.addEventListener('error', e => errors.push(`window error: ${e.message}`));
  dom.window.console.error = (...a) => errors.push(`console.error: ${a.map(String).join(' ')}`);
  dom.window.console.warn = (...a) => logs.push(`warn: ${a.map(String).join(' ')}`);
  await new Promise(r => setTimeout(r, 6000));
  const host = dom.window.document.querySelector('app-host-directives');
  console.log(`[${label}] host found:`, !!host);
  if (host) {
    console.log(`[${label}] before click classes: ${JSON.stringify(host.className)}`);
    host.click();
    await new Promise(r => setTimeout(r, 200));
    console.log(`[${label}] after click classes:  ${JSON.stringify(host.className)} is-rippled?`, host.classList.contains('is-rippled'));
  } else {
    console.log(`[${label}] body slice:`, dom.window.document.body.innerHTML.slice(0, 400));
  }
  if (errors.length) console.log(`[${label}] errors:`, errors);
  if (logs.length) console.log(`[${label}] warns:`, logs);
  dom.window.close();
}

await run(8080, 'ngc-rs');
console.log('---');
await run(8081, 'ng');
