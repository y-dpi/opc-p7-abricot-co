import { redirect } from 'next/navigation';

// Redirect the index route to the dashboard.
export default function Home() {
  redirect('/dashboard');
}
