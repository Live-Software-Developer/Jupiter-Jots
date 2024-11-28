import { Button, IconButton } from '@chakra-ui/react';
import { LuChevronLeft, LuScreenShare } from 'react-icons/lu';
import { Tooltip } from '../ui/tooltip';
import { useNavigate } from 'react-router-dom';

const OpenExtensionFullScreen = () => {

    const openFullScreen = () => {
        chrome.tabs.create({
            url: chrome.runtime.getURL("index.html"),
        });
    }

    return (
        <>
            <Tooltip content={'Extended View'}>
                <IconButton onClick={openFullScreen} variant={'plain'} size={'sm'}>
                    <LuScreenShare />
                </IconButton>
            </Tooltip>
        </>
    )
}

export const GoHome = () => {
    const navigate = useNavigate()
    const handleGoHome = () => {
        const isInExtension = !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
        if(isInExtension){
            // chrome.tabs.create({
            //     url: chrome.runtime.getURL("index.html"),
            // });
            window.location.hash = "/";
        }
        else{
            navigate('/')
        }
    }
    return (
        <Button onClick={handleGoHome} borderRadius={'md'}>
            <LuChevronLeft />
            Go Home
        </Button>
    )
}

export default OpenExtensionFullScreen