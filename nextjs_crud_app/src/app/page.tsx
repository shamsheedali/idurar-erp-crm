import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <hr />
      <main className="h-[calc(100vh_-_101px)] w-full flex items-center justify-center">
        <section className="flex flex-col justify-center items-center gap-3 text-center">
          <h1 className="font-bold text-3xl md:text-5xl">Welcome to NextProject</h1>
          <p className="w-[400px] md:w-[500px]">
            NextProject is a fast, flexible project management app that helps you stay organized,
            track progress, and collaborate effortlessly. Create tasks, manage projects, assign
            teammates, and keep everything moving—all in one sleek workspace.
          </p>
          <Link href={'/projects'}>
            <Button className="w-fit">Get Started</Button>
          </Link>
        </section>
      </main>
    </>
  );
}
