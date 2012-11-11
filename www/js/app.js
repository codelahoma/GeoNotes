// The code below uses require.js, a module system for javscript:
// http://requirejs.org/docs/api.html#define


// Include the in-app payments API, and if it fails to load handle it
// gracefully.
// https://developer.mozilla.org/en/Apps/In-app_payments
require(['https://marketplace.cdn.mozilla.net/mozmarket.js'],
        function() {},
        function(err) {
            window.mozmarket = window.mozmarket || {};
            window.mozmarket.buy = function() {
                alert('The in-app purchasing is currently unavailable.');
            };
        });



// When you write javascript in separate files, list them as
// dependencies along with jquery
define("app", ['backbone', 'install', 'localstorage', 'Note'], function(Backbone, install, localstorage, Note) {
    var app = {},
        noteList = new Note.List();
/*
        noteList.add(new Note.Model({text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", position: {lat: 1, lng: 1}}));
        */
    var noteListView = new Note.ListView({collection: noteList});


    app.Router = Backbone.Router.extend({
        routes: {
            "add": "addNote",
            ".*": "viewNotes"
        },
        switchView: function(id) {
          console.log('switching...' , id);
          $('#pages .page').hide();
          $('#' + id).show();
        },
        viewNotes: function() {
          this.switchView('viewNotes');
          noteListView.render();
        },
        addNote: function() {
          this.switchView('addNote');
        }
    });

    // Hook up the installation button, feel free to customize how
    // this works
    function updateInstallButton() {
        $(function() {
            var btn = $('.install-btn');
            if(install.state == 'uninstalled') {
                btn.show();
            }
            else if(install.state == 'installed' || install.state == 'unsupported') {
                btn.hide();
            }
        });
    }

    $(function() {
        $('.install-btn').click(install);
    });

    install.on('change', updateInstallButton);

    install.on('error', function(e, err) {
        // Feel free to customize this
        $('.install-error').text(err.toString()).show();
    });

    install.on('showiOSInstall', function() {
        // Feel free to customize this
        var msg = $('.install-ios-msg');
        msg.show();
        
        setTimeout(function() {
            msg.hide();
        }, 8000);
    });

    console.log(app);
    return app;
});
