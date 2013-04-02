jTransitions
--
A small library to provide vertical and horizontal slide transitions

<pre>
&lt;ul id=&quot;container&quot;&gt;
    &lt;li&gt;Item1&lt;/li&gt;
    &lt;li&gt;Item2&lt;/li&gt;
    &lt;li&gt;Item3&lt;/li&gt;
&lt;/ul&gt;
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

Example:
--
    <http://jsfiddle.net/kodingsykosis/6ezLe/>
