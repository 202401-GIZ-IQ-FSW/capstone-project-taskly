import React from 'react';

const Newsletter = () => {
  return (
    <div class="my-24">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div class="px-6 py-6 md:px-12 lg:flex lg:items-center lg:px-16">
          <div class="lg:flex-1 xl:w-0">
            <h2 class="text-3xl font-extrabold text-gray-850 sm:text-3xl">
              Newsletter
            </h2>
            <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-400">
              Sign up for our email newsletter to stay up to date.
            </p>
          </div>
          <div class="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form class="sm:flex" id="revue-form" target="_blank">
              <input
                type="email"
                autocomplete="email"
                required=""
                class="w-full rounded-md border-custom-gray shadow-md px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                class="mt-3 flex w-full items-center justify-center border-custom-blue shadow-md rounded-md border border-transparent bg-custom-blue px-5 py-3 text-base font-medium text-white  hover:bg-custom-blue/80 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
