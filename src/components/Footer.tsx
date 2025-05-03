import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-green-300 bg-green-50 backdrop-blur-sm">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded">
                <ZapIcon className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xl font-bold font-mono text-green-700">
                travel<span className="text-green-500">pal</span>.ai
              </span>
            </Link>
            <p className="text-sm text-green-800">
              © {new Date().getFullYear()} travelpal.ai — All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-sm">
            <Link href="/about" className="text-green-700 hover:text-green-900 transition-colors">
              About
            </Link>
            <Link href="/terms" className="text-green-700 hover:text-green-900 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-green-700 hover:text-green-900 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-green-700 hover:text-green-900 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-green-700 hover:text-green-900 transition-colors">
              Blog
            </Link>
            <Link href="/help" className="text-green-700 hover:text-green-900 transition-colors">
              Help
            </Link>
          </div>

          {/* Team Contact Info */}
          <div className="flex flex-col items-center gap-1 text-xs font-mono text-green-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>SYSTEM OPERATIONAL</span>
            </div>
            <div className="text-green-700">Contact: Emily, Shelly & Ivan</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
