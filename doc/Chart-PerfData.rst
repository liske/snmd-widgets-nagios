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
        The title of the chart (default: `Performance Data`).

    **axis** *(optional)*
        Formats the y *axis*.

    **topics**
        List of MQTT topics this chart uses.

    **graphs**
        List of one or two graphs to chart.
