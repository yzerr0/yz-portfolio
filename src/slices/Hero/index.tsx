'use client'

import React from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes"; 


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = React.useRef(null);
  React.useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.fromTo(
        ".name-animation",
        { opacity: 0, x: -100, rotate: -10 },
        { opacity: 1, x: 0, rotate: 0, delay: 0.5, stagger: { each: 0.1, from: "random" } ,  
          ease: "elastic.out(1,0.3)", duration: 1, transformOrigin: "left top" }
      );
      // or gsap.timeline().fromTo(...) 
      timeline.fromTo(
        ".tagline-animation",
        { opacity: 0, y: 20, scale: 1.2 },
        { opacity: 1, y: 0, duration: 1, scale: 1, ease: "elastic.out(1,0.3)" }
      )
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if(!name) throw new Error("First name missing in Hero slice.");
    const letters = name.split('');
    return letters.map((letter, index) => {
      return (
      <span 
        key={index} 
        className={`name-animation name-animation-${key} inline-block opacity-0`}>
          {letter}
      </span>
      );
    });
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-clamp font-extrabold leading-none tracking-tighter" 
          aria-label={slice.primary.first_name + "" + slice.primary.last_name}>
            {slice.primary.first_name && <span className={"block text-indigo-200"}>{renderLetters(slice.primary.first_name, "first")}</span>}
            {slice.primary.last_name && <span className={"block -mt-1 text-indigo-400"}>{renderLetters(slice.primary.last_name, "last")}</span>}
          </h1>
            {slice.primary.tag_line && <span 
            className={"tagline-animation bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 text-transparent block bg-clip-text text-2xl font-bold uppercase tracking-[.15em] opacity-0 md:text-4xl"}
            >{slice.primary.tag_line}</span>}      
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
