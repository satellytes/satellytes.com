import { useEffect } from 'react';

interface LeadinfoScriptProps {
  enableCookies: boolean;
}

const LeadinfoScript: React.FC<LeadinfoScriptProps> = ({ enableCookies }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    if (enableCookies) {
      script.src = 'https://cdn.leadinfo.eu/ping.js';
    } else {
      script.innerHTML = `
        (function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
          l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;
          l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);}
          }(window,document,'script','https://cdn.leadinfo.eu/no-cookies.js','leadinfo','LI-66D184CC97CFD'));
      `;
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [enableCookies]);

  return null;
};

export default LeadinfoScript;
