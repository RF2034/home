import Link from "next/link";

const Footer = () => (
  <footer className="bg-base-200 text-base-content">
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-3 text-primary">About</h3>
          <p className="text-sm">cigareのブログです</p>
          <p className="text-sm">日記とかドールさんとか音楽とか</p>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-3 text-primary">Connect</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://twitter.com/c1gare_t7s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors flex items-center"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              @c1gare_t7s
            </a>
            <p className="text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              cigare2039あっとじーめーるどっとこむ
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm font-light text-primary">Rin☆Don☆Ri☆Don</p>
      </div>
    </div>
  </footer>
);

export default Footer;
