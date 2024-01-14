import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import * as React from "react";

export default function DynamicTabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}
