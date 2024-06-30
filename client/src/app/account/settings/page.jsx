import { Field, Label, Switch } from '@headlessui/react';
import React from 'react';

const Settings = () => {
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base md:text-3xl font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  First name
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  Last Name
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  Profile Picture
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={''}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  Username
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  Email address
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                tom.cook@example.com
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
            <div className="pt-6 sm:flex">
              <Field>
                <Label
                  as="dt"
                  className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                  Password
                </Label>
              </Field>
              <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                ***********
                <button
                  type="button"
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Settings;
