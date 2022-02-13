

import React from 'react';
import { Icon } from '@ui-kitten/components';
import { IconSvg } from './iconsvg/iconsvg';



import { G, Path,SvgXml } from 'react-native-svg';
import Identitfy from  '../components/iconsvg/Identitfy.svg';

const deneme= {
  SortArrows: <G><Path d="M0 45h90L45 0 0 45z"/><Path d="M0 55h90l-45 45L0 55z"/></G>,
  Tick: {
      svg: <Path d="M38.729 75.688a4.48 4.48 0 0 1-3.21-1.356L16.558 55.004c-1.774-1.807-1.774-4.736-.001-6.543a4.48 4.48 0 0 1 6.42 0l15.753 16.056 37.749-38.474a4.478 4.478 0 0 1 6.419 0c1.773 1.806 1.773 4.736 0 6.543L41.939 74.332a4.48 4.48 0 0 1-3.21 1.356z"/>,
      viewBox: '0 0 32 32',
  },
  Verified: {
    svg: <Path d="M496.785,152.779c-3.305-25.085-16.549-51.934-38.826-74.205c-22.264-22.265-49.107-35.508-74.186-38.813 c-11.348-1.499-26.5-7.766-35.582-14.737C328.111,9.626,299.764,0,268.27,0s-59.841,9.626-79.921,25.024 c-9.082,6.965-24.235,13.238-35.582,14.737c-25.08,3.305-51.922,16.549-74.187,38.813c-22.277,22.271-35.521,49.119-38.825,74.205 c-1.493,11.347-7.766,26.494-14.731,35.57C9.621,208.422,0,236.776,0,268.27s9.621,59.847,25.024,79.921 c6.971,9.082,13.238,24.223,14.731,35.568c3.305,25.086,16.548,51.936,38.825,74.205c22.265,22.266,49.107,35.51,74.187,38.814 c11.347,1.498,26.5,7.771,35.582,14.736c20.073,15.398,48.421,25.025,79.921,25.025s59.841-9.627,79.921-25.025 c9.082-6.965,24.234-13.238,35.582-14.736c25.078-3.305,51.922-16.549,74.186-38.814c22.277-22.27,35.521-49.119,38.826-74.205 c1.492-11.346,7.766-26.492,14.73-35.568c15.404-20.074,25.025-48.422,25.025-79.921c0-31.494-9.621-59.848-25.025-79.921 C504.545,179.273,498.277,164.126,496.785,152.779z M439.256,180.43L246.477,373.209l-30.845,30.846 c-8.519,8.52-22.326,8.52-30.845,0l-30.845-30.846l-56.665-56.658c-8.519-8.52-8.519-22.326,0-30.846l30.845-30.844 c8.519-8.519,22.326-8.519,30.845,0l41.237,41.236L377.561,118.74c8.52-8.519,22.326-8.519,30.846,0l30.844,30.845 C447.775,158.104,447.775,171.917,439.256,180.43z"/> ,
  viewBox: '0 0 32 32',
},
}


import SvgIcon from 'react-native-svg-icon';


const Icondeneme = (props) => <SvgIcon {...props} svgs={deneme} />;



export const EyeIcon = (props) => (
  <IconSvg  name='eye' {...props} ></IconSvg>
  );
  export const EyeOffIcon = (props) => (
    <IconSvg  name='eyeoff' {...props} ></IconSvg>
    );

export const CameraIcon = (props) => (
<IconSvg  name='instagram' {...props} ></IconSvg>
);
export const FacebookIcon = (props) => (

  <IconSvg  name='facebook' {...props} ></IconSvg>
);
export const EmailIcon = (props) => (
<IconSvg  name='mail' {...props} ></IconSvg>
);
export const GoogleIcon = (props) => (

  <IconSvg  name='google' {...props} ></IconSvg>
);
export const Instagram = (props) => (
<IconSvg  name='instagram' {...props} ></IconSvg>
  )

export const Linkedin = (props) => (
<IconSvg  name='linkedin' {...props} ></IconSvg>

);
export const TwitterIcon = (props) => (

  <IconSvg  name='twitter' {...props} ></IconSvg>
);
export const IdentityIcon = (props) => (
<Identitfy fill='white' {...props}></Identitfy>
 
);

export const VerifiedIcon = (props) => (
  // <Icondeneme {...props}  name="Verified"  />
  // <SvgXml props={props} xml={verifiedSVG} />
{/* <SVGImg width={100} height={100} /> */}
);

export const PersonIcon = (props) => (

  <IconSvg  name='person' {...props} ></IconSvg>
);

export const PlusIcon = (props) => (
  <IconSvg  name='plus' {...props} ></IconSvg>
);

