# lambda-sass

Implement functional programming (mostly [Clojure](https://clojure.org/)) in Sass. [Dart Sass](https://sass-lang.com/dart-sass) only.

## Features

### Anonymous function

Anonymous function is implemented in lisp [S-expression](https://en.wikipedia.org/wiki/S-expression), e.g. `(plus 1 2 3)` (the Sass list data type under the hood). You can use `_` for single parameter, or use `_1` `_2` and so on for multiple parameters.

Only [Iterator Functions](#iterator-functions) and [Threading Functions](#threading-functions) accept anonymous functions as arguments. Here are some examples:

```
reduce((plus _1 _2 _2), "#", ["a", "b", "c"]) // "#aabbcc"
thread-last(1, inc, (plus 10 5), dec, ("math.pow" 2)) // 65536
```

As you noticed in the above example, to use the [Sass build-in modules](https://sass-lang.com/documentation/modules), _you will need to quote the method name_, otherwise it will raise a syntax error, but no need to import the module with `@use "sass:math"` at the beginning of your file.

### Clojure threading macros

It's a huge joy to be able to use the Clojure threading-like features in Sass. If you are not familiar with threading macros, [check this](https://clojuredocs.org/clojure.core/-%3E).

### Arities

Most functions have two arities: `fn($list...)` and `fn([$list])`, for example, both `plus(1, 2, 3)` and `plus([1, 2, 3])` return `6`.

## Usage

[TODO]

## Functions

### Math Functions

#### plus

`plus($list...)` or `plus([$list])`

```scss
plus(1, 2, 3) // 6
plus("#", "a", "b", "c") // "#abc"

plus([1, 2, 3]) // 6
plus(["#", "a", "b", "c"]) // "#abc"
```

#### minus

`minus($number...)` or `minus([$number])`

```scss
minus(1, 2, 3) // -4
minus([1, 2, 3]) // -4
```

#### multiply

`multiply($number...)` or `multiply([$number])`

```scss
multiply(1, 2, 3) // 6
multiply([1, 2, 3]) // 6
```

#### divide

`divide($number...)` or `divide([$number])`

```scss
divide(1, 2, 3) // 0.16666666667
divide([1, 2, 3]) // 0.16666666667
```

#### rem

`rem($base, $div)`

```scss
rem(10, 3) // 1
rem(-10, 3) // 2
rem(10, -3) // -2
rem(-10, -3) // -1
```

#### quot

`quot($base, $div)`

```scss
quot(10, 3) // 3
quot(12, 3) // 4
quot(-5.9, 3) // -1
quot(10, -3) // -3
```

#### inc

`inc($number)`

```scss
inc(1) // 2
```

#### dec

`dec($number)`

```scss
dec(1) // 0
```

#### odd

`odd($number)`

```scss
odd(1) // true
odd(2) // false
```

#### even

`even($number)`

```scss
even(1) // false
even(2) // true
```

#### greater

`greater($number...)` or `greater([$number])`

```scss
greater(1, 2, 3, 4) // false
greater(4, 3, 2, 1) // true

greater([1, 2, 3, 4]) // false
greater([4, 3, 2, 1]) // true
```

#### greater-equal

`greater-equal($number...)` or `greater-equal([$number])`

```scss
greater-equal(1, 3, 3, 4) // false
greater-equal(4, 3, 3, 1) // true

greater-equal([1, 3, 3, 4]) // false
greater-equal([4, 3, 3, 1]) // true
```

#### less

`less($number...)` or `less([$number])`

```scss
less(1, 2, 3, 4) // true
less(4, 3, 2, 1) // false

less([1, 2, 3, 4]) // true
less([4, 3, 2, 1]) // false
```

#### less-equal

`less-equal($number...)` or `less-equal([$number])`

```scss
less-equal(1, 3, 3, 4) // true
less-equal(4, 3, 3, 1) // false

less-equal([1, 3, 3, 4]) // true
less-equal([4, 3, 3, 1]) // false
```

#### equal

`equal($list...)` or `equal([$list])`

```scss
equal(1, 1, 1) // true
equal(1, 2, 3) // false
equal("a", "a", "a") // true
equal("a", "b", "c") // false

equal([1, 1, 1]) // true
equal([1, 2, 3]) // false
equal(["a", "a", "a"]) // true
equal(["a", "b", "c"]) // false
```

#### not-equal

`not-equal($list...)` or `not-equal([$list])`

```scss
not-equal(1, 1, 1) // false
not-equal(1, 2, 3) // true
not-equal("a", "a", "a") // false
not-equal("a", "b", "c") // true

not-equal([1, 1, 1]) // false
not-equal([1, 2, 3]) // true
not-equal(["a", "a", "a"]) // false
not-equal(["a", "b", "c"]) // true
```

### List Functions

#### first

`first($list)` or `first($string)`

```scss
first([1, 2, 3]) // 1
first("#abc") // "#"
```

#### last

`last($list)` or `last($string)`

```scss
last([1, 2, 3]) // 3
last("#abc") // "c"
```

#### rest

`rest($list)` or `rest($string)`

```scss
rest([1, 2, 3]) // (2, 3)
rest("#abc") // ("a", "b", "c")
```

#### reverse

`reverse($list...)` or `reverse([$list])`

```scss
reverse(1, 2, 3, 4) // (4, 3, 2, 1)
reverse([1, 2, 3, 4]) // (4, 3, 2, 1)
```

#### range

`range($start-from? = 0, $end-to, $step? = 1)`

```scss
range(5) // (0 1 2 3 4)
range(-2, 5) // (-2 -1 0 1 2 3 4)
range(-2, 9, 3) // (-2 1 4 7)
```

#### repeat

`repeat($value, $times)`

```scss
repeat(1, 5) // (1 1 1 1 1)
repeat("a", 5) // ("a" "a" "a" "a" "a")
repeat(((1, 2), 5) // ((1, 2) (1, 2) (1, 2) (1, 2) (1, 2))
```

#### conj

`conj($list, $value)`

```scss
conj(null, 1)); // [1]
conj([1, 2], 3); // [1, 2, 3]
conj([1, 2], [3, 4]); // [1, 2, 3, 4]
conj((a: 1, b: 2), (c: 3)); // (a: 1, b: 2, c: 3)
```

### Iterator Functions

#### map

`map($function, $list...)` or `map($function, [$list])`

```scss
map(inc, 1, 2, 3) // (2, 3, 4)
map((plus _ 1), 1, 2, 3) // (2, 3, 4)

map(inc, [1, 2, 3]) // (2, 3, 4)
map((plus _ 1), [1, 2, 3]) // (2, 3, 4)
```

#### filter

`filter($function, $list...)` or `filter($function, [$list])`

```scss
filter(odd, [1 2 3]) // (1 3)
filter((greater _ 1), [1 2 3]) // (2 3)

filter(odd, 1, 2, 3) // (1 3)
filter((greater _ 1), 1, 2, 3) // (2 3)
```

#### reduce

`redure($function, $init-value, $list...)` or `reduce($function, $init-value, [$list])`

```scss
reduce((plus _1 _2), 0, 1, 2, 3) // 6
reduce((plus _1 _2 _2), "#", "a", "b", "c") // "#aabbcc"

reduce((plus _1 _2), 0, [1, 2, 3]) // 6
reduce((plus _1 _2 _2), "#", ["a", "b", "c"]) // "#aabbcc"
```

#### some

`some($function, $list...)` or `some($function, [$list])`

```scss
some(even, -1, 0, 12) // true
some(even, -1, 3, 11) // false

some(even, [-1, 0, 12]) // true
some(even, [-1, 3, 11]) // false
```

#### every

`every($function, $list...)` or `every($function, [$list])`

```scss
every(odd, -1, 3, 9) // true
every(odd, -1, 0, 9) // false

every(odd, [-1, 3, 9]) // true
every(odd, [-1, 0, 9]) // false
```

### Assoc Functions

#### assoc

`assoc($map, ($key, $value)...)`

```scss
assoc((a: 1, b: 2), a, 3, b, 4) // (a: 3, b: 4)
assoc([1 2 3], 2, (a b)) // [1 (a b) 3]
assoc([1 2 3], 2, a, 3, b, 4, c, 5, d) // [1 a b c d]
```

#### assoc-in

`assoc-in($map, [$key], $value)`

```scss
assoc-in((a: (b: (c: 1, d: 2))), [a b c], 2) // (a: (b: (c: 2, d: 2)))
assoc-in((1 (a (a b)) 3), [2 2 2], a) // (1 (a (a a)) 3)
```

### Threading Functions

#### thread-as

Same as the `as->` macro in Clojure.

`thread-as($init-value, $function...)`

```scss
thread-as(1, inc, (plus 10 _ 5), dec, ("math.pow" _ 2)) // 256
```

#### thread-first

Same as the `->` macro in Clojure.

`thread-first($init-value, $function...)`

```scss
thread-first(1, inc, (plus 10 5), dec, ("math.pow" 2)) // 256
```

#### thread-last

Same as the `->>` macro in Clojure.

`thread-last($init-value, $function...)`

```scss
thread-last(1, inc, (plus 10 5), dec, ("math.pow" 2)) // 65536
```
