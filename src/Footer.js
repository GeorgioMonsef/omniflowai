// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="w-full bg-gray-800 p-4 text-center text-white mt-auto relative z-10">
            <p>&copy; {new Date().getFullYear()} OmniFlowAI. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
