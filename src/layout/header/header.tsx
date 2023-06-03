'use client'

import { Fragment } from 'react'
import { useClerk } from '@clerk/nextjs'
import { ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

import FlyoutMenuItem from '@/layout/header/flyout-menu-item'
import MobileMenu from '@/layout/header/mobile-menu'
import { NAVIGATION } from '@/layout/header/navigation'
import { useStore } from '@/store/use-store'

const Header = () => {
  const { signOut } = useClerk()
  const toggle = useStore.useToggle()

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 flex gap-5 p-1.5">
            <Image className="h-6 w-full xl:h-8" src="/globant-logo.png" width={100} height={100} alt="Logo" />
            <Image className="h-6 w-full xl:h-8" src="/femsa-logo.png" width={100} height={100} alt="Logo" />
            <p className="text-2xl text-slate-800"></p>
          </Link>
        </div>

        <div className="flex xl:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => toggle(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:gap-x-12 xl:flex">
          {Array.from(NAVIGATION).map(([key, dataMenu]) => {
            const { name, href, hasDeepEl } = key
            const { items, cta } = dataMenu

            return (
              <Fragment key={uuidv4()}>
                {hasDeepEl ? (
                  <FlyoutMenuItem name={name} items={items} cta={cta} />
                ) : (
                  <Link
                    href={href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {name}
                  </Link>
                )}
              </Fragment>
            )
          })}
        </div>

        <div className="hidden xl:flex xl:flex-1 xl:justify-end">
          <Link
            href="#"
            className="flex items-center gap-3 text-sm font-semibold leading-6 text-gray-900"
            onClick={() => signOut()}
          >
            Logout
            <span aria-hidden="true">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </span>
          </Link>
        </div>
      </nav>

      <MobileMenu />
    </header>
  )
}

export default Header
