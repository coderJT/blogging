"use client";

import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('./Editor'), {
    ssr: false,
    loading: () => (
        <div className="min-h-[400px] w-full border rounded-md bg-muted/10 animate-pulse" />
    )
});

export default DynamicEditor; 