

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 lg:px-20 py-4 border-b bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center">
            C
          </div>
          <span className="font-semibold text-lg ">Chatter</span>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <button className="text-gray-600 hover:text-gray-800 cursor-pointer">About</button>
          <button className="text-gray-600 hover:text-gray-800 cursor-pointer">Security</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 cursor-pointer">
            Sign in
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 lg:px-20 py-20 bg-blue-50">
          {/* Left Text */}
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Real-time chat for teams and friends
            </h1>
            <p className="text-gray-600 mb-8">
              Fast, clean, and modern conversations. Switch between DMs and groups,
              share files, and manage members with ease.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 cursor-pointer text-white px-5 py-3 rounded-full font-medium hover:bg-blue-700">
                Get Started
              </button>
              <button className="flex items-center cursor-pointer gap-2 px-5 py-3 border rounded-full text-gray-700 hover:bg-white/60">
                <span>▶</span> See Demo
              </button>
            </div>
          </div>

          {/* Live Chat Preview */}
          <div className="bg-white shadow-sm rounded-2xl border w-full max-w-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-gray-700">💬 Live Conversation</div>
              <div className="text-xs text-gray-400">Typing...</div>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none w-fit">
                Morning! Drafted the hero section variants.
              </div>
              <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none w-fit">
                Nice. I’ll hook them into the new layout.
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none self-end w-fit">
                Sharing the link here.
              </div>
              <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none w-fit">
                Header spacing feels tight.
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none self-end w-fit">
                Increasing top padding by 8px.
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 lg:px-20 py-16 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-10">Why choose Chatter</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                ⚡ Real-time Messaging
              </h3>
              <p className="text-sm text-gray-600">
                Low-latency chat with presence indicators and readable timestamps.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                💬 Groups & DMs
              </h3>
              <p className="text-sm text-gray-600">
                Seamless switching between individual and team conversations.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                🔒 Secure
              </h3>
              <p className="text-sm text-gray-600">
                Roles, invites, and privacy-first defaults for your org.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
