import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../../public/fonts/font.woff2"
})

const textFont = Poppins({
    subsets: ['latin'],
    weight: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
    ]
})
const MarketingPage = () => {
    return(
        <div className="flex items-center justify-center flex-col mt-40">
            <div className={cn(
                "text-4xl mb-10",
                headingFont.className
            )}>
                Todee will combine your team up!
            </div>
            <div className={cn("mx-20 text-center text-lg items-center", textFont.className)}>
                collabolate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is unique - accomplish it all with Todee.
            </div>
            <Button size="lg" asChild className="mt-10 text-lg border-indigo-950">
                <Link href="/sign-up">
                    Get Todee for free
                </Link>
            </Button>
        </div>
    );
};

export default MarketingPage;