# lambda-sass

Implement functional programming (clojure) in Sass. [Dart Sass](https://sass-lang.com/dart-sass) only.

This project is build for fun :)

## Functions

1. Most functions have two arities: `fn($list)` or `fn($list...)`.
2. Anonymous functions use polish notation (`(add 1 2 3)`) and allow `_` or `_1`, `_2` ... to represent the first, the second arguments and so on.

### Math Functions

#### `add`

```scss
add(1, 2, 3) // 6
add("#", "a", "b", "c") // "#abc"

add([1, 2, 3]) // 6
add(["#", "a", "b", "c"]) // "#abc"
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
map((add _ 1), 1, 2, 3) // (2, 3, 4)

map(inc, [1, 2, 3]) // (2, 3, 4)
map((add _ 1), [1, 2, 3]) // (2, 3, 4)
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
reduce((add _1 _2), 0, 1, 2, 3) // 6
reduce((add _1 _2 _2), "#", "a", "b", "c") // "#aabbcc"

reduce((add _1 _2), 0, [1, 2, 3]) // 6
reduce((add _1 _2 _2), "#", ["a", "b", "c"]) // "#aabbcc"
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
thread-as(1, inc, (add 10 _ 5), inc, dec) // 17
```

#### `thread-first`

Same as the `->` macro in Clojure.

```scss
thread-first(1, inc, (add 10 5), inc, dec) // 17
```

#### `thread-last`

Same as the `->>` macro in Clojure.

```scss
thread-last(1, inc, (add 10 5), inc, dec) // 17
```
