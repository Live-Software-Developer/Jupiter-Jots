import { HStack, IconButton } from "@chakra-ui/react"
import { Button } from "./../ui/button"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./../ui/drawer"
import { LuSettings } from "react-icons/lu"
import SettingsList from "./SettingsComponent"
import { Tooltip } from "../ui/tooltip"
import { useState } from "react"

const Settings = () => {
    const [open, setOpen] = useState(false)
    return (
        <DrawerRoot size={'sm'} open={open} onOpenChange={e => setOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Tooltip content={'Settings'}>
                    <IconButton onClick={() => setOpen(true)} variant={'plain'} size={'md'}>
                        <LuSettings size={'20px'} />
                    </IconButton>
                </Tooltip>
            </DrawerTrigger>
            <DrawerContent portalled={true} offset={{ base: '3', md: '10' }} borderRadius={'xl'}>
                <DrawerHeader>
                    <DrawerTitle >
                        <HStack>
                            <LuSettings />
                            Settings
                        </HStack>
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody p={'2'}>
                    <SettingsList closeDrawer={() => setOpen(false)} />
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerActionTrigger>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default Settings