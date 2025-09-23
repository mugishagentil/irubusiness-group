import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            rating: 5,
            quote: "A tempora porro est quod laudantium aut consequatur voluptas eum iste eaque sit praesentium similique. Est nobis quas eos galisum sapiente qui ipsam nam dolore amet!",
            avatar: "https://placehold.co/40x40/c0c0c0/ffffff?text=JS",
            name: "John Smith",
            title: "Product Manager"
        },
        {
            rating: 5,
            quote: "A tempora porro est quod laudantium aut consequatur voluptas eum iste eaque sit praesentium similique. Est nobis quas eos galisum sapiente qui ipsam nam dolore amet!",
            avatar: "https://placehold.co/40x40/c0c0c0/ffffff?text=EJ",
            name: "Emily Johnson",
            title: "CEO at TechStart"
        },
        {
            rating: 4,
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            avatar: "https://placehold.co/40x40/c0c0c0/ffffff?text=MA",
            name: "Michael Adams",
            title: "Senior Developer"
        },
        {
            rating: 5,
            quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            avatar: "https://placehold.co/40x40/c0c0c0/ffffff?text=SA",
            name: "Sarah Anderson",
            title: "Marketing Specialist"
        },
        {
            rating: 5,
            quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            avatar: "https://placehold.co/40x40/c0c0c0/ffffff?text=DB",
            name: "David Brown",
            title: "Business Analyst"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = testimonials.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.691h4.183c.969 0 1.371 1.24.588 1.81l-3.38 2.459a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.459a1 1 0 00-1.176 0l-3.38 2.459c-.785.57-1.84-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.071 9.395c-.783-.57-.38-1.81.588-1.81h4.183a1 1 0 00.95-.691l1.286-3.967z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <section className="py-32 px-6 sm:px-10 lg:px-16 text-gray-800 bg-[#ebf3f6]">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12">
                {/* Left Side: Heading and Description */}
                <div className="lg:w-1/3 space-y-4">
                    <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white bg-yellow-500 border border-purple-200">
                        Testimonials
                    </span>
                    <h2 className="text-4xl lg:text-5xl text-[#141414] font-bold leading-tight">
                        Hear what our clients have to say
                    </h2>
                    <p className="text-[#141414] leading-relaxed">
                        Mauris sit amet mauris mauris quis leo commodo viverra. Pellentesque habitant tristique
                        senectus et netus et malesuada fames turpis ac egestas.
                    </p>
                </div>

                {/* Right Side: Testimonial Cards Slider */}
                <div className="lg:w-2/3 p-10 lg:p-12 overflow-hidden relative group" style={{ backgroundColor: '#bdcddc' }}>
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentSlide * 100) / (window.innerWidth >= 1024 ? 2 : 1)}%)`
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="flex-shrink-0 w-full lg:w-1/2 p-3">
                                <div className="relative bg-white p-8 rounded-xl shadow-md border border-gray-200 min-h-[350px]">
                                    <div className="flex items-center space-x-1 mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {testimonial.quote}
                                    </p>
                                    <div className="flex items-center space-x-4 z-10 relative">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                            <p className="text-sm text-yellow-500">{testimonial.title}</p>
                                        </div>
                                    </div>
                                    {/* Yellow Quote Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                        className="w-10 h-10 text-yellow-500 absolute bottom-4 right-4 z-0 opacity-20">
                                        <path d="M7.17 6C5.39 6 4 7.39 4 9.17V13a4 4 0 0 0 4 4v2a6 6 0 0 1-6-6V9.17C2 6.35 4.35 4 7.17 4H8v2h-.83Zm10 0C15.39 6 14 7.39 14 9.17V13a4 4 0 0 0 4 4v2a6 6 0 0 1-6-6V9.17C12 6.35 14.35 4 17.17 4H18v2h-.83Z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                                    index === currentSlide ? 'bg-yellow-700' : 'bg-gray-200 hover:bg-gray-500'
                                }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
