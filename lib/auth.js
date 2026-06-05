import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'freightpilot-super-secret-jwt-key-2024';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromCookies(request) {
  const cookies = request.headers.get('cookie') || '';
  const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('token='));
  if (!tokenCookie) return null;
  const token = tokenCookie.split('=')[1];
  return verifyToken(token);
}

export function setTokenCookie(response, token) {
  response.headers.set(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
  );
}

export async function getAuthUser(request) {
  const payload = getTokenFromCookies(request);
  if (!payload) return null;
  
  const { prisma } = await import('./prisma.js');
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { subscription: true, company: true },
  });
  return user;
}