import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col justify-center items-center relative">
      {/* Background circle animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 opacity-20 blur-3xl"></div>

      {/* Content */}
      <div className="z-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Welcome to Your Career Path
        </h2>
        <p className="text-xl text-white mb-10 max-w-lg mx-auto">
          Get ready for your dream job with AI-powered mock interviews. Your journey to success starts here!
        </p>

        {/* Sign in Button */}
        <Link href="/dashboard">
          <Button className="px-6 py-3 rounded-lg text-white bg-primary hover:bg-blue-600 transition duration-200 transform hover:scale-105">
            Sign In
          </Button>
        </Link>
      </div>

      {/* Optional: Add Lottie animation */}
      <div className="absolute bottom-10 w-full flex justify-center">
        {/* Replace with your Lottie component if necessary */}
        {/* <LottieAnimation /> */}
      </div>
    </div>
  );
}
