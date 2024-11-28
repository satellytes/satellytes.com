import { useEffect } from 'react';

const LeadinfoScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/plain');
    script.setAttribute('data-category', 'analytics');
    script.setAttribute('data-service', 'Leadinfo');

    script.innerHTML = `
      (function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
        l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;
        l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);}
        }(window,document,'script','https://cdn.leadinfo.eu/ping.js','leadinfo','LI-66D184CC97CFD'));
      `;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[data-service="Leadinfo"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export default LeadinfoScript;
