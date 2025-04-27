import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "shorty-url",
  description: "helps you shorten your url easily",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="bg-gray-900">
            <SignedOut>
              <div className="min-h-screen flex justify-center items-center gap-2">
                <div className="bg-green-300 rounded-md shadow-2xl p-1">
                  <SignInButton />
                </div>
                <div className="bg-amber-600 rounded-md shadow-2xl p-1">
                  <SignUpButton />
                </div>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="min-h-screen flex flex-col">
                <div className="bg-gray-900 flex justify-between">
                  <div className="bg-amber-600 rounded-md p-1 m-1">
                    <SignOutButton />
                  </div>
                  <div>
                    <UserButton />
                  </div>
                </div>
                <div>
                  {children}
                </div>
              </div>
              
            </SignedIn>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
