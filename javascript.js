//Function Challenge 1
function add(first, second) {
    return first + second;
};

function sub(first, second) {
    return first - second;
};

function mul(first, second) {
    return first * second;
};

function identityf(x) {
    return function () {
        return x;
    };
};

var three = identityf(3);
three()

function addf(first) {
        return function (second) {
            return x + y;
        };
};

addf(3) (4)
//

function liftf(binary) {
    return function (first) {
        return function (second) {
            return binary(first, second);
        }
    }
};

var addf = liftf(add);
addf(3)(4)
//
// Function Challenge 2
function curry(binary, first) {
        return function (second) {
            return binary(first, second);
        };
};

var add3 = curry(add, 3);
add3(4)
var mul5 = curry(mul, 5);
mul5(6)
//

inc = addf(1);
inc = liftf(add)(1);
inc = curry (add, 1);
//

// Function Challenge 3
function twice(binary) {
    return function(a) {
        return binary(a, a);
    };
};

var doubl = twice(add);
doubl(11)
var square = twice(mul);
square(11)
//

function reverse(binary) {
    return function bus(first, second) {
        return binary (second, first);
    };
};

var bus = reverse(sub);
bus(3, 2)
//

function composeu(f, g) {
    return function (a) {
       return g(f(a));
    };
};

composeu(doubl, square)(5)
//

function composeb(binary1, binary2) {
    return function (a, b, c) {
        return binary2(binary1(a, b), c);
    };
};

composeb(add, sub) (2, 3, 7)
//

function limit(binary, count) {
    return function (a,b) {
        if (count >= 1) {
            count -= 1;
            return binary(a,b);
        }
        return undefined;
    };
};

var add_ltd = limit(add, 1);
add_ltd(3, 4)
add_ltd(3, 5)
//

//Function Challenge 4
function from(start) {
    return function () {
        var next = start;
        start += 1;
        return next;
    };
};

var index =  from(0);

index()
index()
index()
//

function to(gen, end) {
    return function () {
        var value = gen ();
        if (value < end) {
            return value;
        }
            return undefined;
    }    
};

var index = to(from(1), 3);
index()
index()
index()
//

function fromTo(start, end) {
   return to(
       from(start),
       end
   ); 
};

var index = fromTo(0, 3);
index()
index()
index()

/* MOJA WERSJA 5 MINUTA 20 SEKUND Function Challange 4
function element(myArray, gen) {
    return function(start, end) {
        var index = gen(); // Get the next index from a generater
        for (var i = 0; i < myArray.length; i+= 1) {
            return (myArray[index]);
        };
    };
};

var ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));

ele()
ele()
ele()
*/

// WERSJA TYPA
function element(array, gen) {
    return function () {
        var index = gen();  // Get the next index from a generator
        if (index !== undefined) {
            return array[index];
        };
    };
};

var ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));

ele()
ele()
ele()
//

function element(array, gen) {
    if (gen === undefined) { // when there is no generator
        gen = fromTo(
            0,
            array.length
        );
    };
    return function () {
        var index = gen();  // Get the next index from a generator
        if (index !== undefined) {
            return array[index];
        };
    };
};

var ele = element(['a', 'b', 'c', 'd'])

ele()
ele()
ele()
//

// Function Challenge 5 5h 37 min
function collect(gen, array) {
    return function () {
        var value = gen();
        if (value !== undefined) {
            array.push(value);
        };
        return value;
    };
};

var array = [];
col = collect(fromTo(0, 2), array);

col()
col()
col()
array
//

// will do a function calling loop until gets value accepted by preducate
function filter (gen, predicate) {
    return function () {
        var value;
        do {
            value = gen();
        } while (
            value !==undefined &&
            !predicate(value)
        );
        return value;
    };

};

var fil = filter(fromTo(0, 5),
    function third(value) {
        return (value % 3) === 0;
    });

fil()
fil()
fil()
//

function concat(gen1, gen2) {
    var gen = gen1; // variable which remember what current generator function is
    return function () { // return function which takse value from current generator if its undefined it returns it
        var value = gen();
        if (value !== undefined) {
            return value;
        }
        gen = gen2; // otherwise it replace current generator with next generator
        return gen();  // and returns value from that
    };
};

var con = concat(fromTo(0, 3), fromTo(0, 2));
con()
con()
con()
con()
con()
con()
//

// Function Challenge 6 5h 47

function gensymf(prefix) {
    var number = 0;
    return function () {
        number += 1;
        return prefix + number;
    };
};

var geng = gensymf("G"),
    genh = gensymf("H");

geng() // "G1"
geng() // "H1"
geng() // "G2"
geng() // "G2"
//

// mozna uzyc switch zeby ogarnac dwa pierwsze znaki a pozniej je dodawac
// albo sposobu ponizej
function fibonaccif (a, b) {
    return function () {
        var next = a;
        a = b;
        b += next;
        return next;
    };
};

var fib = fibonaccif(0, 1);
fib()
fib()
fib()
fib()
fib()

// Function Challenge 7 5h 57 OBJECTS etc
function counter(value) {
    return { // function return objects with up and down functions
        up: function  () {
            value += 1;
            return value;
        },
        down: function () {
            value -= 1;
            return value;
        }
    };
};

var object = counter(10),
    up = object.up,
    down = object.down;

up()
down()
down()
up()
//

function revocable(binary) {
    return {
        invoke: function (first, second) {
            if (binary !== undefined) {
                return binary(
                    first,
                    second
                );
            };
        },
        revoke : function () {
            binary = undefined;
        }
    };
};

var rev = revocable(add),
    add_rev = rev.invoke;
add_rev(3, 4); //7
rev.revoke();
add_rev(5, 7) //undefined
//


// Function Challenge 8 6h 05 OBJECTS etc

function m (value, source) {
    return {
        value: value,
        source: (typeof source === 'string')
            ? source
            : String(value)
    };
}

JSON.stringify(m(1)) // pokazuje co jest w obiekcie bo .toString ssie 
// {"value" : 1, "source": "1"}
JSON.stringify(m(Math.PI, "pi"))
// {"value" : 3.14159..., "source": "pi"}
//

function addm(a, b) {
    return m(
        a.value + b.value,
        "(" + a.source + "+" + b.source + ")"
    );
};

JSON.stringify(addm(m(3), m(4)))
// {"value" : 7, "source": "(3+4)"}
JSON.stringify(addm(m(1), m(Math.PI, "pi")))
// {"value" : 4.14159, "source": "(1+pi)"}
//

function liftm (binary, op) {
    return function (a, b) {
        return m(
            binary(a.value, b.value),
            "(" + a.source + op 
                + b.source + ")"
        );
    };
};

var addm = liftm(add, "+");
JSON.stringify(addm(m(3), m(4)));
// {"value" : 7, "source": "(3+4)"}
JSON.stringify(liftm(mul, "*")(m(3), m(4)));
// {"value" : 12, "source": "(3*4)"}
//

function liftm(binary, op) { // modyfied liftm
    return function (a, b) {
        if(typeof a === 'number') {
            a = m(a);
        }
        if (typeof b === 'number') {
            b = m(b);
        }
        return m(
            binary(a.value, b.value),
            "(" + a.source + op
            + b.source + ")"
        );
    };
};

var addm = liftm(add, "+");
JSON.stringify(addm(3, 4));
// {"value" : 7, "source": "(3+4)"}
//

// Function Challenge 9 6h 13min ARRAY expresions etc.

// EXP function takes value returns something if 
// value is array it returns result of calling  the first element
// passing next two elements as arguments otherwise returns the value
function exp(value) { 
    return (Array.isArray(value))
        ? value[0] (
            value[1],
            value[2]
        )
        : value;
};

var sae =[mul, 5, 11];
exp(sae) //55
exp(42) //42
//

// nested array expression modyfied exp
function exp(value) {
    return (Array.isArray(value))
        ? value[0](
            exp(value[1]),
            exp(value[2])
        )
        : value;
};
// recursion: a function calls itself great with nested data structures

// This code is writen in language called LISP
var nae = [
    Math.sqrt,
    [
        add,
        [square, 3],
        [square, 4]
    ]
];
exp(nae) // 5
//

// Function Challenge 10 6h 18min ARRAY expresions etc.

function addg(first) {
    function more(next) {
        if (next === undefined) {
            return first;
        };
        first += next;
        return more;
    };
    if (first !== undefined) {
        return more;
    };
};
// "retursion" : a function returns itself

addg() // undefined
addg(2)() // 2
addg(2)(7)() // 9
addg(4)(0)(4)() // 7
//

function liftg(binary) {
    return function (first) {
        if (first === undefined) {
            return first;
        }
        return function more(next){
            if (next === undefined) {
                return first;
            }
            first = binary(first, next);
            return more;
        };
    };
};

// returns the function
// that function gets the first argument
// if first is undefined it returns ffirst
// otherwise it returns the more function
// the more function gets the next argument if next is undefined it returns first
// otherwise it sets first to the result of the binary function with first and next
// and returns itself

liftg(mul)() // undefined
liftg(mul)(3)() // 3
liftg(mul)(3)(0)(4)() // 0
liftg(mul)(1)(2)(4)(8)() // 64
//

// build an array from many invocations
function arrayg(first) {
    var array = [];
    function more(next) {
        if (next === undefined) {
            return array;
        };
        array.push(next);
        return more;
    };
    return more(first);
};

arrayg() //[]
arrayg(3)() // [3]
//

function continuize(unary) {
    return function (callback, arg) {
        return callback(unary(arg));
    }
};

sqrtc = continuize(Math.sqrt);
sqrtc(alert, 81) //9
//

// Building a better constructor PATTERN <<<<<<<<
function constructor(init) {
    var that = other_constructor(init),
        member,
        method = function () {
            //init, member, method
        };
        that.method = method;
        return that;
}

// ES 6 PATTERN
function constructor(spec) {
    let {member} = spec; // is going to be initialised by spec.member
    const {other} = other_consstructor(spec);
    const method = function () {
        // spec, member, other, method
    };
    return Object.freeze({
        method,
        other
    });
}

// Function Challenge 11 6h 18min array wrapper
// figure out how to get to hack the array (hacking)
function vector() {
    var array = [];

    return {
        get: function get(i) {
            return array[i];
        },
        store: function store(i, v) {
            array[i] = v;
        },
        append: function append(v) {
            array.push(v);
        }
    };
};
myvector = vector();
myvector.append(7);
myvector.store(1, 8);
myvector.get(0) // 7
myvector.get(1) // 8

// HACK :
var stash;
myvector.store('push', function () {
    stash = this;
});
myvector.append(); //stash is array

// REPAIR
function vector() {
    var array = [];

    return {
        get: function get(i) {
            return array[+i]; // change i to integer
        },
        store: function store(i, v) {
            array[+i] = v; // change i to integer
        },
        append: function append(v) {
            array[array.length]= v; // dont use push
        }
    };
};
//

// Function Challenge 12 7h 10min
function pubsub() {
    var subscribers = [];
    return Object.freeze({ // freeze to repair
        subscribe: function (subscriber) {
            subscribers.push(subscriber);
        },
        publish: function (publication) {
            // var i, length = subscribers.length;
            // for (i =0; i< length; i +=1) {
            subscribers.forEach(function (s) {
             /*    try {
                    subscribers[i](publication);
                } catch (ignore) {} */
                setTimeout(function (s) { // this is to prevent las exploit
                    setTimeout(function () {
                        s(publication);
                    }, 0)
                });
            });
        }
    });
}

my_pubsub = pubsub();
my_pubsub.subscribe(log);
my_pubsub.publish("It works!");
// log("It works")

my_pubsub.subscribe(); // this will destroy pubsub function 
// to prevent it we do try catch
my_pubsub.publish = undefined; // this will delete publish object with function
// to prevent that we can object.freeze
my_pubsub.subscribe(function () { // can delete all subscribers (array)
    this.length = 0;
});

my_pubsub.subsscribe(limit(function () {
    my_pubsub.publish("Out of order");},1));
