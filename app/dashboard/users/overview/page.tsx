import UserOverview from "./UserOverviewPage";

export const metadata = {
  title: "Users Overview Dashboard - African Traditional Architecture",
  description: "Users Overview Dashboard Page",
};

function page() {
  return (
    <div>
      <UserOverview />
    </div>
  );
}

export default page;
