"use client"; // Ensure this is at the top

import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "@/src/utils/store";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <header>
            <SignedOut>{/* <SignInButton /> */}</SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <Provider store={store}>
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
