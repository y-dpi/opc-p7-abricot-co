// Derive avatar initials from string.
function _toInitials(str: string): string {
  const formatted = str.replace(/([A-Z])/g, ' $1').trim();
  const parts = formatted.split(/[^A-Za-z0-9]+/);
  const first = parts[0]?.[0] ?? '??';
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? '';
  return `${first}${second}`.toUpperCase();
}

// Derive avatar initials from the username or email.
export default function toInitials(name: string | null, email: string): string {

  // Derive from name.
  if (name) return _toInitials(name);

  // Derive from email.
  return _toInitials(email.split('@')[0] ?? '');
}