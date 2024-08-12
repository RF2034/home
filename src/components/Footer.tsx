import Link from "next/link";

const Footer = () => (
  <footer className="bg-base-200 text-base-content">
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p>cigareのブログです</p>
          <p>日記とかドールさんとか音楽とか</p>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://x.com/c1gare_t7s"
              className="text-xl hover:text-primary transition-colors"
            >
              Twitter
            </a>
            {/* <a
              href="#"
              className="text-xl hover:text-primary transition-colors"
            >
              GitHub
            </a> */}
            {/* <a
              href="#"
              className="text-xl hover:text-primary transition-colors"
            >
              instagram
            </a> */}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>Rin☆Don☆Ri☆Don</p>
      </div>
    </div>
  </footer>
);

export default Footer;
