import Link from "next/link";
import { getBlogs } from "@/../libs/client";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => (
  <header className="bg-base-200 shadow-lg">
    <div className="container mx-auto flex justify-between items-center py-4">
      <Link href="/" className="text-2xl font-bold text-primary">
        cgr
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/portfoilio"
              className="hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-base-200 text-base-content">
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About FutureBlog</h3>
          <p>Exploring the frontiers of technology and imagination.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-xl hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xl hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-xl hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 FutureBlog. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default async function HomePage() {
  const { contents } = await getBlogs();

  if (!contents) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mt-20">
            No Contents Available
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Welcome to FutureBlog
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">{blog.title}</h2>
                <p className="mb-4 text-base-content/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="card-actions justify-end">
                  <Link href={`/blogs/${blog.id}`}>
                    <button className="btn btn-primary">Read More</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
