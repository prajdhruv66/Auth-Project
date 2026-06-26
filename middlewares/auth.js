import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect('/');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/');
  }
};

export const restrictTo = (...roles) => (req, res, next) => {
  const userRole = res.locals.user?.role;
  if (!userRole || !roles.includes(userRole)) {
    return res.status(403).send('Unauthorized');
  }
  next();
};