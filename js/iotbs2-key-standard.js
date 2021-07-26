/**
 * @package MU Contrast Mpdule for Joomla! 3.x
 * @version $Id: mod_mu_contrast.php 2015-02-18 samsuresh $
 * @author Sam Suresh http://www.mu.my
 * @copyright (C) 2015- 2015 MU DOT MY PLT- All rights reserved.
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
**/
// Original concept by Andy Clarke -- http://www.stuffandnonsense.co.uk/
// DOM scripting by brothercake -- http://www.brothercake.com/
// Create element and attributes based on a method by beetle -- http://www.peterbailey.net/
//************************************************
function iotbs() { //open initialisation function
//************************************************


//initialise the preferences manager ('canvas-element', 'path-for-load-mode')
var switcher = new switchManager('body', '');


/*****************************************************************************
 Define switching controls
*****************************************************************************/

//create a new switcher control ('container-id', 'label', 'is-native-switcher', '"selected" text')
var screenSwitcher = new bodySwitcher('screen-switcher', 'Contraste  ', 'no', '');

//add a new class option ('classname', 'label')
//screenSwitcher.defineClass('high', 'High contrast');
screenSwitcher.defineClass('default', 'Normal');
screenSwitcher.defineClass('highvisibility', 'Alto');



/*****************************************************************************
*****************************************************************************/
}; //close initialisation function
