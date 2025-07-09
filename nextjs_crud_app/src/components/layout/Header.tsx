import React from 'react';
import { ModeToggle } from '../Toggler';
import { Button } from '../ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="h-[100px] w-full flex justify-between items-center py-2 px-5 md:px-20">
      <Link href={'/'} className="font-bold text-3xl">
        NextProject
      </Link>

      <div className="flex items-center gap-2 md:gap-5">
        <ModeToggle />
        <Button>Signup</Button>
        <Button variant={'outline'}>Login</Button>
      </div>
    </header>
  );
};

export default Header;
