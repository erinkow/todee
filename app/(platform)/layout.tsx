import { 
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    return (
        <ClerkProvider
            publishableKey={clerkPubKey}
            signInFallbackRedirectUrl="/select-org"
            signUpFallbackRedirectUrl="/sign-in"
        >
            <QueryProvider>
                <Toaster/>
                <ModalProvider/>
                {/* <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn> */}
                {children}
            </QueryProvider>
            
        </ClerkProvider>
    )
}

export default PlatformLayout;