
// Canvas Dimetions
function updateCanvasDimensions(canvas) {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
}

const draw_canvas = (x, y, c, w, h) => {
    m.fillStyle = c;
    m.fillRect(x, y, w, h);
};

const draw = (x, y, c, s) => {
    if (c == "black" && show_black.checked)
        m.fillStyle = "white";
    else
        m.fillStyle = c;
    m.fillRect(x, y, s, s);
};


const atom = (x, y, c, m) => {
    return { x: x, y: y, vx: randomV(), vy: randomV(), color: c, mass: m, size: 3, u: g * m };
};

// Initiate Random locations for Atoms ( used when atoms created )
const randomX = () => {
    return Math.random() * (canvas.width - 100) + 50;
};
const randomY = () => {
    return Math.random() * (canvas.height - 100) + 50;
};
const randomV = () => {
    v = config['velocity'].value - Math.random() * config['velocity'].value * 2;
    return v;
};

// Create an Atoms
const create = (number, color, mass) => {
    for (let i = 0; i < number; i++) {
        x = randomX()
        y = randomY()
        initial.push(atom(x, y, color, mass));
    }
};

var number = 0
function Initialize() {
    console.log("Initializing " + number.value + " atoms");
    initial.splice(0);
    // Create Atoms
    number = document.getElementById("atoms");
    config = {
        yellow: document.getElementById("yellow"),
        red: document.getElementById("red"),
        green: document.getElementById("green"),
        blue: document.getElementById("blue"),
        black: document.getElementById("black"),
        velocity: document.getElementById("velocity"),
    };

    if (config['yellow'].checked) create(number.value, "yellow", 1);
    if (config['red'].checked) create(number.value, "red", 2);
    if (config['green'].checked) create(number.value, "green", 3);
    if (config['blue'].checked) create(number.value, "blue", 4);
    if (config['black'].checked) create(number.value, "black", 5);
}

function go() {
    console.log("Starting...");
    if (initial.length == 0 || number != initial.length) {
        Initialize();
    }
    updateCanvasDimensions()
    e = document.getElementById('original');
    fps = document.getElementById('fps');
    factor = document.getElementById('factor');
    total_atoms = document.getElementById("total_atoms");
    total_mass = document.getElementById("total_mass");
    show_black = document.getElementById("showblack");

    var atoms = [];
    for (let i = 0; i < initial.length; i++) {
        atoms[i] = atom(initial[i].x, initial[i].y, initial[i].color, initial[i].mass);
    }

    // stop previous animations
    if (timeoutID)
        clearTimeout(timeoutID);

    if (requestId)
        window.cancelAnimationFrame(requestId);

    var RULES = {};

    // Apply Rules ( How atoms interact with each other )
    const applyRules_parallel = () => {
        for (let i = 0; i < atoms.length; i++) {
            let fx = 0;
            let fy = 0;
            const a = atoms[i];
            for (let j = 0; j < atoms.length; j++) {
                if (j !== i) {
                    const b = atoms[j];
                    // const g = RULES[a.color][b.color];

                    if (g !== undefined) {
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;

                        if (dx !== 0) {
                            const ax = g * b.mass / (dx * dx)
                            fx += ax;
                        }

                        if (dy !== 0) {
                            // const d = dx * dx + dy * dy; // distance = d = sqrt(x^2 + y^2 ) So....
                            // F=GMm/R^2  R is the separation in meters (m) between the objects, as measured from their centers of mass
                            // F=ma
                            // ma=GMm/R^2
                            // a=GM/R^2
                            // 
                            const ay = g * b.mass / (dy * dy)
                            fy += ay;
                        }
                    }
                }
            }
            a.fx = fx;
            a.fy = fy;
        }

        for (let i = 0; i < atoms.length; i++) {
            const a = atoms[i];
            a.vx = (a.vx + a.fx);
            a.vy = (a.vy + a.fy);

            a.x += a.vx;
            a.y += a.vy;

            // When Atoms touch or bypass canvas borders
            // X - axis
            if (a.x <= 0) {
                a.x = canvas.width - 1;
            }
            if (a.x >= canvas.width) {
                a.x = 0;
            }
            // Y - axis
            if (a.y <= 0) {
                a.y = canvas.height - 1;
            }
            if (a.y >= canvas.height) {
                a.y = 0;
            }
            a.x = Math.floor(a.x)
            a.y = Math.floor(a.y)
        }

        function xcomp(a, b) {
            if (a.x < b.x)
                return -1;
            else if (a.x > b.x)
                return 1;
            else if (a.y < b.y)
                return -1;
            else if (a.y > b.y)
                return 1;
            return 0;
        }
        function nextColor(m) {
            if (m == 1)
                return "yellow"
            else if (m == 2)
                return "red";
            else if (m == 3)
                return "green";
            else if (m == 4)
                return "blue";
            else
                return "black";
        }

        // Returns true if two rectangles (l1, r1) and (l2, r2)
        // overlap
        function overlap(a, b) {
            // if it is the same point/center, then the points/centers overlap
            if (a.x == b.x && a.y == b.y)
                return true;

            // Are both points zero sized?
            if (a.size == 0 && b.size == 0)
                return false;

            let l1 = { x: a.x - a.size, y: a.y + a.size }
            let r1 = { x: a.x + a.size, y: a.y - a.size }
            let l2 = { x: b.x - b.size, y: b.y + b.size }
            let r2 = { x: b.x + b.size, y: b.y - b.size }

            // if rectangle has area 0, no overlap
            // if (l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)
            //	 return false;

            // If one rectangle is on left side of other
            if (l1.x > r2.x || l2.x > r1.x)
                return false;

            // If one rectangle is above other
            if (r1.y > l2.y || r2.y > l1.y)
                return false;

            return true;
        }
        {
            let mass = 0;
            for (let i = 0; i < atoms.length; i++) {
                mass += atoms[i].mass;
            }
            if (mass < 100) debugger;
        }
        var merge = []
        for (let i = 0; i < atoms.length; i++) {
            const a = atoms[i];

            let found = false
            for (let j = 0; j < merge.length; j++) {

                const b = merge[j];

                collide = overlap(a, b)

                if (collide) {
                    b.mass += a.mass;
                    b.size = 4 * Math.sqrt(b.mass);
                    b.color = nextColor(b.mass)
                    b.vx = (b.mass * b.vx + a.mass * a.vx) / (b.mass + a.mass);
                    b.vy += (b.mass * b.vy + a.mass * a.vy) / (b.mass + a.mass);
                    found = true
                    break;
                }
            }
            if (!found)
                merge.push(a);
        }

        atoms = merge;
        total_atoms.textContent = atoms.length
    };
    // Apply Rules ( How atoms interact with each other )
    const applyRules_sequential = () => {
        for (let i = 0; i < atoms.length; i++) {
            let fx = 0;
            let fy = 0;
            const a = atoms[i];
            if (!config[a.color].checked) continue;
            for (let j = 0; j < atoms.length; j++) {
                if (j !== i) {
                    const b = atoms[j];
                    if (!config[b.color].checked) continue;
                    const g = RULES[a.color][b.color]; //;
                    if (g !== undefined) {
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        if (dx !== 0 || dy !== 0) {
                            const d = dx * dx + dy * dy;
                            const F = g / d;
                            fx += F * dx;
                            fy += F * dy;
                        }
                    }
                }
            }
            a.vx = (a.vx + fx);
            a.vy = (a.vy + fy);
            a.x += a.vx;
            a.y += a.vy;

            // When Atoms touch or bypass canvas borders
            // X - axis
            if (a.x <= 0) {
                a.x = canvas.width - 1;
            }
            if (a.x >= canvas.width) {
                a.x = 0;
            }
            // Y - axis
            if (a.y <= 0) {
                a.vy *= -1;
                a.y = canvas.height - 1;
            }
            if (a.y >= canvas.height) {
                a.y = 0;
            }
        }
    };

    // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    // Determine the intersection point of two line segments
    // Return FALSE if the lines don't intersect
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return false
        }

        denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

        // Lines are parallel
        if (denominator === 0) {
            return false
        }

        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false
        }

        // Return a object with the x and y coordinates of the intersection
        let x = x1 + ua * (x2 - x1)
        let y = y1 + ua * (y2 - y1)

        return { x, y }
    }

    function adjustRules() {
        for (let i in BASE_RULES) {
            RULES[i] = {};
            for (let j in BASE_RULES[i]) {
                RULES[i][j] = BASE_RULES[i][j] * factor.value;
                //				console.log("setting " + i + " => " + j + ": " + RULES[i][j] + ": " + factor.value);
            }
        }
    }

    // Update Frames
    update();
    function update() {
        // Update Canvas Dimensions - if screen size changed
        updateCanvasDimensions(canvas)

        adjustRules();

        if (e.checked)
            applyRules_sequential();
        else
            applyRules_parallel();

        m.clearRect(0, 0, canvas.width, canvas.height);
        draw_canvas(0, 0, "black", canvas.width, canvas.height);
        let mass = 0
        for (i = 0; i < atoms.length; i += 1) {
            draw(atoms[i].x, atoms[i].y, atoms[i].color, atoms[i].size);
            mass += atoms[i].mass
        }
        total_mass.textContent = mass
        timeoutID = setTimeout(update, 1000 / fps.value);
    };
}
function start() {
    try {
        go();
    }
    catch (error) {
        console.log(error);
    }
    return false;
}

function loaded() {
    // Rules values
    var factor = 0.1;

    const g = 6.67e-11

    var requestId;
    var timeoutID;
    var show_black;

    // Canvas
    const canvas = document.getElementById('canvas');
    const form = document.getElementById('form1');
    const m = canvas.getContext("2d");
    // Atoms array
    const initial = [];
    var config = {}


    updateCanvasDimensions(canvas);
}
