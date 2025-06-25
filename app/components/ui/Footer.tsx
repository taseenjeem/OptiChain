import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Top section: Logo and navigation */}
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:justify-between">
          <Link href="/" className="text-2xl font-bold text-neutral-800">
            Opti<span className="text-primary">Chain</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/dashboard"
              className="text-neutral-600 transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/sales"
              className="text-neutral-600 transition-colors hover:text-primary"
            >
              Sales
            </Link>
            <Link
              href="/about"
              className="text-neutral-600 transition-colors hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/records"
              className="text-neutral-600 transition-colors hover:text-primary"
            >
              Records
            </Link>
            <Link
              href="/contact"
              className="text-neutral-600 transition-colors hover:text-primary"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Middle section: Tagline and social icons */}
        <div className="mt-8 flex flex-col items-center gap-y-4 md:flex-row md:justify-between">
          <p className="max-w-md text-center text-neutral-600 md:text-left">
            Cultivating Efficiency, Tracking Excellence — Your Trusted Inventory
            Management Partner
          </p>
          <div className="flex items-center gap-x-4">
            <Link href="#" aria-label="Facebook">
              <FaFacebookSquare className="h-6 w-6 text-neutral-500 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 text-neutral-500 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 text-neutral-500 transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-neutral-200" />

        {/* Bottom section: Copyright and legal links */}
        <div className="flex flex-col-reverse items-center gap-y-4 text-sm text-neutral-500 md:flex-row md:justify-between">
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
          <p className="text-center">
            © {currentYear} OptiChain Technologies, Inc.
          </p>
          <Link
            href="/terms-and-conditions"
            className="transition-colors hover:text-primary"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
