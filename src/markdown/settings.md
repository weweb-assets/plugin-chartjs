Depending on the Chart.js element you use, it expects certain parameters:

## Bar

To be displayed correctly, the bar chart needs two types of data. **Labels** and **datasets**

The **labels** must be defined in an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) like this:

```js
labels: ['Tatooine', 'Coruscant', 'Kashyyyk', 'Dagobah', 'Bespin', 'Endor', 'Hoth'];
```

The **datasets** are represented as [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), too, in an array:

```js
[
    {
        label: 'Millenium Falcon',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [100.0, 5.0, 2.0, 20.0, 30.0, 10.0, 45.0],
    },
    {
        label: 'TIE Fighter',
        backgroundColor: '#F7AB49',
        data: [26, 42, 35, 48, 52, 24, 75],
    },
];
```

> Make sure that the number of labels corresponds to the number of values in the data property of the dataset.

In the example above, we can see the minimum properties required for the dataset to be displayed correctly.

However, the bar chart has other properties that allow you to customize its display:

-   **backgroundColor** : `Color` (white, #FFFFFF, rgb(255, 255, 255))
-   **borderColor**: `Color`
-   **borderRadius**: `number` | `BorderRadius`
    -   `BorderRadius`:
        -   **bottomLeft**: `number`
        -   **bottomRight**: `number`
        -   **topLeft**: `number`
        -   **topRight**: `number`
-   **borderSkipped**: `false` | `"start"` | `"end"` | `"left"` | `"right"` | `"bottom"` | `"top"`
-   **borderWidth**: `number`
