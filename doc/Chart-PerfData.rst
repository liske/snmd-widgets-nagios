**************
Chart-PerfData
**************

This is generic a `Chart` widget to graph performance data.


Synopsis
========
::

    {
        "type": "Nagios:Chart-PerfData",
        "title": "Memory",
        "topics":[
           "nagios/checks/localhost/Memory"
        ],
        "graphs": [
            {
                "name": "Memory",
                "unit": "B",
                "keys": [ "mem_used" ]
            },
            {
                "name": "Swap",
                "unit": "B",
                "keys": [ "swap_used" ]
            }
        ]
    }


Parameters
==========

The following parameters are supported:


    **title** *(optional)*
        A *string* which will be used as the title of the chart (default: `Performance Data`).

    **axis** *(optional)*
        A *list* of *maps* which formats the y *axis*.

    **topics**
        *List* of MQTT topics this chart uses.

    **graphs**
        List of one or two graphs to chart. Each graph is a map with the following parameters:
        
            **name** *(optional)*
                A *string* used as the name of the graph.
                
            **unit** *(optional)*
                A *string* used as the base unit of measuring for printing graph values.
                
            **keys**
                A *map* or *list* of performance data keys. The performance data values of multiple keys will be
                added. If **keys** is a *map* the map values are handled as factors for each key. This allows
                normalizing the values to their base unit of measuring or substract different keys from
                each other etc.
