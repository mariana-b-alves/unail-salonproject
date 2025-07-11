import { useEffect } from 'react';

export default function ScrollMagicSetup() {
    useEffect(() => {
        const init = () => {
          if (!window.ScrollMagic) {
            console.warn('ScrollMagic is not available.');
            return;
          }
      
          const controller = new window.ScrollMagic.Controller();
          const infoArticles = document.querySelectorAll('.info-article');
      
          infoArticles.forEach((article, i) => {
            const isLast = i === infoArticles.length - 1;
      
            new window.ScrollMagic.Scene({
              triggerElement: article,
              triggerHook: 0,
              duration: '100%',
            })
              .setPin(article, { pushFollowers: !isLast })
              .addTo(controller);
          });
        };
      
        if (document.readyState === 'complete') {
          init();
        } else {
          window.addEventListener('load', init);
          return () => window.removeEventListener('load', init);
        }
      }, []);
    }