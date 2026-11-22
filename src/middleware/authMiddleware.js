
import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      errors: ['Authentication token is required'],
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: Number(decoded.sub),
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Invalid or expired authentication token'],
    });
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        errors: ['You do not have permission to perform this action'],
      });
    }

    next();
  };
}
