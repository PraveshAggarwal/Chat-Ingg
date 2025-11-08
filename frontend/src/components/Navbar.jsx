import { useLocation, Link } from "react-router-dom";
import useAuthUser from "../hooks/useAuth";
import { BellIcon, LogOutIcon, MessagesSquare } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat/");

  const { logoutMutation } = useLogout();

  // 2. Fetch all notification data
  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    enabled: !!authUser,
    refetchInterval: 15000, // Keep re-fetching for new notifications
    refetchOnWindowFocus: true,
  });

  // 3. Calculate both counts
  const incomingCount = friendRequests?.incomingReqs?.length || 0;
  const acceptedCount = friendRequests?.acceptedReqs?.length || 0;

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <MessagesSquare className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary  tracking-wider">
                  ChatIng
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"} className="indicator">
              {incomingCount > 0 && (
                <span className="indicator-item badge badge-primary badge-sm">
                  {incomingCount}
                </span>
              )}

              {incomingCount === 0 && acceptedCount >= 0 && (
                <span className="indicator-item badge badge-error badge-xs"></span>
              )}

              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* THEME SELECTOR */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
