"use strict";

/**
 * Created by ovidiu on 3/22/17.
 */

function UsersView() {

    var db = firebase.database();
    var presenter = new UsersPresenter(this);
    var addNew = undefined;
    var loading = undefined;
    var usersTable = undefined;

    $('#includedContent').load('resources/layout/UsersView.html', function () {
        debugger;
        addNew = $('#add-new-button');
        addNew.click(function () {
            debugger;
            new NewUserView();
        });
        loading = $('#loading-users');
        usersTable = $('#users-table');
        UsersView.prototype.requestShowUsers();
    });

    UsersView.prototype.requestShowUsers = function() {
        debugger;
        presenter.requestShowUsers(db);
    }

    UsersView.prototype.postShowUsers = function(users) {
        debugger;
        $.each(users, function (index, user) {
            debugger;
            var newRow = '<br>' +
                '<div class=\"row\" id=\"' + user.id + '\"> ' +
                '<div class=\"column\" id=\"name\">' + user.name + '</div> ' +
                '<div class=\"column\" id=\"age\">' + user.age + '</div> ' +
                '<div class=\"column\" id=\"sex\">' + user.sex + '</div> ' +
                '</div>';
            usersTable.append(newRow);
        });
        $('.row').click(function () {
            debugger;
            var parent = $(this);
            var user = {
                id: parent.attr('id'),
                name: parent.find('#name').html(),
                age: parent.find('#age').html(),
                sex: parent.find('#sex').html()
            }
            debugger;
            UsersView.prototype.requestEditUser(user);
        });
        loading.hide();
    }

    UsersView.prototype.requestEditUser = function(user) {
        debugger;
        new EditUserView(user);
    }
}