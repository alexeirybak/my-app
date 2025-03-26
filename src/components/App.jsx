import { BasicExample } from "./BasicExample";
import { FilterExample } from "./FilterExample";
import { SlowRenderExample } from "./SlowRenderExample";
import { TabExample } from "./TabExample";
import { SyncTabExample } from "./SyncTabExapmle";

const App = () => {
  return (
    <>
      {/* <BasicExample /> */}
      {/* <SlowRenderExample />*/}
      {/* <FilterExample /> */}
      <TabExample />
      <SyncTabExample />
    </>
  );
};

export default App;
