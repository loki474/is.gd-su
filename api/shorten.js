export default async function handler(req, res) {
  const { url, service } = req.query;
  if (!url) return res.status(400).send('Missing url');

  try {
    let shortened = '';

    if (service === 'tinycc') {
      const r = await fetch(`https://tiny.cc/?c=simple_make&m=json&u=${encodeURIComponent(url)}`);
      const j = await r.json();
      shortened = j.short_url || '';
    } else if (service === 'sorbz') {
      const r = await fetch(`https://sor.bz/api.php?url=${encodeURIComponent(url)}`);
      const t = await r.text();
      shortened = t.trim();
    } else if (service === 'gosu') {
      const r = await fetch(`https://goo.su/api/links/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alias: '' })
      });
      const j = await r.json();
      shortened = j.short_url || j.link || '';
    } else if (service === 'shorturl') {
      const r = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const j = await r.json();
      shortened = j.result?.full_short_link || '';
    } else if (service === 'surlasia') {
      const r = await fetch(`https://surlasia.com/api.php?api=shorten&url=${encodeURIComponent(url)}`);
      const t = await r.text();
      shortened = t.trim();
    } else {
      // Default: is.gd
      const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortened = (await r.text()).trim();
    }

    if (!shortened) return res.status(500).send('Could not shorten URL');
    res.setHeader('Content-Type', 'text/plain');
    res.send(shortened);
  } catch (e) {
    res.status(500).send('Error: ' + e.message);
  }
}
