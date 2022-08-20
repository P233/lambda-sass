# lambda-sass

Implement functional programming (clojure) in Sass. [Dart Sass](https://sass-lang.com/dart-sass) only.

This project is build for fun :)

## Functions

1. Most functions have two arities: `fn($list)` or `fn($list...)`.
2. Anonymous functions use polish notation (`(plus 1 2 3)`) and allow `_` or `_1`, `_2` ... to represent the first, the second arguments and so on.

### Math Functions

#### `plus`

```scss
plus(1, 2, 3) // 6
plus("#", "a", "b", "c") // "#abc"

plus([1, 2, 3]) // 6
plus(["#", "a", "b", "c"]) // "#abc"
```

#### `minus`

```scss
minus(1, 2, 3) // -4
minus([1, 2, 3]) // -4
```

#### `multiply`

```scss
multiply(1, 2, 3) // 6
multiply([1, 2, 3]) // 6
```

#### `divide`

```scss
divide(1, 2, 3) // 0.16666666667
divide([1, 2, 3]) // 0.16666666667
```

#### `inc`

```scss
inc(1) // 2
```

#### `dec`

```scss
dec(1) // 0
```

#### `odd`

```scss
odd(1) // true
odd(2) // false
```

#### `even`

```scss
even(1) // false
even(2) // true
```

#### `greater`

```scss
greater(1, 2, 3, 4) // false
greater(4, 3, 2, 1) // true

greater([1, 2, 3, 4]) // false
greater([4, 3, 2, 1]) // true
```

#### `greater-equal`

```scss
greater-equal(1, 3, 3, 4) // false
greater-equal(4, 3, 3, 1) // true

greater-equal([1, 3, 3, 4]) // false
greater-equal([4, 3, 3, 1]) // true
```

#### `less`

```scss
less(1, 2, 3, 4) // true
less(4, 3, 2, 1) // false

less([1, 2, 3, 4]) // true
less([4, 3, 2, 1]) // false
```

#### `less-equal`

```scss
less-equal(1, 3, 3, 4) // true
less-equal(4, 3, 3, 1) // false

less-equal([1, 3, 3, 4]) // true
less-equal([4, 3, 3, 1]) // false
```

#### `equal`

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

#### `not-equal`

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

#### `first`

```scss
first([1, 2, 3]) // 1
first("#abc") // "#"
```

#### `last`

```scss
last([1, 2, 3]) // 3
last("#abc") // "c"
```

#### `rest`

```scss
rest([1, 2, 3]) // (2, 3)
rest("#abc") // ("a", "b", "c")
```

#### `reverse`

```scss
reverse(1, 2, 3, 4) // (4, 3, 2, 1)
reverse([1, 2, 3, 4]) // (4, 3, 2, 1)
```

#### `range`

```scss
range(5) // (0 1 2 3 4)
range(-2, 5) // (-2 -1 0 1 2 3 4)
range(-2, 9, 3) // (-2 1 4 7)
```

#### `repeat`

```scss
repeat(1, 5) // (1 1 1 1 1)
repeat("a", 5) // ("a" "a" "a" "a" "a")
repeat(((1, 2), 5) // ((1, 2) (1, 2) (1, 2) (1, 2) (1, 2))
```

#### `conj`

```scss
conj(null, 1)); // [1]
conj([1, 2], 3); // [1, 2, 3]
conj([1, 2], [3, 4]); // [1, 2, 3, 4]
conj((a: 1, b: 2), (c: 3)); // (a: 1, b: 2, c: 3)
```

### Iterator Functions

#### `map`

```scss
map(inc, 1, 2, 3) // (2, 3, 4)
map((plus _ 1), 1, 2, 3) // (2, 3, 4)

map(inc, [1, 2, 3]) // (2, 3, 4)
map((plus _ 1), [1, 2, 3]) // (2, 3, 4)
```

#### `filter`

```scss
filter(odd, [1 2 3]) // (1 3)
filter((greater _ 1), [1 2 3]) // (2 3)

filter(odd, 1, 2, 3) // (1 3)
filter((greater _ 1), 1, 2, 3) // (2 3)
```

#### `reduce`

`reduce($fn, $init, $list)` or `redure($fn, $init, $list...)`

```scss
reduce((plus _1 _2), 0, 1, 2, 3) // 6
reduce((plus _1 _2 _2), "#", "a", "b", "c") // "#aabbcc"

reduce((plus _1 _2), 0, [1, 2, 3]) // 6
reduce((plus _1 _2 _2), "#", ["a", "b", "c"]) // "#aabbcc"
```

#### `some`

```scss
some(even, -1, 0, 12) // true
some(even, -1, 3, 11) // false

some(even, [-1, 0, 12]) // true
some(even, [-1, 3, 11]) // false
```

#### `every`

```scss
every(odd, -1, 3, 9) // true
every(odd, -1, 0, 9) // false

every(odd, [-1, 3, 9]) // true
every(odd, [-1, 0, 9]) // false
```

### Thread Functions

#### `thread-as`

Same as the `as->` macro in Clojure.

```scss
thread-as(1, inc, (plus 10 _ 5), inc, dec) // 17
```

#### `thread-first`

Same as the `->` macro in Clojure.

```scss
thread-first(1, inc, (plus 10 5), inc, dec) // 17
```

#### `thread-last`

Same as the `->>` macro in Clojure.

```scss
thread-last(1, inc, (plus 10 5), inc, dec) // 17
```
