import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Plus } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./mobile-sidebar"
import { FormPopover } from "@/components/form/form-popover"

export const Navbar = () => {
    return(
        <nav className="flex fixed z-50 top-0 px-7 w-full h-14 border-b shadow-sm bg-neutral-50 items-center 2xl:px-52">
            <MobileSidebar />
            <div className="flex items-center gap-x-4 w-full mb-3">
                <div className="hidden md:flex">
                    <Logo/>
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2" variant='primary'>
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button size="sm" variant='primary' className="rounded-sm block h-auto py-1.5 px-2 mt-3.5 md:hidden">
                        <Plus className="h-5 w-5"/>
                    </Button>
                </FormPopover>
                <div className="ml-auto flex items-center gap-x-2 mt-2">
                    <OrganizationSwitcher
                        hidePersonal
                        afterCreateOrganizationUrl="/organization/:id"
                        afterLeaveOrganizationUrl="/select-org"
                        afterSelectOrganizationUrl="/organization/:id"
                        appearance={{
                            elements: {
                                rootBox: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                                avatarBox: {
                                    height: 35,
                                    width: 35   
                                }
                            }
                        }}
                    />
                    <UserButton
                        afterSignOutUrl="/sign-in"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 35,
                                    width: 35,
                                }
                            }
                        }}
                    />
                </div>

            </div>
        </nav>
    )
}