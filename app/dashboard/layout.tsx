import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout variant="user">{children}</DashboardLayout>
}
