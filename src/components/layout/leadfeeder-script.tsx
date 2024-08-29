import { useEffect } from 'react';

const LeadfeederScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(ss,ex){ 
        window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; 
        (function(d,s){ 
          var fs=d.getElementsByTagName(s)[0]; 
          function ce(src){ 
            var cs=d.createElement(s); 
            cs.src=src; 
            cs.async=1; 
            fs.parentNode.insertBefore(cs,fs); 
          }; 
          ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); 
        })(document,'script'); 
      })('ywVkO4XqrWdaZ6Bj');
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default LeadfeederScript;
