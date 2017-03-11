﻿/*global ko */

ko.bindingHandlers.modal = {
    init: function(element, valueAccessor) {
        $(element).modal({
            show: false
        });

        var value = valueAccessor();
        if (ko.isObservable(value)) {
            $(element).on("hide.bs.modal", function(e) {
                if ($(e.target).is("input") === false) {
                    value(false);
                }
            });
        }
    },
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        if (ko.utils.unwrapObservable(value)) {
            $(element).modal("show");
        } else {
            $(element).modal("hide");
        }
    }
};