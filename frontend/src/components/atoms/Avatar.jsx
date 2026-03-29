import React from 'react';

export function Avatar({ size = 32, className = '' }) {
    return (
        <div
            className={`rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B] ${className}`}
            style={{ width: size, height: size }}
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
