import React from "react";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 p-4">About Our Platform</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    A community-driven platform where anyone can write, share, and inspire the world through blogs.
                </p>
            </section>

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-6 py-16 space-y-14">

                {/* Who We Are */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 p-4">Who We Are</h2>
                    <p className="text-md leading-relaxed">
                        Welcome to <span className="font-semibold">Sharekaro</span>, a publishing space built for creators.
                        Whether you're a student, developer, writer, or someone with a story to tell — this platform gives you the
                        freedom to express, share, and connect with a global audience.
                    </p>
                </div>

                {/* Our Mission */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3 p-3">Our Mission</h2>
                    <ul className="list-disc ml-6 space-y-2 text-lg">
                        <li>To make writing simple and accessible for everyone.</li>
                        <li>To build a positive and valuable knowledge-sharing community.</li>
                        <li>To help creators grow with visibility, engagement, and tools.</li>
                        <li>To inspire learning through real experiences and ideas.</li>
                    </ul>
                </div>

                {/* Who Can Write */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3 p-3">Who Can Write Here?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {["Students", "Developers", "Writers", "Researchers", "Tech Enthusiasts", "Creators", "Professionals", "Anyone"].map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-xl py-4 font-medium hover:shadow-lg transition"
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Developer Section */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-3 p-3">Built By</h2>
                    <p className="text-lg leading-relaxed">
                        This platform is developed by <span className="font-semibold">Suraj Khatri</span>, a passionate MERN Stack
                        Developer who believes in learning, sharing, and empowering others.
                        <br />
                        <i>
                            “I built this platform not just to write — but to let <b>others write with me.</b>”
                        </i>
                    </p>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-3 p-3">Start Your Blogging Journey Today </h3>
                    <p className="text-lg mb-5">Share your voice. Inspire others. Build your digital identity.</p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
                    onClick={() => navigate('/create')}>
                        Create Your First Blog
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
