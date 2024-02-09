import { fetchSuggestedUsers, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import SuggestedUserCard from "../cards/SuggestedUserCard";
import { redirect } from "next/navigation";
import { fetchSuggestedCommunities } from "@/lib/actions/community.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const suggestedUsers = await fetchSuggestedUsers(userInfo._id);
  const suggestedCommunities = await fetchSuggestedCommunities()
  
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div>
          <ul className="mt-5">
            {suggestedCommunities.length > 0 &&
              suggestedCommunities.map((item) => (
                <>
                  <SuggestedUserCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    threadsCount={item.threads.length}
                    accountType="Community"
                  />
                </>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div>
          <ul className="mt-5">
            {suggestedUsers.length > 0 &&
              suggestedUsers.map((user) => (
                <>
                  <SuggestedUserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    threadsCount={user.threads.length}
                    accountType="User"
                  />
                </>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
