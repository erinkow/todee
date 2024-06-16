import { 
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";

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
            {/* <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn> */}
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout;