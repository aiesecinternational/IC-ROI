// Footer.jsx
import React from 'react';

const Footer = () => {
return (
    <footer className="bg-blue-50 text-center py-4">
        <p className="text-black font-semibold">
            made by GID team with 💙
        </p>
        <a
            href="/more"
            className="text-blue-600 hover:underline mt-1 block text-sm"
        >
            See more
        </a>
    </footer>
);
};

export default Footer;
