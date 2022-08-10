import Image from "next/image";
import { FC, ReactNode } from "react";
import Link from "next/link";
import useAuth from "../auth/useAuth";
// import { useAuth } from "src/auth/useAuth";

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = (props) => {
  const {children} = props;

  const {authenticated, logout} = useAuth()

  return (
    <>
      <header className='flex items-center bg-purple-900 bg-opacity-50 px-12' style={{height: '64px'}}>
        <nav className='flex justify-between items-center w-full'>
          <Link href='/'>
            <a>
              <Image src='/home-color.svg' width={30} height={30} />
            </a>
          </Link>
          {
            authenticated ? (
              <>
                <Link href='/houses/add'>
                  <a>
                    <p>Add house</p>
                  </a>
                </Link>
              <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link href='/auth'>
                <a>
                  <p>Login / Sigh Up</p>
                </a>
              </Link>
            )
          }
        </nav>
      </header>
      <main className='max-w-screen-2xl mx-auto' style={{height: 'calc(100vh -' +
          ' 64px)'}}>
        {children}
      </main>
    </>
  );
};

export default Layout;
