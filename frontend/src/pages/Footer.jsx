import React from 'react'

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-100 to-fuchsia-100 border-t border-violet-200 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Logo and copyright */}
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div> */}
              <span className="text-lg font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                GetSetCV
              </span>
              <span className="ml-4 text-gray-500 text-sm hidden md:inline">
                © {new Date().getFullYear()} Shivam Darbar. All rights reserved.
              </span>
            </div>
            {/* Center: Social links */}
            <div className="flex gap-5">
              {/* <a
                href="https://github.com/v1shivamdarbar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-violet-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="lucide lucide-github"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V25"></path>
                </svg>
              </a> */}
              <a
                href="https://www.linkedin.com/in/shivm-darbar-a7b084313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="lucide lucide-linkedin"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 0 0-4 0" />
                </svg>
              </a>
              <a
                href="mailto:support@getsev.com"
                className="text-gray-500 hover:text-fuchsia-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
            </div>
            {/* Right: Creator credit */}
            <div className="text-gray-500 text-sm text-center md:text-right">
              Made with <span className="text-pink-500">♥</span> by{" "}
              <a
                href="https://v1shivamdarbar.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-violet-700 hover:underline"
              >
                Shivam Darbar
              </a>
            </div>
          </div>
        </footer>
  )
}

export default FooterComponent
