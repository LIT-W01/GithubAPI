$(function () {
    var data;
    var starsAsc = false;
    var watchAsc = false;
    $("#search").on('click', function () {
        //$.post("/home/getboth", { username: $("#username").val() }, function (results) {
        //    data = results;
        //    fillResults(results);
        //});
        var parameters = { username: $("#username").val() };
        $.post("/home/getuser", parameters, function(user) {
            $.post("/home/getrepos", parameters, function (repos) {
                data = { User: user, Repos: repos };
                fillResults(data);
            });
        });
        //var counter = 0;
        //$.post("/home/getuser", { username: $("#username").val() }, function (user) {
        //    counter++;
        //    if (counter === 2) {
        //        //both are completed....
        //    }
        //    $("#userInfo").text(user.Name + " " + user.Location + " " + user.Followers);
        //});

        //$.post("/home/getrepos", { username: $("#username").val() }, function (repos) {
        //    counter++;
        //    if (counter === 2) {
        //        //both are completed...
        //    }
        //    $("table tr:gt(0)").remove();
        //    repos.forEach(function (repo) {
        //        $("table").append($("<tr><td>" + repo.Name + "</td><td>" + repo.Description + "</td><td>" + repo.Stars + "</td><td>" + repo.Watchers + "</td></tr>"));
        //    });
        //});

        

    });

    function fillResults(results) {
        $("#userInfo").text(results.User.Name + " " + results.User.Location + " " + results.User.Followers);
        $("table tr:gt(0)").remove();
        results.Repos.forEach(function (repo) {
            $("table").append($("<tr><td>" + repo.Name + "</td><td>" + repo.Description + "</td><td>" + repo.Stars + "</td><td>" + repo.Watchers + "</td></tr>"));
        });
    }

    $("#sortStars").on('click', function () {
        if (!data) {
            return;
        }

        data.Repos.sort(function (a, b) {
            return starsAsc ? a.Stars - b.Stars : b.Stars - a.Stars;
        });
        starsAsc = !starsAsc;
        fillResults(data);
    });

    $("#sortWatchers").on('click', function () {
        if (!data) {
            return;
        }

        data.Repos.sort(function (a, b) {
            return watchAsc ? a.Watchers - b.Watchers : b.Watchers - a.Watchers;
        });
        watchAsc = !watchAsc;
        fillResults(data);
    });

    //function addRow(repo) {

    //}
});