import crypto from 'crypto';
export function hashIt(str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}
