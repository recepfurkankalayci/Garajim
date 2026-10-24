const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cok-gizli-super-anahtar-123';

module.exports = (req,res,next)=> {

    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Erişim reddedildi. Geçerli bir token bulunamadı.' });
  }
  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
};
  
