import { FaUtensils } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <FaUtensils size={35} />
        <h2>Chisom Restaurant</h2>
        <p>Experience the best of Nigerian cuisine</p>
      </div>

      <div className="sidebar-content">
        <p className="tagline">Delivering authentic flavors with a modern twist</p>
        <div className="restaurant-status">
          <span className="status-dot"></span>
          <span>Open Now</span>
        </div>
      </div>

      <div className="secure">
        <p>Secure Payments</p>
        <span>100% Secure & Encrypted</span>
        <div className="secure-divider"></div>
      </div>

    </aside>
  );
}

export default Sidebar;
