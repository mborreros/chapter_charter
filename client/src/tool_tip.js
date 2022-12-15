import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

function FlagToolTip({ placement="auto" }) {

  // importing font awesome icons
  library.add(faFlagCheckered);

  const renderToolTip = (props) => (
    <Tooltip id="button-tooltip" className='text-gray-800' {...props}>
      This Collection is involved in a Challenge!
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderToolTip}>

      <FontAwesomeIcon icon="fa-solid fa-flag-checkered" />

    </OverlayTrigger>
  )

}

export default FlagToolTip;