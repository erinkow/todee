import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"

export const Navbar = () => {
    return(
        <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-neutral-50">
            {/* TODO: Mobile Navbar */}
            <div className="flex items-center gap-x-4 ">
                <div>
                    <Logo/>
                </div>
                <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2 mt-3">
                    Create
                </Button>
                <Button size="sm" className="rounded-sm block h-auto py-1.5 px-2 mt-3.5 md:hidden">
                    <Plus className="h-4 w-4"/>
                </Button>
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
                                }
                            }
                        }}
                    />
                    <UserButton
                        afterSignOutUrl="/sign-in"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 30,
                                    width: 30,
                                }
                            }
                        }}
                    />
                </div>

            </div>
        </nav>
    )
}