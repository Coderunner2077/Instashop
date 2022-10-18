import React from 'react';
import Head from "next/head";
import { Navbar, Footer, Alert } from ".";

const Layout = ({ children }) => {
    return (
        <div className="py-1 pl-0 pr-1.5 sm:px-1.5">
            <Head>
                <title>Instashop</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Alert />
            <header>
                <Navbar totalItems={0} />
            </header>
            <main className="w-full max-w-[1400px] m-auto  pr-2 sm:pr-4">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout