jTransitions
--
A small library to provide vertical and horizontal slide transitions

<pre>
      <ul id="container">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
      </ul>
</pre>

    $('#container').jTransitions({
        leftOffset: 0
    });

    $('#container').jTransitions('refresh');

    setInterval(function() {
        var el = $('#container');
        var active = el.jTransitions('active');

        if (active.is(':last-child')) {
            var first = el.children().first();
            el.jTransitions('active', first);
        } else {
            el.jTransitions('next');
        }
    }, 1500);

--Example:
    <http://jsfiddle.net/kodingsykosis/6ezLe/>
