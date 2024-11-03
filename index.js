class Vector2
{
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * 
	 * @param {Vector2} v1 
	 * @param {Vector2 | number} v2 
	 * @returns {Vector2}
	 */
	static plus(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector2(v1.x + v2, v1.y + v2);

		else
			return new Vector2(v1.x + v2.x, v1.y + v2.y);
	}

	/**
	 * 
	 * @param {Vector2} v1 
	 * @param {Vector2 | number} v2
	 * @returns {Vector2} 
	 */
	static minus(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector2(v1.x - v2, v1.y - v2);

		else
			return new Vector2(v1.x - v2.x, v1.y - v2.y);
	}

	/**
	 * 
	 * @param {Vector2} v1 
	 * @param {Vector2 | number} v2
	 * @returns {Vector2} 
	 */
	static mutiple(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector2(v1.x * v2, v1.y * v2);
	}

	/**
	 * 
	 * @param {Vector2} v1 
	 * @param {Vector2} v2 
	 * @returns {number}
	 */
	static dot(v1, v2)
	{
		return v1.x * v2.x * v1.y * v2.y;
	}

	dist()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * 
	 * @param {bool} copy
	 * @returns {Vector2 | undefined} 
	 */
	normalize(copy = true)
	{
		
		const dist = dist();
		if (copy)
		{
			return new Vector2(this.x / dist, this.y / dist);
		}
		else
		{
			this.x = this.x / dist
			this.y = this.y / dist
		}
	}

	x = 0; y = 0;
}


class Vector3
{
	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 */
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * 
	 * @param {Vector3} v1 
	 * @param {Vector3 | number} v2 
	 * @returns {Vector3}
	 */
	static plus(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector3(v1.x + v2, v1.y + v2, v1.z + v2);

		else
			return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	}

	/**
	 * 
	 * @param {Vector3} v1 
	 * @param {Vector3 | number} v2
	 * @returns {Vector3} 
	 */
	static minus(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector3(v1.x - v2, v1.y - v2, v1.z - v2);

		else
			return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	}

	/**
	 * 
	 * @param {Vector3} v1 
	 * @param {Vector3 | number} v2
	 * @returns {Vector3} 
	 */
	static mutiple(v1, v2)
	{
		if (typeof(v2) === 'number')
			return new Vector3(v1.x * v2, v1.y * v2, v1.z * v2);
	}

	/**
	 * 
	 * @param {Vector3} v1 
	 * @param {Vector3} v2 
	 * @returns {number}
	 */
	static dot(v1, v2)
	{
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	/**
	 * 
	 * @param {bool} copy
	 * @returns {Vector3 | undefined} 
	 */
	normalize(copy = True)
	{
		if (copy)
		{
			const dist = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
			return new Vector3(this.x / dist, this.y / dist, this.z / dist);	
		}
	}

	x = 0; y = 0; z = 0;
}


/** @type {HTMLCanvasElement} cnavas */
const canvas = document.getElementById('canvas');

/** @type  {CanvasRenderingContext2D} context */
const ctx = canvas.getContext('2d');

const mouse_pos = [0, 0];

const control_points = [];

let bezi_flag = false;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} i 
 * @returns 
 */
imageData.getRGBA = function(x, y, i) {
    return this.data[this.width * 4 * x + 4 * y + i];
};

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} i 
 * @param {number} v 
 */
imageData.setRGBA = function(x, y, i, v) {
	this.data[this.width * 4 * x + 4 * y + i] = v;
}


/** @type {Array<Vector2>} */
const curve = [];
let t = 0;

/**
 * 
 * @param {Array<Vector2>} coords 
 * @param {number} t
 */
function bezierCurve(coords, t)
{
	if (coords.length === 1)
	{ 
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(coords[0].x, coords[0].y, 10, 0, 2 * Math.PI);
		ctx.fill();

		return coords[0];
	}

	for (let i = 0; i < coords.length - 1; i++)
	{
		ctx.lineWidth = 4;
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(coords[i].x, coords[i].y);
		ctx.lineTo(coords[i + 1].x, coords[i + 1].y);
		ctx.stroke();
	}

	const dots = [];
	for (let i = 0; i < coords.length - 1; i++)
	{
		dots.push(lerp2(coords[i], coords[i + 1], t));
	}

	for (let i = 0; i < dots.length; i++)
	{
		ctx.fillStyle = '#3ef8ff';
		ctx.beginPath();
		ctx.arc(dots[i].x, dots[i].y, 7, 0, 2 * Math.PI);
		ctx.fill();
	}

	return bezierCurve(dots, t);
}


function bezi_draw()
{
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 2000, 2000);
	const pos = bezierCurve(control_points, t);
	curve.push(pos);

	if (t >=1)
		{
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, 2000, 2000);
	
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 4;
	
			for (let i = 0; i < curve.length - 1; i++)
			{
				ctx.beginPath();
				ctx.moveTo(curve[i].x, curve[i].y);
				ctx.lineTo(curve[i + 1].x, curve[i + 1].y)
				ctx.stroke();
			}

			bezi_flag = false;
			return;
		}

	t = Math.min(t + 0.005, 1);
}



function a()
{
	if (bezi_flag) bezi_draw();
	else
	{
		for (let i = 0; i < control_points.length; i++)
		{
			ctx.fillStyle = '#3e9fff';
			ctx.beginPath();
			ctx.arc(control_points[i].x, control_points[i].y, 10, 0, 2 * Math.PI);
			ctx.fill();
		}
	}


	requestAnimationFrame(a);
}

function keyA(e)
{
	if (e.key === 'a')
	{
		t = 0;
		curve.length = 0;
		bezi_flag = true;
	}
}


addEventListener('mousemove', function(e) {
	const rect = ctx.canvas.getBoundingClientRect();
	mouse_pos[0] = e.clientX - rect.left; mouse_pos[1] = e.clientY - rect.top;
});

addEventListener('click', function(e) {
	control_points.push(new Vector2(mouse_pos[0], mouse_pos[1]));
});

addEventListener('keydown', keyA);


a();


/**
 * 
 * @param {Vector2} a 
 * @param {Vector2} b 
 * @param {number} t 
 * @returns {Vector2}
 */
function lerp2(a, b, t)
{
	v1 = Vector2.mutiple(a, 1-t);
	v2 = Vector2.mutiple(b, t);
	return Vector2.plus(v1, v2);
}

/**
 * 
 * @param {Vector3} a 
 * @param {Vector3} b 
 * @param {Vector3} t 
 */
function lerp3(a, b, t)
{
	v1 = Vector3.mutiple(a, 1-t);
	v2 = Vector3.mutiple(b, t);
	return Vector3.plus(v1, v2);
}