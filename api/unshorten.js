export default async function handler(req, res) {
  const { shorturl } = req.query;
  if (!shorturl) return res.status(400).send('Missing shorturl');
  try {
    const response = await fetch(`https://is.gd/forward.php?format=simple&shorturl=${encodeURIComponent(shorturl)}`);
    const text = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.send(text);
  } catch (e) {
    res.status(500).send('Error');
  }
}
