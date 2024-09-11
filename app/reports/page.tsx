import { AppReportsPage } from '@/components/reports/ReportList'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const ReportsPage = () => {
    return (
        <div className='bg-white'>
            <Navbar />
            <AppReportsPage />
        </div>
    )
}

export default ReportsPage