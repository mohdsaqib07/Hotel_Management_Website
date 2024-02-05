"use client";

import { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};
const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 f-full">
        {/*Heading*/}
        {heading1}
        {/*Room Description*/}
        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Basic Room</p>
            <CountUpNumber duration={12000} endValue={200} />
            {/*<p className='md:font-bold font-medium text-lg xl:text-5xl'>+ 200</p>*/}
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Luxury Room</p>
            <CountUpNumber duration={12000} endValue={178} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Suite</p>
            <CountUpNumber duration={12000} endValue={112} />
          </div>
        </div>
      </div>
      {/*Images*/}
      {section2}
    </section>
  );
};

export default ClientComponent;
