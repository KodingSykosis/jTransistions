jTransitions
--
A small library to provide vertical and horizontal slide transitions

**HTML**
<pre>
&lt;ul id=&quot;container&quot;&gt;
    &lt;li&gt;Item1&lt;/li&gt;
    &lt;li&gt;Item2&lt;/li&gt;
    &lt;li&gt;Item3&lt;/li&gt;
&lt;/ul&gt;
</pre>

**CSS**
<pre>
#container {
    width: 100px;
    height: 20px;
    list-style: none;
    padding: 0px;
    margin: 0px;
}
</pre>

**JavaScript**

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

**Demo**
<a href="http://jsfiddle.net/kodingsykosis/6ezLe/" target="_blank">http://jsfiddle.net/kodingsykosis/6ezLe/</a>
