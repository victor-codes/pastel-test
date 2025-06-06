"use client";
import { footerData } from "@/contents/footer";
import { cx } from "@/lib";
import { FooterColumnProps, SocialsProps } from "@/types/footer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "../svgs/arrow-right";
import { useLerpMousePosition } from "@/hooks/use-lerp-mos-pos";

export const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div className="col-span-1">
      <h3 className="font-semibold text-black mb-6">{title}</h3>
      <ul className="flex flex-col gap-y-3  md:gap-y-4.5">
        {links.map(({ href, name }, idx) => (
          <li key={idx}>
            <a
              href={href}
              className="block text-xs tab:text-sm leading-[1.42] lap:text-base lap:leading-[1.5] hover:text-black tracking-[-0.16px"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Socials = ({ isMobile }: SocialsProps) => {
  const socialsLinks = footerData.slice(0, 1);

  return (
    <>
      {socialsLinks.map((item, idx) => (
        <div
          key={idx}
          className={cx("col-span-1", {
            "flex gap-x-8 items-center md:hidden": isMobile,
            "hidden md:block": !isMobile,
          })}
        >
          <h4
            className={cx("text-sm font-semibold text-black ", {
              "mb-6": !isMobile,
            })}
          >
            {item.title}
          </h4>

          <ul
            className={cx("flex flex-col gap-y-4.5", {
              "flex-row gap-x-3": isMobile,
            })}
          >
            {item.links.map(({ href, name, icon }, idx) => {
              const Icon = icon as React.ComponentType;
              return (
                <li key={idx}>
                  <Link
                    aria-label={name}
                    href={href}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-md transition-all duration-300 ease"
                  >
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};

export const FooterOnboard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { lerped, onMouseMove, setTarget, setLerped } =
    useLerpMousePosition(0.1);

  const ref = useRef<HTMLDivElement>(null);

  // todo: look into the link animation

  useEffect(() => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const center = { x: bounds.width / 2, y: bounds.height / 2 };
    setTarget(center);
    setLerped(center);
  }, [setTarget, setLerped]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section>
      <div className="wrapper mb-24 lap:mb-36 ">
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          className="relative flex flex-col md:flex-row items-start lap:items-center justify-between p-8 gap-8 bg-black lap:p-16 rounded-18 overflow-hidden"
        >
          <h2 className="relative z-1 text-white text-4xl lap:text-[64px] font-medium leading-none tracking-[-3px]">
            Get Started <br /> For Free
          </h2>

          <div className="relative z-1 grid gap-y-8 md:max-w-[364px]">
            <p className="text-white text-xs lap:text-base leading-5">
              Experience the power of Droip no-code website builder, risk free.
              Create stunning, responsive sites with pure creative freedom.
            </p>

            <Link
              href="#"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative h-11 flex space-x-[5px] justify-center px-11 py-2 rounded-18 text-white"
            >
              <span className="lap:text-[18px] relative z-[1]">
                Try for Free
              </span>{" "}
              <ArrowRightIcon isHovered={isHovered} size={18} />
              <div className="absolute   transition-transform ease-out duration-300 w-full h-full rounded-xl top-1/2 transform -translate-y-1/2 left-0  bg-royal py-2 px-4 group-hover:scale-y-[1.18] group-hover:bg-royal-500 group-hover:scale-x-[0.98]" />
            </Link>
          </div>
          <div
            style={{
              transform: `translate(${lerped.x}px, ${lerped.y}px) translate(-50%, -50%)`,
            }}
            className="flex items-center justify-center absolute w-full h-full top-0 left-0 pointer-events-none transition-transform duration-0 ease-out"
          >
            <div className="w-[45.75rem] h-[31rem] bg-royal blur-[144px] opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};
