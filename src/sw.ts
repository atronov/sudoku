import {precacheAndRoute} from 'workbox-precaching';

declare global {
    interface Window {__WB_MANIFEST: string[]}
}

precacheAndRoute(
    self.__WB_MANIFEST || [],
{
    urlManipulation: ({url}) => {
        if (['/settings', '/records'].includes(url.pathname)) {
            const interceptingUrl = new URL(url.toString());
            interceptingUrl.pathname = '/index.html';
            return [interceptingUrl];
        }
        return [url];
    }
});
