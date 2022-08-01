import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Layout} from '../components/layout';
import {createStore, loadState} from '../state/store';

loadState().then(state => {
    const store = createStore(state ?? undefined);
    // respawn timer here
    ReactDOM.render(
        <Provider store={store}>
            <Layout />
        </Provider>,
        document.getElementById('content'));
});

window.addEventListener('beforeinstallprompt', (e) => {
    // make this code alive to make pwa installation possible
    // Prevent the mini-infobar from appearing on mobile
    // e.preventDefault();
    // // Stash the event so it can be triggered later.
    // deferredPrompt = e;
    // // Update UI notify the user they can install the PWA
    // showInstallPromotion();
    // then in install click button
    // Show the install prompt
    // deferredPrompt.prompt();
    // // Wait for the user to respond to the prompt
    // deferredPrompt.userChoice.then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //         console.log('User accepted the install prompt');
    //     } else {
    //         console.log('User dismissed the install prompt');
    //     }
    // })
});



