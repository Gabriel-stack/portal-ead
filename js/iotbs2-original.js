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
function bodySwitcher(divid, label, isnative) {
    if (switcher.path != null && !switcher.isie && typeof isnative != 'undefined' && isnative == 'yes') {
        switcher.integrate(this, divid);
    }
    this.classes = [];
    if (document.getElementById(divid) == null) {
        return false;
    }
    var self = this;
    this.options = 0;
    var attrs = {'action': ''};
  /*  var frm = document.getElementById(divid).appendChild(switcher.create('form', attrs));

    var fieldset = frm.appendChild(switcher.create('fieldset'));
    attrs = {'for': 'select-' + divid};
    var labele = fieldset.appendChild(switcher.create('label', attrs));
    attrs = {'text': label};
    
    var span = labele.appendChild(switcher.create('span'));
    
    attrs = {'id': 'vital', 'text':label};
    var link = span.appendChild(switcher.create('a',attrs));
    */
    
    //attrs = {'id': 'select-' + divid};
    
    document.getElementById("autoContraste").onclick = function () {
        
        if (document.getElementsByTagName('body')[0].className.indexOf('highvisibility') > -1) {
             switcher.save('autoContraste', 'default', 0, self);
        } else {
             switcher.save('autoContraste', 'highvisibility', 1, self);
        }

    };
    return true;
}
;
bodySwitcher.prototype.defineClass = function (key, val) {
    this.classes[this.classes.length] = key;
    if (typeof this.select == 'undefined') {
        return false;
    }
    var attrs = {'value': key, 'text': val};
    this.select.appendChild(switcher.create('option', attrs));
    if (switcher.cookie != null) {
        if (switcher.cookie.indexOf(' ' + key + ' ') != -1) {
            this.select.selectedIndex = this.options;
        }
    }
    this.options++;
    return true;
};
bodySwitcher.prototype.update = function (ind) {
    if (typeof this.select != 'undefined') {
        this.select.selectedIndex = ind;
    }
};
