import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout variant="creator">{children}</DashboardLayout>
}
