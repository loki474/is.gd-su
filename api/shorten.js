export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing url');
  try {
    const response = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
    const text = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.send(text);
  } catch (e) {
    res.status(500).send('Error');
  }
}
