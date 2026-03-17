# Rules List

## Background 

### Background Color


``` text
[variant:]*[!]?bg-(color)-(shade)/(transparency)
```

## Effects

### Border radius

```text
[variant:]*[!]?(r|rt|rb|rl|rr|rtl|rtr|rbl|rbr)-(none|pill|circle|number|unit|fraction)
```

## Interactivity

### Cursor

```text
[variant:]*[!]?cur-(type)
```


## Layout 

### Aspect ratio

```text
[variant:]*[!]?ar-(square|video|cinema|auto)
[variant:]*[!]?ar-(numeric|fraction)
```

### Sizing

```text
[variant:]*[!]?(w|h|min-w|min-h|max-w|max-h)-(value|fraction|[arbitrary])
```

### Display

```text
[variant:]*[!]?d-(block|inline-block|inline|flex|inline-flex|grid|inline-grid|contents|list-item|none|hidden|table|flow-root)
```

## Spacing

### Margins


```text
[variant:]*[!]?[-?](m|mt|mb|ml|mr|mx|my|ms|me)-(number)(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)
```

### Padding

```text
[variant:]*[!]?(p|pt|pb|pl|pr|px|py|ps|pe)-(number)(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)
```


## Typography

### Font Weight

```text
[variant:]*[!]?fw-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|[1-9]00)
```

### Font Size

```text
[variant:]*[!]?fs-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)
[variant:]*[!]?fs-(\d*\.?\d+)
[variant:]*[!]?fs-(\d*\.?\d+)(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)
```

### Headings

```text
[variant:]*[!]?h(1|2|3|4|5|6)
```