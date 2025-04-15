import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment_confirmed",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Wilson has been confirmed.",
      time: "10:30 AM",
      date: new Date(),
      read: false,
      icon: "check",
      iconColor: "green",
    },
    {
      id: 2,
      type: "appointment_confirmed",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Wilson has been confirmed.",
      time: "10:30 AM",
      date: new Date(),
      read: false,
      icon: "check",
      iconColor: "green",
    },
    {
      id: 3,
      type: "appointment_cancelled",
      title: "Appointment Cancelled",
      message:
        "The appointment with Dr. Michael Brown for tomorrow has been cancelled.",
      time: "4:45 PM",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: false,
      icon: "x",
      iconColor: "red",
    },
    {
      id: 4,
      type: "appointment_reminder",
      title: "Appointment Reminder",
      message:
        "Reminder: You have an appointment with Dr. Emily Davis tomorrow at 11:00 AM.",
      time: "2:20 PM",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: false,
      icon: "check",
      iconColor: "green",
    },
  ]);

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Function to clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Function to mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to delete a single notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Group notifications by date
  const todayNotifications = notifications.filter(
    (notification) =>
      new Date(notification.date).toDateString() === new Date().toDateString()
  );

  const thisWeekNotifications = notifications.filter(
    (notification) =>
      new Date(notification.date).toDateString() !==
        new Date().toDateString() &&
      new Date(notification.date) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  const earlierNotifications = notifications.filter(
    (notification) =>
      new Date(notification.date) <=
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="mr-4 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            <Logo />
          </div>

          <div className="flex justify-end items-center space-x-4">
            <div className="relative">
              <Link
                to="/doctor-notifications"
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </Link>
            </div>
            <Link
              to="/doctor-profile"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="mr-2 hidden sm:inline">Dr. Syed Shabab</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar - Hidden on mobile, shown when sidebarOpen is true */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:relative md:translate-x-0 z-20 w-64 bg-white border-r border-gray-200 h-full transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Notifications
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/notifications"
                  className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  All Notifications
                </Link>
              </li>
              <li className="md:hidden mt-4">
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Notification Content */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
              Notifications
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                onClick={markAllAsRead}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear all
              </button>
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Back
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">
                You don't have any notifications at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Today's Notifications */}
              {todayNotifications.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3">
                    Today
                  </h2>
                  <div className="space-y-3">
                    {todayNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                          notification.iconColor === "green"
                            ? "border-green-500"
                            : notification.iconColor === "red"
                            ? "border-red-500"
                            : "border-blue-500"
                        } ${notification.read ? "opacity-75" : ""}`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                notification.iconColor === "green"
                                  ? "bg-green-100 text-green-500"
                                  : notification.iconColor === "red"
                                  ? "bg-red-100 text-red-500"
                                  : "bg-blue-100 text-blue-500"
                              }`}
                            >
                              {notification.icon === "check" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 truncate">
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <div className="relative ml-2 flex-shrink-0">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            {/* Dropdown menu would go here */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* This Week's Notifications */}
              {thisWeekNotifications.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3">
                    This Week
                  </h2>
                  <div className="space-y-3">
                    {thisWeekNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                          notification.iconColor === "green"
                            ? "border-green-500"
                            : notification.iconColor === "red"
                            ? "border-red-500"
                            : "border-blue-500"
                        } ${notification.read ? "opacity-75" : ""}`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                notification.iconColor === "green"
                                  ? "bg-green-100 text-green-500"
                                  : notification.iconColor === "red"
                                  ? "bg-red-100 text-red-500"
                                  : "bg-blue-100 text-blue-500"
                              }`}
                            >
                              {notification.icon === "check" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 truncate">
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <div className="relative ml-2 flex-shrink-0">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            {/* Dropdown menu would go here */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earlier Notifications */}
              {earlierNotifications.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-3">
                    Earlier
                  </h2>
                  <div className="space-y-3">
                    {earlierNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                          notification.iconColor === "green"
                            ? "border-green-500"
                            : notification.iconColor === "red"
                            ? "border-red-500"
                            : "border-blue-500"
                        } ${notification.read ? "opacity-75" : ""}`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                notification.iconColor === "green"
                                  ? "bg-green-100 text-green-500"
                                  : notification.iconColor === "red"
                                  ? "bg-red-100 text-red-500"
                                  : "bg-blue-100 text-blue-500"
                              }`}
                            >
                              {notification.icon === "check" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 truncate">
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <div className="relative ml-2 flex-shrink-0">
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            {/* Dropdown menu would go here */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
