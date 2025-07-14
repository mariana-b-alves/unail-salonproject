/*RATHER THAN AN IMPORT, SCROLLMAGIC'S LINK WAS ADDED TO HTML TO ENSURE ALL JS' WORK EFFICIENTLY*/

export function scrollMagic() {
  /*CONST CONTROLLER - NEEDED TO ANIMATE SCROLLS ON SCROLLMAGIC*/
  const controller = new ScrollMagic.Controller();
  /*CONST INFOARTICLE - SELECTED ALL INFO SECTIONS SO THE NEXT article WILL GO OVER THE PREVIOUS ONE*/
  const infoArticle = document.querySelectorAll('.info-article');

  /*.forEach LOOPS THROUGH EACH ITERATION OF .info-article...*/
  infoArticle.forEach((article, i) => {
    /*...TO SET BEHAVIOUR (INSIDE THE LOOP) ON THE FINAL ARTICLE*/
    const isLast = 
        i === infoArticle.length - 1;
  /*CREATES SCROLL ANIMATIONS, TRIGGERED WHEN THE article REACHES THE TOP OF THE VIEWPORT*/
    new ScrollMagic.Scene({
      triggerElement: article,
      triggerHook: 0,
      duration: '100%',
    })
    /*SEE INFOARTICLE EXPLANATION*/
      .setPin(article, { pushFollowers: isLast })
      .addTo(controller);
  });
}
