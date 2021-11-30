# How to add icons

## 1. Ensure we can resize the svg to any size
+ Remove any fixed `height` and `width` assignments
+ Make sure there is a `viewBox` assigned
+ Make sure the svg tag has `fill="none"` assigned. 

## 2. Ensure we can colorize the svg in any color
This will allow the svg to pick up the surrounding color. This also means you can't have more than one color.
+ Make sure any `stroke` color assignment is replaced with `stroke="currentColor"`
+ Make sure any `fill` color assignment is replaced with `fill="currentColor"`
