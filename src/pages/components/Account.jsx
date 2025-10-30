import { forwardRef, useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

const Account = forwardRef(({ onClose }, ref) => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-left" ref={ref} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50">
        <ul className="space-y-3">
            <li onClick={onClose} className="text-sm text-gray-500 hover:text-orange-500">Profile</li>
            <li onClick={onClose} className="text-sm text-gray-500 hover:text-orange-500">Orders</li>
            <li onClick={onClose} className="text-sm text-gray-500 hover:text-orange-500">Settings</li>
        </ul>
    </div>
  );
})

export default Account;