var Datacontext = function () {

    // Private
    function contactUrl(id) { return "/api/contact/" + (id || ""); }

    function ajaxRequest(type, url, data, dataType) { // Ajax helper
        var options = {
            dataType: dataType || "json",
            contentType: "application/json",
            cache: false,
            type: type,
            data: data ? JSON.stringify(data) : null
        };
        return $.ajax(url, options);
    }

    // Public
    function getContacts(contactObservable, errorObservable) {
        return ajaxRequest("get", contactUrl())
            .done(function (result) {
                contactObservable(result);
            })
            .fail(function () {
                errorObservable("Error retrieving contact list.");
            });
    }

    function saveNewContact(contactObservable, errorObservable) {
        return ajaxRequest("post", contactUrl(), contactObservable)
            .done(function (result) {
                contactObservable.todoItemId = result.todoItemId;
            })
            .fail(function () {
                errorObservable("Error adding contact item.");
            });
    }

    function saveUpdatedContact(contactObservable, errorObservable) {
        return ajaxRequest("put", contactUrl(contactObservable.Id), contactObservable, "text")
            .fail(function () {
                errorObservable("Error updating contact item.");
            });
    }

    function deleteContact(contactObservable, errorObservable) {
        return ajaxRequest("delete", contactUrl(contactObservable.Id))
            .fail(function () {
                errorObservable("Error removing contact item.");
            });
    }

    return {
        getContacts: getContacts,
        saveNewContact: saveNewContact,
        saveUpdatedContact: saveUpdatedContact,
        deleteContact: deleteContact
    };
};