// Footer.jsx
import React from 'react';

const Footer = () => {
return (
    <footer className="bg-[#EAF5FE] text-center py-4 w-full mt-auto border-0 fixed bottom-0 left-0">
        <div className="mx-auto max-w-screen-xl px-4">
            <p className="text-black font-semibold">
                made by GID team with 💙
                <a
                    href="/GIDTeam"
                    className="text-blue-600 hover:underline ml-2 font-hairline"
                >
                    See more
                </a>
            </p>
        </div>
    </footer>
);
};

export default Footer;
