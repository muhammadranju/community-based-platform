import { DatabasePage } from "./DatabasePage";
import { DashboardWaitingList } from "./WaitingListPage";

export const metadata = {
  title: "Waiting List Dashboard - African Traditional Architecture",
  description: "Waiting List Dashboard Page",
};
function page() {
  return (
    <>
      <DatabasePage />
    </>
  );
}

export default page;
