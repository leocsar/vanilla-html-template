let swRegistration;

window.isUpdateAvailable = new Promise ((resolve, reject) => {

  if('serviceWorker' in navigator) {

    navigator.serviceWorker.register('service-worker.js')
    .then((reg) => {
      swRegistration = reg;

      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        
        installingWorker.onstatechange = () => {
          switch ( installingWorker.state ) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                resolve(true);
              } else {
                // no update available
                resolve(false);
              }
              break;
          }
        };
      };

    })
    .catch(err => {
      console.debug('[SW ERROR]', err);
    });
  };
  
  window.addEventListener('online', () => console.debug('online'));
  window.addEventListener('offline', () => console.debug('offline'));
});