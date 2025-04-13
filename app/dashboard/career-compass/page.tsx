import { redirect } from "next/navigation"
import AuthSidebarWrapper from "@/components/sidebar/auth-sidebar-wrapper"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth } from "@/auth"
import { ModeToggle } from "@/components/dark-light-toggle/theme-toggle"
import { Metadata } from "next"
import CareerAnalysis from "@/components/career-compass/career-compass-ui"
import { generateId } from 'ai'


export const metadata: Metadata = {
  title: "Career Compass | Employment Opportunities",
  description: "Get personalized career guidance and insights",
}

export default async function Page() {
  const session = await auth()
  if (!session) {
    redirect("/")
  }
  const userId = session.user?.id
  const id = generateId()

  return (
    <SidebarProvider>
      <AuthSidebarWrapper />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Employment Opportunities</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/career-compass">Career Compass</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <CareerAnalysis id={id} userId={userId} />
      </SidebarInset>
    </SidebarProvider>
  )
}

