/*global ko, bootbox */

var ContactViewModel = function (data) {

    var self = this;
    self.ascending = "asc";
    self.descending = "desc";
    self.pageSize = ko.observable(5);
    self.pageIndex = ko.observable(0);
    self.showDialog = ko.observable(false);
    self.isUpdate = ko.observable("");
    self.rows = ko.observableArray([]);
    self.pageSizeOptions = [5, 10, 20, 30, 50, 100];

    self.Id = ko.observable("");
    self.LastName = ko.observable("").extend({ required: true, maxLength: 50 });
    self.FirstName = ko.observable("").extend({ required: true, maxLength: 50 });
    self.EmailAddress = ko.observable("");

    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null,
        errorClass: "text-danger"
    }, true);

    self.errors = ko.observable("");
    self.validationErrors = ko.validation.group(self);

    self.columns = ko.observableArray([
        { property: "LastName", header: "Last Name", state: ko.observable("") },
        { property: "FirstName", header: "First Name", state: ko.observable("") },
        { property: "EmailAddress", header: "Email Address", state: ko.observable("") }
    ]);

    self.context = new Datacontext();
    self.refresh = function () {
        self.context.getContacts(self.rows, self.errors);
    };

    self.new = function () {
        self.Id("");
        self.LastName("");
        self.FirstName("");
        self.EmailAddress("");
        self.isUpdate(false);

        self.clearErrors();
        self.showDialog(true);
    };

    self.edit = function (student) {
        self.Id(student.Id);
        self.LastName(student.LastName);
        self.FirstName(student.FirstName);
        self.EmailAddress(student.EmailAddress);
        self.isUpdate(true);

        self.clearErrors();
        self.showDialog(true);
    };

    self.cancel = function () {
        self.showDialog(false);
    };

    self.save = function () {
        if (self.validationErrors().length > 0) {
            self.validationErrors.showAllMessages();
            return;
        }

        var entity = {
            Id: self.Id(),
            LastName: self.LastName(),
            FirstName: self.FirstName(),
            EmailAddress: self.EmailAddress()
        };

        if (self.isUpdate()) {
            var array = self.rows();
            var index = self.arrayFirstIndexOf(array, function (item) {
                return item.Id === entity.Id;
            });

            array[index] = entity;
            self.rows.valueHasMutated();
            self.showDialog(false);
            self.context.saveUpdatedContact(entity, self.errors)
                .fail(function () {
                    self.refresh();
                });
        } else {
            self.showDialog(false);
            self.context.saveNewContact(entity, self.errors)
                .done(function (data) {
                    entity.Id = data.Id;
                    self.rows.push(entity);
                })
                .fail(function () {
                    self.refresh();
                });
        }
    };

    self.delete = function (row) {
        bootbox.confirm({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this record?",

            buttons: {
                cancel: {
                    label: "No",
                    className: "btn-default"
                },
                confirm: {
                    label: "Yes",
                    className: "btn-danger"
                }

            },
            callback: function (confirmed) {
                if (confirmed) {
                    self.rows.remove(row);
                    self.context.deleteContact(row, self.errors);
                }
            }
        });
    };

    self.arrayFirstIndexOf = function(array, predicate, predicateOwner) {
        for (var i = 0, j = array.length; i < j; i++) {
            if (predicate.call(predicateOwner, array[i])) {
                return i;
            }
        }
        return -1;
    };

    self.clearColumnState = function (selectedColumn) {
        var otherColumns = self.columns().filter(function (col) {
            return col !== selectedColumn;
        });

        for (var i = 0; i < otherColumns.length; i++) {
            otherColumns[i].state("");
        }
    };

    self.clearErrors = function () {
        if (self.validationErrors && self.validationErrors().length > 0) {
            self.validationErrors.showAllMessages(false);
        }
    };

    self.previousPage = function () {
        if (self.pageIndex() > 0) {
            self.pageIndex(self.pageIndex() - 1);
        }
    };

    self.nextPage = function () {
        if (self.pageIndex() < self.maxPageIndex()) {
            self.pageIndex(self.pageIndex() + 1);
        }
    };

    self.gotoPage = function (data) {
        self.pageIndex(data);
    };

    self.maxPageIndex = ko.computed(function () {
        return Math.ceil(self.rows().length / self.pageSize()) - 1;
    }, self);

    self.pagedList = ko.computed(function () {
        var size = self.pageSize();
        var start = self.pageIndex() * size;
        return self.rows().slice(start, start + size);
    }, self);

    self.pageSize.subscribe(function () {
        self.gotoPage(0);
    });

    self.sortClick = function (column) {
        self.clearColumnState(column);
        if (column.state() === "" || column.state() === self.descending) {
            column.state(self.ascending);
        } else {
            column.state(self.descending);
        }

        var rows = self.rows;
        var prop = column.property;
        if (column.state() === self.ascending) {
            rows.sort(function (left, right) {
                return left[prop] === right[prop] ? 0 : left[prop] < right[prop] ? -1 : 1;
            });
        } else {
            rows.sort(function (left, right) {
                return left[prop] === right[prop] ? 0 : left[prop] > right[prop] ? -1 : 1;
            });
        }
    };
    self.rows(data);
};



