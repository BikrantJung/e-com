import HomeUI from '@/components/Home';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HomeUI />
    </main>
  );
}
