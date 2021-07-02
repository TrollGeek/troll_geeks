

function _(el) {
    return document.getElementById(el);
}

var isDrawerOpen = false;

function openDrawer() {
    if (!isDrawerOpen) {
        _("drawer").style.width = "250px";
        _("main").style.marginLeft = "0px";
        _("main").style.transition = "0.2s";
        _("opn").style.transition = "0.2s";
        _("cls").style.transition = "0.2s";
        isDrawerOpen = true;
    } else {
        _("drawer").style.width = "0";
        _("main").style.marginLeft = "0";
        _("opn").style.transition = "0.2s";
        _("cls").style.transition = "0.2s";
        isDrawerOpen = false;
    }
}