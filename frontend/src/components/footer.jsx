// Footer.jsx
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-[#EAF5FE] text-center py-4 w-screen border-0">
      {" "}
      {/* Changed w-full to w-screen */}
      <div className="mx-auto max-w-screen-xl px-4">
        <p className="text-black font-semibold">
          Made by GID team with 💙{" "}
          <a
            href="ourteam.html"
            className="text-blue-600 hover:underline font-medium"
          >
            See more
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
