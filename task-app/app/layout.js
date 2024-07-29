"use client"; // Ensure this is at the top

import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { Provider, useSelector } from "react-redux";
import store from "@/src/utils/store";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <NextTopLoader
            height={4}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
          <header></header>
          <Provider store={store}>
            <Toaster />

            <MainContent>{children}</MainContent>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

function MainContent({ children }) {
  const { isSignedIn } = useUser();

  return (
    <div className="flex p-4 gap-4 h-screen">
      {isSignedIn && <Sidebar />}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
