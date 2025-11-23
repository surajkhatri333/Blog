const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-lg font-semibold mb-2">About Us</h4>
          <p className="text-sm text-gray-300">
            Welcome to our blog where we share insightful articles on various topics. Stay tuned for more updates!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><a href="/about" className="hover:underline text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:underline text-gray-300">Contact</a></li>
            <li><a href="/privacy" className="hover:underline text-gray-300">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline text-gray-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm text-gray-300">Email: sharkaro@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: XXXXXXXXXX</p>
          <p className="text-sm text-gray-300">Address: Uttarakhand,India</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex flex-col space-y-1 text-sm">
            <a href="https://facebook.com" target="_blank"  className="hover:underline text-gray-300">Facebook</a>
            <a href="https://twitter.com" target="_blank" className="hover:underline text-gray-300">Twitter</a>
            <a href="https://instagram.com" target="_blank"  className="hover:underline text-gray-300">Instagram</a>
            <a href="https://linkedin.com" target="_blank"  className="hover:underline text-gray-300">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        <p>© 2024 Your Blog Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
