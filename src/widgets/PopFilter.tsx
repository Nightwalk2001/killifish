import {Popover, Transition} from "@headlessui/react"
import React                 from "react"

type ButtonProps = {
  name: string
}

type Props = {
  name: string
  children: React.ReactNode
  className?: string
}

export const PopButton = ({name}: ButtonProps) =>
  <div
    className={"inline-flex justify-center items-center w-full rounded-lg " +
      "border border-grey-light px-4 py-1.5 bg-white text-sm leading-5" +
      " font-medium text-gray-darkest focus:outline-none"}>
    {name}
    <svg viewBox="0 0 20 20" className="-mr-1 ml-auto md:ml-2 h-5 w-5 fill-current">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      />
    </svg>
  </div>

export const PopFilter = ({name, children, className}: Props) =>
  <Popover className={"relative"}>
    <Popover.Button>
      <PopButton name={name}/>
    </Popover.Button>

    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1">
      <Popover.Panel className={`absolute left-1/2 -translate-x-1/2 z-10
      w-32 py-4 mt-1 bg-white rounded-lg
      border-gray-100 shadow-2xl shadow-purple-50 sm:pl-2 ${className}`}>
        {children}
      </Popover.Panel>
    </Transition>
  </Popover>