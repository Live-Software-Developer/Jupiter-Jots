
import { Box, Button, Card, DialogTrigger, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import {
    LuSettings,
    LuBookmark,
    LuShieldCheck,
    LuBell,
    LuSave,
    LuPaintbrush,
    LuPlug,
    LuHelpCircle,
    LuExternalLink,
    LuShare2,
    LuChevronRight,
} from 'react-icons/lu'
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from '../ui/radio-card'
import { ReactNode, useState } from 'react'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { MdDeleteSweep } from 'react-icons/md'
import { RiCustomerService2Line } from 'react-icons/ri'
import { GrServices } from 'react-icons/gr'
import { Switch } from '../ui/switch'
import { ClipboardIconButton, ClipboardRoot } from '../ui/clipboard'
import { useTheme } from 'next-themes'
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from '../ui/dialog'
import { db, defaultSettings } from '../../db'
import { toaster } from '../ui/toaster'
import { useLiveQuery } from 'dexie-react-hooks'
import { NavLink } from 'react-router-dom'

const SETTINGS_GAP = 4

interface ISettingsCard {
    title: string
    description: string
    children: ReactNode
    TitleIcon: any
}
const SettingsCard = ({ title, description, children, TitleIcon }: ISettingsCard) => {

    return (
        <Card.Root w={'100%'} borderRadius={'xl'}>
            <Card.Header>
                <HStack>
                    <TitleIcon size={'22px'} />
                    <Heading as={'h3'}>{title}</Heading>
                </HStack>
                <Text>{description}</Text>
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card.Root>
    )
}

const items = [
    { value: "light", title: "Light", description: "Light Mode" },
    { value: "dark", title: "Dark", description: "Dark Mode" },
    { value: "system", title: "System", description: "System" },
]

const AppearanceSettings = () => {

    const { theme, setTheme } = useTheme()
    const toggleColorMode = (mode: string) => {
        setTheme(mode)
    }

    return (
        <SettingsCard TitleIcon={IoColorPaletteOutline} title='Appearance' description='Change how your interface looks like'>
            <RadioCardRoot defaultValue={theme} onValueChange={e => toggleColorMode(e.value)}>
                <RadioCardLabel>Select Theme</RadioCardLabel>
                <HStack align="stretch" wrap={'wrap'}>
                    {items.map((item) => (
                        <RadioCardItem
                            borderRadius={'xl'}
                            label={item.title}
                            key={item.value}
                            value={item.value}
                            cursor={"pointer"}
                        />
                    ))}
                </HStack>
            </RadioCardRoot>
        </SettingsCard>
    )
}

const NotificationElement = ({ label, _key, settings }: { label: string, _key: string, settings: any }) => {

    const updateSetting = async (newVal: boolean) => {
        let _update: Record<string, any> = {}
        _update[_key] = newVal

        if (settings) {
            await db.settings.update(settings.id, {
                ..._update
            }).then(() => {
                toaster.create({
                    description: `${label} Updated`,
                    type: "success"
                })
            })
        } else {
            const _defaultSettings: any = defaultSettings
            _defaultSettings[_key] = newVal
            await db.settings.add(_defaultSettings);
        }
    }

    return (
        <HStack w={'100%'} justifyContent={'space-between'}>
            <Text>{label}</Text>
            <Switch
                checked={settings ? settings[_key] : false}
                onCheckedChange={({ checked }) => updateSetting(checked)} />
        </HStack>
    )
}

const NotificationSettings = () => {

    const _settings = useLiveQuery(() => db.settings.filter(setting => setting.key.toLowerCase() === 'main').toArray())
    const settings = _settings && _settings?.length > 0 ? _settings[0] : null

    return (
        <SettingsCard TitleIcon={LuBell} title='Notifications/Alerts' description='Manage your notifications/alerts'>
            <VStack alignItems={'start'} gap={SETTINGS_GAP}>
                <NotificationElement label='New/Shared bookmark notifications' settings={settings} _key={'new_shared_notifications'} />
                {/* <NotificationElement label='Comments on bookmarks' /> */}
                <NotificationElement label='Maintanance notifications' settings={settings} _key={'maintenance_notifications'} />
                <NotificationElement label='Bookmark read reminder alerts' settings={settings} _key={'read_reminder_alerts'} />
            </VStack>
        </SettingsCard>
    )
}

const ExternalLink = ({ label, url }: { url: string, label: string }) => {

    return (
        <HStack justifyContent={'space-between'} p={0}>
            <Text>{label}</Text>
            <Link href={url} target='_blank'>
                {/* <IconButton p={0} size={'sm'} variant={'plain'}> */}
                <LuExternalLink size={'20px'} />
                {/* </IconButton> */}
            </Link>
        </HStack>
    )
}

const InternalLink = ({ label, url, closeDrawer }: { url: string, label: string, closeDrawer: () => void }) => {

    return (
        <HStack justifyContent={'space-between'} p={0}>
            <Text>{label}</Text>
            <NavLink to={url} onClick={closeDrawer}>
                {/* <IconButton p={0} size={'sm'} variant={'plain'}> */}
                <LuChevronRight size={'20px'} />
                {/* </IconButton> */}
            </NavLink>
        </HStack>
    )
}


const ClearBookmarks = () => {
    const [open, setOpen] = useState(false)

    const clearAllData = async () => {
        await db.bookmarks.clear()
        toaster.create({
            description: "Data cleared",
            type: "success"
        })
        setOpen(false)
    }

    return (
        <DialogRoot
            placement={'center'}
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={e => setOpen(e.open)}
        >
            <DialogTrigger asChild>
                <Button colorPalette={'red'} variant={'subtle'} borderRadius={"md"} size={'xs'}>
                    <MdDeleteSweep />
                    Bookmarks
                </Button>
            </DialogTrigger>
            <DialogContent borderRadius={'xl'}>
                <DialogHeader>
                    <DialogTitle>Clear Bookmarks</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Are you sure you want to clear all the bookmarks? This action is irreversible
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button colorPalette={'red'} borderRadius={'md'} onClick={clearAllData}>Clear</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}


const ClearTags = () => {
    const [open, setOpen] = useState(false)

    async function clearAllData(): Promise<void> {
        await db.transaction('rw', [db.tags, db.bookmarks], async () => {
            // Delete all tags
            await db.tags.clear();

            // Fetch all bookmarks
            const allBookmarks = await db.bookmarks.toArray();

            // Update bookmarks to set tags to an empty array
            await db.bookmarks.bulkPut(
                allBookmarks.map((bookmark) => ({
                    ...bookmark,
                    tags: [],
                }))
            );

            // Show success message
            toaster.create({
                description: "Tags cleared",
                type: "success"
            });
            setOpen(false)
        });
    }


    return (
        <DialogRoot
            placement={'center'}
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={e => setOpen(e.open)}
        >
            <DialogTrigger asChild>
                <Button colorPalette={'red'} variant={'subtle'} borderRadius={"md"} size={'xs'}>
                    <MdDeleteSweep />
                    Tags
                </Button>
            </DialogTrigger>
            <DialogContent borderRadius={'xl'}>
                <DialogHeader>
                    <DialogTitle>Clear Tags</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Are you sure you want to clear all the tags? This action is irreversible
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button colorPalette={'red'} borderRadius={'md'} onClick={clearAllData}>Clear</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}

const ClearCollections = () => {
    const [open, setOpen] = useState(false)

    async function clearAllData(): Promise<void> {
        await db.transaction('rw', [db.collections, db.bookmarks], async () => {
            // Delete all tags
            await db.collections.clear();

            // Fetch all bookmarks
            const allBookmarks = await db.bookmarks.toArray();

            // Update bookmarks to set tags to an empty array
            await db.bookmarks.bulkPut(
                allBookmarks.map((bookmark) => ({
                    ...bookmark,
                    collection: null,
                }))
            );

            // Show success message
            toaster.create({
                description: "Collections cleared",
                type: "success"
            });
            setOpen(false)
        });
    }


    return (
        <DialogRoot
            placement={'center'}
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={e => setOpen(e.open)}
        >
            <DialogTrigger asChild>
                <Button colorPalette={'red'} variant={'subtle'} borderRadius={"md"} size={'xs'}>
                    <MdDeleteSweep />
                    Collections
                </Button>
            </DialogTrigger>
            <DialogContent borderRadius={'xl'}>
                <DialogHeader>
                    <DialogTitle>Clear Collections</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Are you sure you want to clear all the collections? This action is irreversible
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button colorPalette={'red'} borderRadius={'md'} onClick={clearAllData}>Clear</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}

const PrivacyAndSecurity = ({ closeDrawer }: { closeDrawer: () => void }) => {

    return (
        <SettingsCard TitleIcon={LuShieldCheck} title='Privacy & Security' description='Data privacy and security'>
            <VStack alignItems={'start'} gap={SETTINGS_GAP}>
                <Box w='100%'>
                    <InternalLink label='Privacy Policy' url='/privacy-policy' closeDrawer={closeDrawer} />
                </Box>
                <Box w='100%'>
                    <InternalLink label='Terms & Conditions' url='/terms-and-conditions' closeDrawer={closeDrawer} />
                </Box>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text>Clear Bookmarks</Text>
                    <ClearBookmarks />
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text>Clear Collections</Text>
                    <ClearCollections />
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text>Clear Tags</Text>
                    <ClearTags />
                </HStack>
            </VStack>
        </SettingsCard>
    )
}

const HelpAndSupport = ({ closeDrawer }: { closeDrawer: () => void }) => {

    return (
        <SettingsCard TitleIcon={RiCustomerService2Line} title='Help & Support' description='Get in touch'>
            <VStack alignItems={'start'} gap={SETTINGS_GAP}>
                <Box w='100%'>
                    <InternalLink label='FAQs' url='/faqs' closeDrawer={closeDrawer} />
                </Box>
                <Box w='100%'>
                    <InternalLink label='Usage Guide' url='/guide' closeDrawer={closeDrawer} />
                </Box>
                <Box w='100%'>
                    <ExternalLink label='Email Us' url='mailto:support@livesoftwaredeveloper.com' />
                </Box>
                <Box w='100%'>
                    <ExternalLink label='Live Chat' url='https://tawk.to/livesoftwaredeveloper' />
                </Box>
            </VStack>
        </SettingsCard>
    )
}


const OtherServices = () => {

    return (
        <SettingsCard TitleIcon={GrServices} title='Other Services' description='Want more services?'>
            <VStack alignItems={'start'} gap={SETTINGS_GAP}>
                <Box w='100%'>
                    <ExternalLink label='Webhosting' url='https://hosting.livesoftwaredeveloper.com' />
                </Box>
                <Box w='100%'>
                    <ExternalLink label='Web Development' url='https://livesoftwaredeveloper.com' />
                </Box>
                <Box w='100%'>
                    <ExternalLink label='Blockchain Dapp Development' url='https://livesoftwaredeveloper.com' />
                </Box>
            </VStack>
        </SettingsCard>
    )
}


const Integrations = () => {

    const message = `🚀 Level Up Your Productivity!\nOrganize, save, and access your favorite links seamlessly with JupiterJots! 🌟\n🔖 Bookmark smarter, not harder.\n👉 Try it out now: https://livesoftwaredeveloper.com\n#Productivity #Bookmarks #ChromeExtension #WebTools`

    const url = "https://livesoftwaredeveloper.com"
    const hashtags = ["Productivity", "Bookmarks", "ChromeExtension", "WebTools"]

    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);
    const encodedHashtags = hashtags.map(encodeURIComponent).join(',');

    return (
        <SettingsCard TitleIcon={LuShare2} title='Share' description='Share the extension to your friends'>
            <VStack alignItems={'start'} gap={SETTINGS_GAP}>
                <Box w='100%'>
                    <ExternalLink label='Twitter' url={`https://x.com/intent/tweet?text=${encodedMessage}`} />
                </Box>
                <Box w='100%'>
                    <ExternalLink label='Facebook' url={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&description=${encodedMessage}`} />
                </Box>
                <HStack w={'100%'} justifyContent={'space-between'}>
                    <Text>Copy Message</Text>
                    <ClipboardRoot value={message}>
                        <ClipboardIconButton />
                    </ClipboardRoot>
                </HStack>
            </VStack>
        </SettingsCard>
    )
}

const SettingsList = ({ closeDrawer }: { closeDrawer: () => void }) => {
    const settings = [
        {
            title: 'General Settings',
            icon: LuSettings,
            items: ['Dark/Light Mode', 'Language Preferences', 'Sync Settings'],
        },
        {
            title: 'Bookmark Management',
            icon: LuBookmark,
            items: ['Sorting Options', 'Default Categories/Tags', 'Bookmark Visibility'],
        },
        {
            title: 'Privacy & Security',
            icon: LuShieldCheck,
            items: ['Privacy (Public/Private bookmarks)', 'Encryption Options', 'Clear Data'],
        },
        {
            title: 'Notifications',
            icon: LuBell,
            items: ['Reminder & Digest Settings', 'Alert Preferences'],
        },
        {
            title: 'Backup & Restore',
            icon: LuSave,
            items: ['Export/Import Bookmarks'],
        },
        {
            title: 'Appearance',
            icon: LuPaintbrush,
            items: ['Themes', 'Font Size', 'Custom Icons'],
        },
        {
            title: 'Integrations',
            icon: LuPlug,
            items: ['Browser Extension Settings', 'Social Media Sharing'],
        },
        {
            title: 'Help & Support',
            icon: LuHelpCircle,
            items: ['User Guide', 'Support Contact'],
        },
    ]

    return (
        <Box>
            <VStack alignItems={'start'}>
                {/* <SettingComponent /> */}
                <AppearanceSettings />
                <NotificationSettings />
                <PrivacyAndSecurity closeDrawer={closeDrawer} />
                <HelpAndSupport closeDrawer={closeDrawer} />
                <Integrations />
                <OtherServices />
            </VStack>
        </Box>
    )
}

export default SettingsList

