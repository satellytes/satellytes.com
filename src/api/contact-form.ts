export default function handler(req, res) {
  console.log(`submitted form`, req.body);
  res.status(200).json({ hello: `world` });
}
