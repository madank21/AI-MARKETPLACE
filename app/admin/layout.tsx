import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout variant="admin">{children}</DashboardLayout>
}
