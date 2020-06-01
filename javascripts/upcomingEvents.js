function listEvents(events)
{
    if(events.length == 0)
    {
        var element = document.getElementById("upcomingEvents");
        var noEvents = document.createElement("h3");
        noEvents.innerHTML = "There are currently no upcoming events";
        element.appendChild(noEvents);

    }
    for(var i = 0; i < 6 && i < events.length; i++) 
    {

        var cleanDate = new Date (events[i].Date).toISOString();
        var parts =cleanDate.split('-');
        var xDate = new Date (parts[0], parts[1] - 1, parts[2].slice(0,2)).toDateString()
        var parts2 = xDate.split(' ');

        function ordinal_suffix_of(i) {
            var j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + "st";
            }
            if (j == 2 && k != 12) {
                return i + "nd";
            }
            if (j == 3 && k != 13) {
                return i + "rd";
            }
            return i + "th";
        }



        function prettyDate(time){
            var date = new Date((time));
            var options = {hour: "numeric", minute: "numeric"};
            return new Intl.DateTimeFormat("en-US", options).format(date);
        }
        var startTime = prettyDate(cleanDate);

        var day = document.createElement("h3");
        var time = document.createElement("p");
        var title = document.createElement("p");
        var space = document.createElement("br");

        var daynode = document.createTextNode(parts2[0] + ", " + parts2[1] + " " + ordinal_suffix_of(parts2[2]));
        day.appendChild(daynode);  
        
        var timenode = document.createTextNode(startTime + " ");
        time.appendChild(timenode);

        title.innerHTML = '<a style="text-decoration: underline;" href="' + events[i].Link + '">' + events[i].Title +'</a>';


        var element = document.getElementById("upcomingEvents");
        element.appendChild(day);
        element.appendChild(time);
        element.appendChild(title);
        element.appendChild(space);
    }
}