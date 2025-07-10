'use client';

import Dashboard from '@/components/dashboard/Dashboard';
import { withAuth } from '@/components/common/WithAuth';

function HomePage() {
    return <Dashboard />;
}

export default withAuth(HomePage);