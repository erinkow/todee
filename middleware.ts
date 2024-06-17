import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

const isProtectedUserRoute = createRouteMatcher([ '/select-org' ])

const isProtectedOrgRoute = createRouteMatcher([ '/organization/:id' ])
export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn, orgId } = auth();
  

  //サインイン済み、組織選ページにアクセスしようとした場合
  if(userId && isProtectedOrgRoute(req)) {
    return NextResponse.next();
  }

  // 未サインイン、非パブリックページにアクセスしようとした場合
  if(!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  if(orgId && isPublicRoute(req)) {
    const orgUrl = new URL(`/organization/${orgId}`, req.url)
    return NextResponse.redirect(orgUrl);
  }

  if(userId && !orgId && isProtectedOrgRoute(req)) {
    const selectOrgUrl = new URL(`/select-org}`, req.url)
    return NextResponse.redirect(selectOrgUrl);
  }
  // さいん済み、組織選択まだ
  // if(userId && !sessionClaims?.metadata?.onboardingComplete) {
      // 非パブリックルート
  //   if(!isPublicRoute(req)) {
  //     const selectOrg = new URL('/select-org', req.url)
  //     return NextResponse.redirect(selectOrg);
  //   }
  // }

  // サインイン済み、組織選択済み
  if(userId && sessionClaims?.metadata?.onboardingComplete) {
    // パブリックルート、またはselect-orgページへアクセスしようとした場合
    if(isPublicRoute(req) || (isProtectedUserRoute(req))) {
      const orgUrl = new URL(`/organization/${orgId}`, req.url)
      return NextResponse.redirect(orgUrl);
    }
  }


});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};