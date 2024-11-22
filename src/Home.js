import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTasks, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import ReactPlayer from "react-player";
import { FiMail } from "react-icons/fi";
import { AiFillFacebook, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination styles
import "swiper/css/autoplay"; // Autoplay styles

import { features, testimonials, blogPosts } from "./data"; // Import separated data
import "./styles.css"; // Import separated styles

const iconComponents = {
    tasks: <FaTasks className="text-4xl text-green-600 mb-4" />,
    calendar: <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />,
    chart: <FaChartLine className="text-4xl text-purple-600 mb-4" />,
};

function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"

             style={{
                 backgroundImage: "url('https://www.transparenttextures.com/patterns/shattered.png')",
                 backgroundColor: "#090085",
                 backgroundRepeat: "repeat",
                 backgroundAttachment: "fixed",
             }}


        >
            {/* Hero Section */}
            <section className="relative z-10 text-center p-8">
                <motion.h1
                    className="text-5xl font-bold mb-4 text-white fade-in"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Welcome to OmniFlowAI
                </motion.h1>
                <motion.p
                    className="text-xl text-white mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Revolutionizing management with AI-driven solutions.
                </motion.p>
                <motion.div
                    className="flex justify-center space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Link to="/signup">
                        <button className="px-6 py-3 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 shadow-lg transition duration-300">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="px-6 py-3 text-white bg-blue-600 font-semibold border border-gray-400 rounded-lg hover:bg-green-600 hover:text-white shadow-lg transition duration-300">
                            Login
                        </button>
                    </Link>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 mt-16 p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {iconComponents[feature.icon]}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Video Section */}
            <section className="relative z-10 mt-16 p-8 w-full flex justify-center">
                <div className="w-full max-w-4xl aspect-w-16 aspect-h-9">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">
                        Discover OmniFlowAI
                    </h2>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
            </section>
            {/* Wrapped Content Section */}
            <div className="w-[80%] mx-auto">
            {/* Testimonials Section */}
            <section className="relative z-10 mt-16 p-8 bg-gray-200 rounded-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    What Our Users Say
                </h2>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="w-full max-w-4xl"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <p className="text-gray-600 italic mb-4">
                                    "{testimonial.quote}"
                                </p>
                                <h4 className="text-gray-800 font-bold">{testimonial.name}</h4>
                                <p className="text-gray-600">{testimonial.position}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>


                {/* Partners Section */}
                <section className="relative z-10 mt-16 p-8 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Our Partners
                    </h2>
                    <div className="flex justify-center space-x-8">
                        <img src="/images/partner1.png" alt="Partner 1" className="h-16" />
                        <img src="/images/partner2.png" alt="Partner 2" className="h-16" />
                        <img src="/images/partner3.png" alt="Partner 3" className="h-16" />
                        <img src="/images/partner4.png" alt="Partner 4" className="h-16" />
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative z-10 mt-16 p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                What is OmniFlowAI?
                            </h3>
                            <p className="text-gray-600">
                                OmniFlowAI is an AI-driven platform designed to enhance management processes through automation, intelligent scheduling, and data analytics.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                How can I get started with OmniFlowAI?
                            </h3>
                            <p className="text-gray-600">
                                You can get started by signing up for a free trial on our platform. Our onboarding process is designed to help you integrate OmniFlowAI into your workflow quickly and efficiently.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Who can benefit from OmniFlowAI?
                            </h3>
                            <p className="text-gray-600">
                                Our platform is ideal for businesses of all sizes, project managers, team leaders, and anyone looking to streamline their management processes.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Contact Section */}
            <section className="relative z-10 mt-16 p-8  w-full text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="mb-8">
                    Reach out for questions, support, or to learn more about OmniFlowAI.
                </p>
                <div className="flex justify-center space-x-4">
                    <FiMail className="text-4xl" />
                    <AiFillFacebook className="text-4xl" />
                    <AiFillTwitterCircle className="text-4xl" />
                    <AiFillLinkedin className="text-4xl" />
                </div>
            </section>
        </div>
    );
}

export default Home;
