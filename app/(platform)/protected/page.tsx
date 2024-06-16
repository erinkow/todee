"use client";

import { UserButton, useAuth } from "@clerk/nextjs";

export default function ProtectedPage () {
    const { userId } = useAuth();

    return(
        <div>
            <UserButton/>
        </div>
    );
};