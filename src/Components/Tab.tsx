interface TabProps {
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabId: string;
}

const Tab: React.FC<TabProps> = ({ label, activeTab, setActiveTab, tabId }) => {
  return (
    <div
      className={`flex-1 text-center py-2 cursor-pointer ${
        activeTab === tabId ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
      }`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </div>
  );
};

export default Tab;
