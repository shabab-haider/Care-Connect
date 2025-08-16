import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();
  const prevPathRef = useRef(null);

  useEffect(() => {
    const excluded = ["/book-service", "/booking-success"];

    if (prevPathRef.current && !excluded.includes(prevPathRef.current)) {
      localStorage.setItem("lastVisitedRoute", prevPathRef.current);
    }

    prevPathRef.current = location.pathname;
  }, [location]);

  return null;
};

export default RouteTracker;
