// Footer.jsx
import React from 'react';

const Footer = () => {
return (
    <footer className="bg-gray-700 text-center py-4 w-full mt-auto border-0">
        <div className="mx-auto max-w-screen-xl px-4">
            <p className="text-black font-semibold">
                made by GID team with 💙
            </p>
            <a
                href="/more"
                className="text-blue-600 hover:underline mt-1 block text-sm"
            >
                See more
            </a>
        </div>
    </footer>
);
};

export default Footer;
