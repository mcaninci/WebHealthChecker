import React, { useState, useEffect } from 'react';

import { instagram, linkedin, twitter, mail, person, plus, google, facebook, eye, eyeoff, identity ,verify} from './iconpaths'
import { SvgXml } from 'react-native-svg';



export const IconSvg = (props) => {

  const [iconPath, setIconPath] = useState("");
  const [multipathIcon, setmultipathIcon] = useState("");
  const [multiPath, setmultiPath] = useState(false);
  let xmlMulti = `
    <svg width="32" height="32" viewBox="0 0 32 32">
     ${multipathIcon}
        
       
      <defs>
        <linearGradient
          id="gradient"
          gradient-units="userSpaceOnUse">
          <stop offset="0" stop-color="#FFF" />
          <stop offset="1" stop-color="#FFF" />
        </linearGradient>
      </defs>
    </svg>
    `;
  let xml = `
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path

        fill="url(#gradient)"
        d="${iconPath}"
        
         />
      <defs>
        <linearGradient
          id="gradient"
          gradient-units="userSpaceOnUse">
          <stop offset="0" stop-color="#FFF" />
          <stop offset="1" stop-color="#FFF" />
        </linearGradient>
      </defs>
    </svg>
    `;
  useEffect(() => {
    if (props.name === 'instagram') {
      setIconPath(instagram);
    }
    else if (props.name === 'linkedin') {
      setIconPath(linkedin);
    }
    else if (props.name === 'twitter') {
      setIconPath(twitter);
    }
    else if (props.name === 'mail') {
      setIconPath(mail);
    }
    else if (props.name === 'person') {
      setIconPath(person);
    } else if (props.name === 'plus') {
      setIconPath(plus);
    }
    else if (props.name === 'google') {
      setIconPath(google);
    }
    else if (props.name === 'facebook') {
      setIconPath(facebook);
    }
    else if (props.name === 'eye') {
      setIconPath(eye);
    }
    else if (props.name === 'eyeoff') {
      var tmp = "";
      eyeoff.forEach(element => {
        tmp += `  <path

                fill="url(#gradient)"
                d="${element}"
                
                 />`
      });
      setmultiPath(true);
      setmultipathIcon(tmp);
      ;
    }
    else if (props.name === 'identity') {
      var tmp = "";
      identity.forEach(element => {
        tmp += `  <path

              fill="url(#gradient)"
              d="${element}"
              
               />`
      });
      setmultiPath(true);
      setmultipathIcon(tmp);
      ;
    }
    else if(props.name === 'verify'){
      setIconPath(verify);
    }

  }, [iconPath]);




  return (
 <SvgXml props={props} xml={multiPath == true ? xmlMulti : xml} /> 

  );
};

