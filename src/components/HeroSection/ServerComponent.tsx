import Image from "next/image";

// one advantage of partial server component is faster loading time and prerendering
// these both export will be passed as props to the ClientComponent
export const heading1 = (
  <>
    <h1 className="font-heading mb-6">Explore our Exquisite Hotel</h1>
    <p className="text-[#4a4a4a] dark:text-[#f5f5f5] mb-12 max-w-lg ">
      Experiance an Exquisite Hotel Immersed in Rich history and Timeless
      Elegence.
    </p>
    <button className="btn-primary">Get Started</button>
  </>
);

export const section2 = (
  <div className="md:grid hidden gap-8 grid-cols-1">
    <div className="rounded-2xl overflow-hidden h-48">
      <Image
        src="https://source.unsplash.com/1600x1000/?hotel"
        alt="image1"
        width={300}
        height={300}
        className="img scale-animation"
      />
    </div>
    <div className="grid grid-cols-2 gap-8 h-48">
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="https://source.unsplash.com/1600x1000/?resort"
          alt="image1"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="https://source.unsplash.com/1600x1000/?rooms"
          alt="image1"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
    </div>
  </div>
);
