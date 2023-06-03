import { Fragment } from 'react'
import { Dialog } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

import { NAVIGATION } from '@/layout/header/navigation'
import { useStore } from '@/store/use-store'

import FlyoutMenuItem from './flyout-menu-item'

const MobileMenu = () => {
  const isOpen = useStore.useIsOpen()
  const toggle = useStore.useToggle()

  return (
    <Dialog as="div" className="xl:hidden" open={isOpen} onClose={() => toggle(false)}>
      <div className="fixed inset-0 z-10" />

      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Globant logo</span>
            <Image className="h-6 w-auto" src="/globant-logo.png" width={30} height={30} alt="Globant logo" />
          </Link>
          <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => toggle(false)}>
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
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
            <div className="py-6">
              <Link
                href="/sign-in"
                className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Logout
                <span aria-hidden="true">
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default MobileMenu
