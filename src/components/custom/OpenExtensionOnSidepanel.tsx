import { IconButton } from "@chakra-ui/react"
import { LuLayout } from "react-icons/lu"

const OpenExtensionOnSidepanel = () => {

    // const openSidePanel = () => {
    //     try {
    //         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //             if (tabs.length === 0) {
    //                 console.log("No active tabs found.");
    //                 return;
    //             }

    //             const activeTab = tabs[0];
    //             chrome.sidePanel.setOptions({
    //                 // tabId: activeTab.id,
    //                 enabled: true,
    //                 path: 'index.html'
    //             })


    //         });
    //     } catch (e) {
    //         console.error("Error accessing tabs:", e);
    //     }
    // }

    const openSidePanel = async () => {
        // try {
        //     await chrome.sidePanel.setOptions({
        //         path: 'index.html', // The page to display in the side panel
        //         enabled: true,     // Enable the side panel for this extension
        //     }).then((res: any) => {
        //         console.info("Open")
        //     }).catch((err: any) => {
        //         console.error("Error: ", err)
        //     });
        //     console.log("Side panel options set!");
        // } catch (e) {
        //     console.error("Error setting side panel options:", e);
        // }
        // chrome.runtime.sendMessage({action: 'open_side_panel'});
        chrome.windows.getCurrent({ populate: true }, (window) => {
            (chrome as any).sidePanel.open({ windowId: window.id });
          });
    };

    return (
        <IconButton onClick={openSidePanel}>
            <LuLayout />
        </IconButton>
    )
}

export default OpenExtensionOnSidepanel