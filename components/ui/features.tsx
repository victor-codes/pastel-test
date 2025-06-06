"use client";
import { cx } from "@/lib";
import { FeaturesProps } from "@/types/home";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Image from "next/image";
import { useId, useState } from "react";
import { AnimatedLines } from "./animated-lines";
import { SectionLink } from "./section-link";

const lines = ["block", "block", "lap:hidden"];

export const Features = ({ title, list, isAlternate }: FeaturesProps) => {
  const compId = useId();

  const images = list.map(({ imageUrl, id }) => ({
    id,
    imageUrl,
  }));
  const lastItemIdx = images.length - 1;
  const [value, setValue] = useState(list[0].id); // default open

  const handleChange = (newValue: string | undefined) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  const selectedIdx = images.findIndex(({ id }) => id === value);

  return (
    <section aria-labelledby={`feat-heading-${compId}`} className="section">
      <div className="wrapper">
        <AnimatedLines lines={lines}>
          <h2
            id={`feat-heading-${compId}`}
            className="section-title font-medium text-black"
          >
            {title}
          </h2>
        </AnimatedLines>

        <div className="mt-31">
          <div
            className={cx(
              "flex flex-col lap:flex-row gap-x-12 gap-y-4 lap:max-h-[540px]",
              {
                "lap:flex-row-reverse": isAlternate,
              }
            )}
          >
            <Accordion
              type="single"
              collapsible
              value={value}
              onValueChange={handleChange}
              className={cx("grid lap:max-w-[400px] gap-y-12", {
                "lap:max-w-[450px]": isAlternate,
              })}
            >
              {list.map(({ id, link, title, description, imageUrl }, idx) => (
                <div key={id} className="">
                  <AccordionItem
                    value={id}
                    className="relative group grid bg-background
                    grid-cols-[36px_1fr]
                    gap-x-8 rounded-lg items-start"
                  >
                    <div
                      className={cx(
                        "absolute h-[calc(100%_+_9px)] w-0.5 left-4.5 top-9.5 bg-royal-150 transition-[height] duration-500 ease-in-out",
                        {
                          "!h-[calc(100%_-_70px)] group-data-[state=closed]:!h-0":
                            idx === lastItemIdx,
                        }
                      )}
                    />

                    <div className="flex items-center justify-center w-9 h-9">
                      <div className="relative w-1.5 h-1.5 bg-royal rounded-full z-[1]" />
                      <div className="absolute w-6 h-6 bg-royal-150 rounded-full transform transition-transform duration-500 ease-in-out group-data-[state=closed]:scale-0" />
                    </div>

                    <AccordionHeader className="mb-6">
                      <AccordionTrigger className="text-left">
                        <h3 className="text-2xl tab:text-[28px] leading-[1.2] -tracking-[1.3px] md:text-[32px] font-semibold transition-transform duration-500 transform origin-left group-data-[state=closed]:opacity-50 group-data-[state=closed]:scale-75">
                          {title}
                        </h3>
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent
                      className={cx(
                        "grid col-start-2 gap-y-4.5 will-change-[height] no-scrollbar overflow-clip data-[state=closed]:animate-slideArdUp data-[state=open]:animate-slideArdDown",
                        {
                          "max-w-[300px]": isAlternate,
                        }
                      )}
                    >
                      <p className="text-gray-700 leading-[1.4]">
                        {description}
                      </p>
                      {link && (
                        <SectionLink linkTo={link.href}>
                          {link.label}
                        </SectionLink>
                      )}
                      <div className="relative aspect-[1.4] rounded-xl overflow-hidden lap:hidden">
                        <Image src={imageUrl} alt={""} fill />
                      </div>
                      <div className="h-12 lap:h-14" />
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>

            <div
              className={cx(
                "hidden lap:flex w-[55%] relative mb-4 h-[540px] rounded-18 overflow-hidden",
                {
                  "ml-auto": !isAlternate,
                  "mr-auto": isAlternate,
                }
              )}
            >
              {images.map(({ imageUrl, id }, idx) => (
                <div
                  key={id}
                  className={cx(
                    "absolute w-full h-full ease-in-out transition-[clip-path] overflow-hidden duration-700 origin-[0%_50%]",
                    zIndexes[idx as keyof typeof zIndexes],
                    {
                      "[clip-path:inset(0_100%_0_0_round_18px)]":
                        idx < selectedIdx,
                      "[clip-path:inset(0_0_0_0_round_18px)]":
                        idx >= selectedIdx,
                    }
                  )}
                >
                  <Image
                    src={imageUrl}
                    alt={""}
                    className=" object-cover w-full h-full "
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const zIndexes = {
  0: "z-4",
  1: "z-3",
  2: "z-2",
  3: "z-1",
};
