import React from 'react';

export default function MainLayout(children) {

    return (
        <div className="w-full bg-gray-100">
            <div className="max-w-screen-2xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 ">
                {children}
            </div>
        </div>
    )
}