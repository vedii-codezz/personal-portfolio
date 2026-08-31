import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative">
      <Hero />
      <About />
      <SelectedWork />
      <Contact />
    </div>
  );
}
