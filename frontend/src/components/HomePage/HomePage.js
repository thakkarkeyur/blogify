import React from 'react';
import poster from '../../images/banner.png';

const HomePage = () => {
  return (
    <>
      <section className="pb-10 bg-[#F9F8F9]">
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 ml-12 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-10 mb-16 lg:mb-0">
              <h2 className="leading-tight font-nunito font-extrabold max-w-2xl mt-12 mb-12 text-5xl 2xl:text-7xl text-[#221638] font-heading">
                Build with the world’s most intuitive platform
              </h2>
              <p className="font-nunito mb-12 lg:mb-16 2xl:mb-24 text-xl text-[#221638]">
                Get started with Blogify for free.
              </p>
              <a
                className="font-nunito font-bold inline-block px-10 py-4 text-white bg-[#FE4A55] hover:bg-[#221638] rounded transition duration-200"
                href="/"
              >
                Start Now
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-2 mt-10">
              <img className="w-9/12 ml-10" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;