import React from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";

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
      
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if(slice.primary.first_name === undefined || slice.primary.first_name === null) throw new Error("First name missing in Hero slice.");
    const letters = slice.primary.first_name.split('');
    return letters.map((letter, index) => {
      return <span 
        key={index} 
        className={`name-animation name-animation-${key} inline-block opacity-0`}>
          {letter}</span>;
    });
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-clamp font-extrabold leading-none tracking-tighter" 
          aria-label={slice.primary.first_name + " " + slice.primary.last_name}>
            {slice.primary.first_name && <span className={"block text-indigo-200"}>{renderLetters(slice.primary.first_name, "first")}</span>}
            {slice.primary.last_name && <span className={"-mt-1 text-indigo-400"}>{renderLetters(slice.primary.last_name, "last")}</span>}
          </h1>
            {slice.primary.tag_line && <span 
            className={"block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.15em] text-transparent opacity-100 md:text-4xl"}
            >{slice.primary.tag_line}</span>}      
        </div>
      </div>
    </section>
  );
};

export default Hero;
