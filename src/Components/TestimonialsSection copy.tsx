import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Haris Aslam",
    text: "Thanks for the quick service and superb loan processing. Really happy with PaisaBoxx!",
    rating: 5,
  },
  {
    name: "Shiju R",
    text: "A pleasure to interact and so easy to get a quick loan. Setting up the formalities and completing the process was highly recommended.",
    rating: 5,
  },
  {
    name: "Archana Shinde",
    text: "Got loan within minutes with all proper steps. Very quick service from a supportive staff. Highly recommend this one.",
    rating: 5,
  },
  {
    name: "Santhi K",
    text: "Excellent experience. Fast approval, no hidden charges. The entire process was seamless and transparent.",
    rating: 4,
  },
  {
    name: "Rahul Verma",
    text: "Very smooth process and quick disbursal. Customer support was also very helpful.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[linear-gradient(135deg,#f8fafc,#eef2ff)]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Customers <span className="text-purple-600">Love Us</span>
          </h2>
          <p className="text-gray-500">
            Real stories from real people who trust us with their financial needs.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto flex">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between w-full h-full"
              >
                <div>
                  <Quote className="w-8 h-8 text-purple-300 mb-3" />

                  {/* FIXED TEXT HEIGHT */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-4 min-h-[80px]">
                    {t.text}
                  </p>
                </div>

                <div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`w-4 h-4 ${
                          si < t.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-semibold text-sm">{t.name}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TestimonialsSection;