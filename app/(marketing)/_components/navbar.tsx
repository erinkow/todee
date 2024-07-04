import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
    return(
        <nav className="flex items-center justify-around h-20">
            <div className="flex">
                <Logo/>
            </div>
            <div>
                <Button size="sm" className="mr-4 w-20 bg-neutral-700" asChild>
                    <Link href="/sign-up">
                        Sign up
                    </Link>
                </Button>
                <Button size="sm" className="w-20 bg-neutral-700" asChild>
                    <Link href='/sign-in'>
                        Sign in
                    </Link>
                </Button>
            </div>

        </nav>
    )
}