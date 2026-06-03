const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.sendStatus(200);
  }
  next();
});

server.use(jsonServer.bodyParser);

server.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = router.db;
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  const user = db.get('users').insert({ name, email, password }).write();
  res.json({ message: 'Registration successful', user: { id: user.id, name: user.name, email: user.email } });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = 'mock-token-' + user.id + '-' + Date.now();
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('Mock API server running on http://localhost:3001');
});
