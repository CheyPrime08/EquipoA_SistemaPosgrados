import React from 'react';
import { RevisionTable } from '@/modules/coordinador/revision/RevisionTable';

export default function RevisionPage({ search = "", statusFilter = "all" }) {
    // In a real scenario, filtering logic would go here
    return (
        <div className="h-full flex flex-col overflow-hidden pt-2">
            <RevisionTable searchQuery={search} statusFilter={statusFilter} />
        </div>
    );
}
