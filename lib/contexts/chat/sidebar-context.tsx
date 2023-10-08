import { ReactNode, createContext, useContext } from "react";

interface SideItems {
  imageSrc: string;
  username: string;
  textPreview: string;
}

interface SideItemsContext {
  items: SideItems[];
}

const SidebarContext = createContext<SideItemsContext | null>(null);

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const sideItems: SideItems[] = Array.from({ length: 3 }).map((_, idx) => ({
    imageSrc: "/images/uploads/avatar.png",
    username: idx % 2 === 0 ? "Benjamin" : "George",
    textPreview: "Some random text message preview",
  }));
  return <SidebarContext.Provider value={{ items: sideItems }}>{children}</SidebarContext.Provider>;
};

export const useSideItems = (): SideItemsContext => {
  const context = useContext(SidebarContext);
  console.log("context", context);

  if (!context) throw new Error("useSideItems must be used under the SidebarProvider");
  return context;
};

export default SidebarProvider;
