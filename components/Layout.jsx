import React from 'react';
import Head from "next/head";
import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
    return (
        <div className="p-2.5">
            <Head>
                <title>Instashop</title>
            </Head>
            <header>
                <Navbar totalItems={0} />
            </header>
            <main className="w-full max-w-[1400px] m-auto">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout