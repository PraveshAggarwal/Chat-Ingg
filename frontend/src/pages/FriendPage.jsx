import NoFriendsFound from "../components/NoFriendFound";
import FriendCard from "../components/FriendCard";
import { getUserFriends } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

const FriendPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {" "}
        {/* Adjusted spacing */}
        {/* This div is now set to always stack vertically and center its items */}
        <div className="flex flex-col items-center gap-15">
          {" "}
          {/* Corrected classes */}
          <h2 className="text-2xl sm:text-3xl text-center font-bold tracking-tight">
            My Friends
          </h2>
          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
              {" "}
              {/* Added w-full */}
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
