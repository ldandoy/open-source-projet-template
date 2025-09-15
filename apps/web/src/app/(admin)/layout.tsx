"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, ArrowLeft } from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("Admin Layout - Session object:", session);

    if (session) {
      console.log("Admin Layout - User object:", session.user);
      const userRole = (session.user as any).role;
      const isAdmin = (session.user as any).isAdmin;
      console.log("Admin Layout - Role:", userRole);
      console.log("Admin Layout - IsAdmin (legacy):", isAdmin);

      // Temporary fallback: if no role but isAdmin is true, allow access
      if ((!userRole || (userRole !== "admin" && userRole !== "superadmin")) && !isAdmin) {
        console.log("Admin Layout - Access denied, redirecting to home");
        router.push("/");
      } else {
        console.log("Admin Layout - Access granted");
      }
    }
  }, [session, router]);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (session === null) {
    return null; // Redirect happening in useEffect
  }

  const userRole = (session.user as any).role;
  const isAdmin = (session.user as any).isAdmin;

  // Temporary fallback: if no role but isAdmin is true, allow access
  if ((!userRole || (userRole !== "admin" && userRole !== "superadmin")) && !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 border-r bg-card">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold">Admin</h1>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center space-x-1">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to site</span>
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href} className="flex items-center space-x-3">
                      <IconComponent className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{session.user.email?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.user.name || session.user.email}
                </p>
                <div className="flex items-center space-x-1">
                  <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  {userRole && userRole !== "user" && (
                    <Badge variant="secondary" className="text-xs">
                      {userRole}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <main className="container py-6 mx-auto">{children}</main>
      </div>
    </div>
  );
}
