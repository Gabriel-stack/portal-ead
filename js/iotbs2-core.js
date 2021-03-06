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
var switcher;
function switchManager(canvas, path) {
    switcher = this;
    this.canvas = canvas == 'body' && typeof document.body != 'undefined' ? document.body : document.getElementsByTagName(canvas)[0];
    this.initial = this.canvas.className;
    if (this.initial == '') {
        this.initial = 'itobs';
    }
    this.path = (typeof path != 'undefined' && path != '' ? path : null);
    this.itoken = /(\:\[[0-9]+\])/;
    if (this.path != null) {
        this.tokenrefs = ['', -1];
        this.linkeles = document.getElementsByTagName('link');
    }
    this.master = null;
    this.string = '';
    this.idstring = '';
    this.isop = typeof window.opera != 'undefined';
    this.isie = typeof window.attachEvent != 'undefined' && !this.isop;
    this.iskde = navigator.vendor == 'KDE';
    this.cookie = this.read();
    if (this.cookie != null) {
        this.string = this.cookie;
        if (this.path == null) {
            this.canvas.className = this.initial + this.string;
        }
        for (var i = 0; i < this.idcookie.length; i++) {
            this.idstring += this.idcookie[i][0] + '=' + this.idcookie[i][1] + '&';
            if (this.path != null) {
                this.linkele = document.getElementById(this.idcookie[i][0] + '-stylesheet');
                if (this.linkele != null) {
                    if (this.tokenrefs[0] == this.idcookie[i][0]) {
                        this.alternates = [this.linkele];
                        var inscope = false;
                        var len = this.linkeles.length;
                        for (var j = 0; j < len; j++) {
                            if (this.linkeles[j] == this.alternates[0]) {
                                inscope = true;
                                var ind = j;
                            } else if (inscope && (this.linkeles[j].getAttribute('rel') == null || !/(alternat)(iv)?(e stylesheet)/i.test(this.linkeles[j].rel))) {
                                inscope = false;
                                this.linkeles[this.tokenrefs[1] + ind].disabled = false;
                                break;
                            }
                            if (inscope && this.linkeles[j].getAttribute('rel') != null && /(stylesheet)/i.test(this.linkeles[j].rel) && this.linkeles[j].getAttribute('title') != null && this.linkeles[j].title != '') {
                                this.linkeles[j].disabled = true;
                            }
                        }
                    } else {
                        this.linkele.href = this.path + this.idcookie[i][0] + '-' + this.idcookie[i][1] + '.css';
                    }
                }
            }
        }
    }
    if (typeof window.attachEvent != 'undefined') {
        window.attachEvent('onunload', function () {
            var closures = ['onchange', 'onclick', 'onkeydown', 'checker'];
            for (var i = 0; i < document.all.length; i++) {
                for (var j = 0; j < closures.length; j++) {
                    document.all[i][closures[j]] = null;
                }
            }
        });
    }
}
;
switchManager.prototype.set = function (days) {
    var thedate = new Date();
    thedate.setTime(thedate.getTime() + (days * 24 * 60 * 60 * 1000));
    var info = this.idstring;
    if (info == '') {
        thedate.setTime(0);
    }
    document.cookie = 'bodySwitcherKV=' + info + '; expires=' + thedate.toGMTString() + '; path=/';
};
switchManager.prototype.read = function () {
    this.cookie = null;
    if (document.cookie && document.cookie.indexOf('bodySwitcherKV=') != -1) {
        this.idcookie = [];
        this.cookie = document.cookie.split('bodySwitcherKV=')[1].split(';')[0].split('&');
        var tmp = '', len = this.cookie.length;
        for (var i = 0; i < len; i++) {
            this.cookie[i] = this.cookie[i].split('=');
            if (this.cookie[i].length > 1) {
                if (this.path != null && this.itoken.test(this.cookie[i][1])) {
                    this.tokenrefs = [this.cookie[i][0], parseInt(this.cookie[i][1].split(':[')[1], 10)];
                }
                this.cookie[i][1] = this.cookie[i][1].replace(this.itoken, '');
                tmp += ' ' + this.cookie[i][1] + ' ';
                this.idcookie[i] = this.cookie[i];
            }
        }
        this.cookie = tmp;
    }
    return this.cookie;
};
switchManager.prototype.save = function (ident, chosen, ind, obj) {
    this.ident = ident;
    this.idstring = this.idstring.replace(this.ident + '=', '');
    var len = obj.classes.length;
    for (var i = 0; i < len; i++) {
        this.string = this.string.replace(' ' + obj.classes[i] + ' ', '');
        var reg = new RegExp('(' + obj.classes[i] + ')' + '(\:\[[0-9]+\])?' + '&', '');
        this.idstring = this.idstring.replace(reg, '');
    }
    if (chosen != 'default') {
        this.string += ' ' + chosen + ' ';
        this.idstring += this.ident + '=' + chosen;
        if (this.master == obj) {
            this.idstring += ':[' + ind + ']';
        }
        this.idstring += '&';
    }
    if (this.path != null) {
        if (this.master != obj) {
            var linkele = document.getElementById(this.ident + '-stylesheet');
            if (linkele != null) {
                var sheetpath = this.path + this.ident + '-' + chosen + '.css';
                if (this.isop) {
                    setTimeout(function () {
                        linkele.href = sheetpath;
                    }, 10);
                }
                if (this.isie) {
                    var request = new ActiveXObject('Microsoft.XMLHTTP');
                    request.onreadystatechange = function () {
                        if (request.readyState == 4 && /(200|304)/.test(request.status.toString())) {
                            linkele.href = '';
                            linkele.href = sheetpath;
                        }
                    };
                    request.open('GET', sheetpath, true);
                    request.send(null);
                }
                linkele.href = sheetpath;
            }
        } else {
            len = this.alternates.length;
            for (i = 0; i < len; i++) {
                this.alternates[i].disabled = i != ind;
            }
        }
    } else {
        this.canvas.className = this.initial + this.string;
    }
    this.set(365);
};
switchManager.prototype.integrate = function (obj, divid) {
    this.master = obj;
    this.alternates = [document.getElementById(divid + '-stylesheet')];
    var inscope = false;
    var len = this.linkeles.length;
    for (var i = 0; i < len; i++) {
        if (i > 0 && this.linkeles[i - 1] == this.alternates[0]) {
            inscope = true;
        }
        if (inscope) {
            if (this.linkeles[i].getAttribute('title') != null && this.linkeles[i].getAttribute('rel') != null && /(alternat)(iv)?(e stylesheet)/i.test(this.linkeles[i].rel)) {
                this.alternates[this.alternates.length] = this.linkeles[i];
            } else {
                inscope = false;
                break;
            }
        }
    }
    var isenabled = 0;
    var watcher = window.setInterval(function () {
        var len = switcher.alternates.length;
        for (var i = 0; i < len; i++) {
            if (!switcher.alternates[i].disabled) {
                if (i != isenabled) {
                    isenabled = i;
                    obj.update(i);
                    switcher.save(divid, switcher.alternates[i].href.split(divid + '-')[1].split('.css')[0], i, obj);
                }
                break;
            }
        }
    }, 55);
};
switchManager.prototype.create = function (tag, attrs) {
    var ele = (typeof document.createElementNS != 'undefined') ? document.createElementNS('http://www.w3.org/1999/xhtml', tag) : document.createElement(tag);
    if (typeof attrs != 'undefined') {
        for (var i in attrs) {
            switch (i) {
                case 'text' :
                    ele.appendChild(document.createTextNode(attrs[i]));
                    break;
                case 'class' :
                    ele.className = attrs[i];
                    break;
                case 'for' :
                    ele.setAttribute('htmlFor', attrs[i]);
                    break;
                default :
                    ele.setAttribute(i, '');
                    ele[i] = attrs[i];
                    break;
                }
        }
    }
    return ele;
};
function domReady() {
    this.n = typeof this.n == 'undefined' ? 0 : this.n + 1;
    if (typeof document.getElementsByTagName != 'undefined' && (document.getElementsByTagName('body')[0] != null || document.body != null)) {
        if (!(typeof document.all != 'undefined' && typeof window.opera == 'undefined' && typeof document.mimeType == 'undefined' && typeof window.sidebar == 'undefined')) {
            iotbs();
        }
    } else if (this.n < 60) {
        setTimeout('domReady()', 250);
    }
}
;
domReady();