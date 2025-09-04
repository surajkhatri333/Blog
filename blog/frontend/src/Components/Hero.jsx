import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative top-20  md:w-full  md:top-20  px-4 flex flex-col justify-between mb-30 ">
      <div className=' flex flex-col justify-around gap-10'>
        <div className="max-w-6xl min-h-min mx-auto grid md:grid-cols-1 items-center gap-12">
          {/* Left Content */}
          <div className=" p-6 flex flex-col gap-3">
            <h1 className="h-15 text-3xl md:text-3xl font-extrabold text-indigo-800 leading-tight">
              Unleash Your Words
            </h1>
            <p className="text-lg text-gray-700 max-w-md h-25">
              Welcome to your personal space for thoughts and stories. Connect, express, and inspire others with your blog.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition"
              >
                Explore Blogs
              </button>
              <Link
                to="/create"
                className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full shadow-sm transition"
              >
                Create Blog
              </Link>
            </div>
          </div>

          {/* Right Image */}
          {/* <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1532619675605-1e6f76abf2b5?auto=format&q=80&w=2000"
              alt="Hero"
              className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
            />
          </div> */}
        </div>

        {/* Features Section */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[7vh] max-w-6xl mx-auto">
          {[
            {
              title: 'Engaging Community',
              desc: 'Be part of a creative community where voices matter.',
              icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            },
            {
              title: 'Creative Freedom',
              desc: 'Write the way you want—long form or bite-sized thoughts.',
              icon: 'https://cdn-icons-png.flaticon.com/512/2436/2436635.png',
            },
            {
              title: 'Share Instantly',
              desc: 'Publish and connect with your audience in just a click.',
              icon: 'https://cdn-icons-png.flaticon.com/512/709/709496.png',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className=" bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center space-y-4"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-xl font-semibold text-indigo-700">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
