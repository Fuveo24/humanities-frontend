"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const IMAGES = [
 { src: "/gallery/armenian_genocide_adana_ruins.jpg", alt: "Ruins of Adana after the massacre, Cilicia — 1909" },
{ src: "/gallery/desert_camp.jpg", alt: "Armenian deportees in a desert concentration camp, Syrian Desert — 1915" },
{ src: "/gallery/forced_labor.jpg", alt: "Armenian children mocked by a Turkish man holding out a piece of bread — 1915" },
{ src: "/gallery/orphan_camp.jpg", alt: "Hundreds of Armenian orphan children gathered at a refugee camp — 1915" },
{ src: "/gallery/mother_and_child.jpg", alt: "A grieving mother kneels beside her dying child on the ground — 1919" },
{ src: "/gallery/armenian_girls.jpg", alt: "Four young Armenian orphan girls, survivors of the genocide — 1915" },
];

export default function GallerySection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-stone-600 text-xs uppercase tracking-[0.3em] text-center mb-3"
        >
          Historical record
        </motion.p>

        {/* Fading gallery */}
        <div className="relative w-full aspect-4/3 overflow-hidden mb-6">
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? "bg-red-700" : "bg-stone-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* The denial message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-stone-300 text-lg md:text-xl font-light italic mb-2">
            &ldquo;
These are not statistics.
These are not history lessons.&rdquo;
          </p>
          <p className="text-red-700 text-sm uppercase tracking-[0.25em] font-medium">
            These were real people, with names, families, and futures.
Look at them. Remember them. Tell someone.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-stone-600 text-xs text-center mt-6 leading-relaxed max-w-xl mx-auto"
        >
          These images represent historical records of the Armenian Genocide.
        </motion.p>
      </div>
    </section>
  );
}
