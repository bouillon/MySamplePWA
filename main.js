(function () {
  'use strict';


  const Installer = function (root) {
    let promptEvent;
    const install = function (e) {
      if (promptEvent) {
        console.log("install");
        promptEvent.prompt();
        promptEvent.userChoice
          .then(function (choiceResult) {
            // The user actioned the prompt (good or bad).
            // good is handled in
            promptEvent = null;
            // ga('send', 'event', 'install', choiceResult);
            root.classList.remove('available');
          })
          .catch(function (installError) {
            // Boo. update the UI.
            promptEvent = null;
            //ga('send', 'event', 'install', 'errored');
            root.classList.remove('available');
          });
      }
    };

    const installed = function (e) {
      promptEvent = null;
      
      // This fires after onbeforinstallprompt OR after manual add to homescreen.
      // ga('send', 'event', 'install', 'installed');
      root.classList.remove('available');
      console.log("Remove available button because already installed");
    };

    const beforeinstallprompt = function (e) {
      promptEvent = e;
      promptEvent.preventDefault();
      // ga('send', 'event', 'install', 'available');
      root.classList.add('available');
      console.log("set css to available")
      return false;
    };

    window.addEventListener('beforeinstallprompt', beforeinstallprompt);
    window.addEventListener('appinstalled', installed);

    root.addEventListener('click', install.bind(this));
    root.addEventListener('touchend', install.bind(this));
    console.log("Init all clicks")
  };


  window.addEventListener('load', function () {
    const installEl = document.getElementById('installer');
    const installer = new Installer(installEl);
    console.log("installALL");

  });
})();